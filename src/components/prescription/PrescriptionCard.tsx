
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

export type PrescriptionCardProps = {
  title: string;
  doctor: string;
  specialty: string;
  medicines: Array<{
    name: string;
    instructions: string;
  }>;
  issuedDate: string;
  expiryDate: string;
  status: "active" | "pending" | "expired";
  onBuyClick?: () => void;
  onDownloadClick?: () => void;
};

const PrescriptionCard = ({
  title,
  doctor,
  specialty,
  medicines,
  issuedDate,
  expiryDate,
  status,
  onBuyClick,
  onDownloadClick,
}: PrescriptionCardProps) => {
  // Map status to appropriate badge styling
  const getBadgeStyles = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "expired":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-green-100 text-green-800 hover:bg-green-200";
    }
  };

  // Map status to appropriate button text
  const getButtonText = () => {
    switch (status) {
      case "active":
        return "Buy Medicines";
      case "pending":
        return "Request Refill";
      case "expired":
        return "Renew Prescription";
      default:
        return "Buy Medicines";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-smartmed-light-green bg-opacity-20 rounded-full">
            <FileText className="h-5 w-5 text-smartmed-emerald" />
          </div>
          <Badge className={getBadgeStyles()}>
            {status === "active" ? "Active" : status === "pending" ? "Pending Refill" : "Expired"}
          </Badge>
        </div>
        <h3 className="font-medium text-lg mt-4">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          Dr. {doctor} • {specialty}
        </p>
        <div className="mt-4 border-t pt-4">
          <div className="space-y-2">
            {medicines.map((medicine, index) => (
              <div key={index}>
                <h4 className="text-sm font-medium">{medicine.name}</h4>
                <p className="text-xs text-gray-500">{medicine.instructions}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
          <span>Issued: {issuedDate}</span>
          <span>Expires: {expiryDate}</span>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button 
            className="flex-1 bg-smartmed-teal hover:bg-smartmed-teal/90"
            onClick={onBuyClick}
          >
            {getButtonText()}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={onDownloadClick}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
