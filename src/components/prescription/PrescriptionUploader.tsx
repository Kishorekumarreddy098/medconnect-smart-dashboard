
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, FileImage, Scan, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type PrescriptionMedicine = {
  name: string;
  dosage: string;
  quantity: string;
  instructions?: string;
};

export default function PrescriptionUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedMedicines, setExtractedMedicines] = useState<PrescriptionMedicine[]>([]);
  
  // Mock OCR extraction function (in a real app, this would call an API)
  const extractMedicinesFromImage = async (file: File): Promise<PrescriptionMedicine[]> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock extraction results
    // In a real implementation, you would call a backend OCR service
    const mockResults: PrescriptionMedicine[] = [
      { name: "Lisinopril", dosage: "10mg", quantity: "30 tablets" },
      { name: "Metformin", dosage: "500mg", quantity: "60 tablets" },
      { name: "Atorvastatin", dosage: "20mg", quantity: "30 tablets" },
    ];
    
    setIsLoading(false);
    return mockResults;
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create image preview if file is an image
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // For PDFs or other files
        setImagePreview(null);
      }
      
      // Reset extracted medicines when new file is selected
      setExtractedMedicines([]);
    }
  };
  
  const handleExtract = async () => {
    if (!file) {
      toast.error("Please upload a prescription file first");
      return;
    }
    
    try {
      const medicines = await extractMedicinesFromImage(file);
      setExtractedMedicines(medicines);
      toast.success("Prescription analyzed successfully");
    } catch (error) {
      console.error("Error extracting medicines:", error);
      toast.error("Failed to analyze prescription");
    }
  };
  
  const handleAddToCart = (medicine: PrescriptionMedicine) => {
    // In a real app, this would add the medicine to a cart state or API
    toast.success(`Added ${medicine.name} to cart`);
  };
  
  const handleAddAllToCart = () => {
    if (extractedMedicines.length === 0) {
      toast.error("No medicines to add");
      return;
    }
    
    // In a real app, this would add all medicines to a cart state or API
    toast.success(`Added ${extractedMedicines.length} medicines to cart`);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="mb-4">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            <p className="mb-2 text-sm text-gray-600">Upload your prescription image or PDF</p>
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" className="relative">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                </Button>
              </label>
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
              onClick={handleExtract} 
              disabled={!file || isLoading}
              className="bg-smartmed-emerald hover:bg-smartmed-emerald/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Scan className="mr-2 h-4 w-4" />
                  Extract Medicines
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {extractedMedicines.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Extracted Medicines</h3>
              <Button 
                onClick={handleAddAllToCart}
                size="sm"
                className="bg-smartmed-teal hover:bg-smartmed-teal/90"
              >
                Add All to Cart
              </Button>
            </div>
            <div className="space-y-3">
              {extractedMedicines.map((medicine, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{medicine.name}</p>
                    <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.quantity}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddToCart(medicine)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
