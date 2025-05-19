
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const PrescriptionAnalysis = () => {
  const handleRunAnalysis = () => {
    toast.success("Running prescription analysis...");
    // In a real app, this would trigger an API call to analyze the prescriptions
    setTimeout(() => {
      toast.success("Analysis complete! No drug interactions found.");
    }, 2000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-smartmed-light-green bg-opacity-20 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-smartmed-emerald" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Smart Prescription Analysis</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Our AI-powered system will analyze your prescriptions for potential drug interactions,
            allergies, and provide personalized dosage recommendations.
          </p>
          <Button 
            className="mt-6 bg-smartmed-emerald hover:bg-smartmed-emerald/90"
            onClick={handleRunAnalysis}
          >
            Run Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionAnalysis;
