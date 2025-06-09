
-- Create table for storing prescriptions
CREATE TABLE public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  patient_name TEXT,
  doctor_name TEXT,
  prescription_date DATE,
  additional_instructions TEXT,
  ocr_text TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing medicines from prescriptions
CREATE TABLE public.prescription_medicines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prescription_id UUID REFERENCES public.prescriptions(id) ON DELETE CASCADE NOT NULL,
  medicine_name TEXT NOT NULL,
  dosage TEXT,
  frequency TEXT,
  duration TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescription_medicines ENABLE ROW LEVEL SECURITY;

-- Create policies for prescriptions
CREATE POLICY "Users can view their own prescriptions" 
  ON public.prescriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prescriptions" 
  ON public.prescriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prescriptions" 
  ON public.prescriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prescriptions" 
  ON public.prescriptions 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for prescription medicines
CREATE POLICY "Users can view medicines from their prescriptions" 
  ON public.prescription_medicines 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.prescriptions 
      WHERE prescriptions.id = prescription_medicines.prescription_id 
      AND prescriptions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create medicines for their prescriptions" 
  ON public.prescription_medicines 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.prescriptions 
      WHERE prescriptions.id = prescription_medicines.prescription_id 
      AND prescriptions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update medicines from their prescriptions" 
  ON public.prescription_medicines 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.prescriptions 
      WHERE prescriptions.id = prescription_medicines.prescription_id 
      AND prescriptions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete medicines from their prescriptions" 
  ON public.prescription_medicines 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.prescriptions 
      WHERE prescriptions.id = prescription_medicines.prescription_id 
      AND prescriptions.user_id = auth.uid()
    )
  );
