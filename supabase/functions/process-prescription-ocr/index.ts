
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Invalid user');
    }

    const { imageData, fileName } = await req.json();

    // Convert base64 to blob for Azure OCR
    const imageBuffer = Uint8Array.from(atob(imageData), c => c.charCodeAt(0));

    // Azure OCR API call
    const azureEndpoint = Deno.env.get('AZURE_ENDPOINT');
    const azureKey = Deno.env.get('AZURE_KEY');

    if (!azureEndpoint || !azureKey) {
      throw new Error('Azure credentials not configured');
    }

    // Step 1: Submit image for OCR
    const ocrResponse = await fetch(`${azureEndpoint}/vision/v3.2/read/analyze`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': azureKey,
        'Content-Type': 'application/octet-stream',
      },
      body: imageBuffer,
    });

    if (!ocrResponse.ok) {
      throw new Error(`Azure OCR failed: ${ocrResponse.statusText}`);
    }

    const operationLocation = ocrResponse.headers.get('Operation-Location');
    if (!operationLocation) {
      throw new Error('No operation location returned from Azure');
    }

    const operationId = operationLocation.split('/').pop();

    // Step 2: Poll for results
    let ocrResult;
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const resultResponse = await fetch(`${azureEndpoint}/vision/v3.2/read/analyzeResults/${operationId}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': azureKey,
        },
      });

      const result = await resultResponse.json();
      
      if (result.status === 'succeeded') {
        ocrResult = result;
        break;
      } else if (result.status === 'failed') {
        throw new Error('OCR analysis failed');
      }
      
      attempts++;
    }

    if (!ocrResult) {
      throw new Error('OCR timeout');
    }

    // Extract text from OCR result
    let extractedText = '';
    for (const page of ocrResult.analyzeResult.readResults) {
      for (const line of page.lines) {
        extractedText += line.text + '\n';
      }
    }

    console.log('Extracted OCR Text:', extractedText);

    // Step 3: Use Gemini to analyze the prescription
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const geminiPrompt = `You are a medical assistant. Extract the following details from the OCR text of a medical prescription. Return the result in strict JSON format with no additional text:

{
  "patient_name": "string or null",
  "doctor_name": "string or null", 
  "prescription_date": "YYYY-MM-DD format or null",
  "medicines": [
    {
      "medicine_name": "string",
      "dosage": "string or null",
      "frequency": "string or null", 
      "duration": "string or null",
      "instructions": "string or null"
    }
  ],
  "additional_instructions": "string or null"
}

OCR Text:
${extractedText}`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: geminiPrompt
          }]
        }]
      }),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API failed: ${geminiResponse.statusText}`);
    }

    const geminiResult = await geminiResponse.json();
    const analysisText = geminiResult.candidates[0].content.parts[0].text;
    
    // Clean up the response to extract JSON
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Gemini response');
    }

    const prescriptionData = JSON.parse(jsonMatch[0]);
    console.log('Parsed prescription data:', prescriptionData);

    // Step 4: Store in Supabase
    const { data: prescription, error: prescriptionError } = await supabaseClient
      .from('prescriptions')
      .insert({
        user_id: user.id,
        patient_name: prescriptionData.patient_name,
        doctor_name: prescriptionData.doctor_name,
        prescription_date: prescriptionData.prescription_date,
        additional_instructions: prescriptionData.additional_instructions,
        ocr_text: extractedText,
        status: 'active'
      })
      .select()
      .single();

    if (prescriptionError) {
      console.error('Error inserting prescription:', prescriptionError);
      throw new Error('Failed to save prescription');
    }

    // Step 5: Store medicines
    if (prescriptionData.medicines && prescriptionData.medicines.length > 0) {
      const medicineInserts = prescriptionData.medicines.map((medicine: any) => ({
        prescription_id: prescription.id,
        medicine_name: medicine.medicine_name,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        duration: medicine.duration,
        instructions: medicine.instructions
      }));

      const { error: medicineError } = await supabaseClient
        .from('prescription_medicines')
        .insert(medicineInserts);

      if (medicineError) {
        console.error('Error inserting medicines:', medicineError);
        throw new Error('Failed to save medicines');
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      prescription_id: prescription.id,
      extracted_data: prescriptionData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-prescription-ocr:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
