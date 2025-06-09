
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Scan, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function PrescriptionUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleProcessPrescription = async () => {
    if (!file) {
      toast.error("Please upload a prescription file first");
      return;
    }

    if (!isSignedIn) {
      toast.error("Please sign in to process prescriptions");
      navigate('/auth');
      return;
    }

    setIsProcessing(true);

    try {
      const base64Data = await convertFileToBase64(file);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to process prescriptions");
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('process-prescription-ocr', {
        body: {
          imageData: base64Data,
          fileName: file.name
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        console.error('OCR Error:', error);
        toast.error("Failed to process prescription. Please try again.");
        return;
      }

      if (data.success) {
        toast.success("Prescription processed successfully!");
        setFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        toast.success(`Found ${data.extracted_data.medicines?.length || 0} medicines in prescription`);
      } else {
        toast.error(data.error || "Failed to process prescription");
      }

    } catch (error) {
      console.error('Processing error:', error);
      toast.error("Failed to process prescription. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div 
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleBrowseClick}
        >
          <div className="mb-4">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <p className="mb-2 text-sm text-gray-600">
            Drag & drop your prescription image or PDF here
          </p>
          <p className="text-xs text-gray-500 mb-4">
            or click to browse files
          </p>
          <div className="mt-4">
            <input
              ref={fileInputRef}
              id="file-upload"
              name="file-upload"
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              onClick={(e) => e.stopPropagation()}
            />
            <Button 
              variant="outline" 
              className="relative"
              onClick={(e) => {
                e.stopPropagation();
                handleBrowseClick();
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>
          {file && (
            <div className="mt-3 text-sm text-gray-500">
              Selected: {file.name}
            </div>
          )}
        </div>
        
        {imagePreview && (
          <div className="mt-4">
            <div className="aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-md">
              <img
                src={imagePreview}
                alt="Prescription preview"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={handleProcessPrescription} 
            disabled={!file || isProcessing}
            className="bg-smartmed-emerald hover:bg-smartmed-emerald/90"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing OCR...
              </>
            ) : (
              <>
                <Scan className="mr-2 h-4 w-4" />
                Process Prescription
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
