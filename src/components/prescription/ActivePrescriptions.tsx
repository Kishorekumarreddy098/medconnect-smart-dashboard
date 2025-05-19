
import { toast } from "@/components/ui/sonner";
import PrescriptionCard from "./PrescriptionCard";

const ActivePrescriptions = () => {
  // This would typically come from an API or state management
  const prescriptions = [
    {
      id: 1,
      title: "Heart Medication Plan",
      doctor: "Sarah Johnson",
      specialty: "Cardiology",
      medicines: [
        {
          name: "Lisinopril 10mg",
          instructions: "Take 1 tablet daily with food",
        },
        {
          name: "Aspirin 81mg",
          instructions: "Take 1 tablet daily",
        },
      ],
      issuedDate: "May 10, 2025",
      expiryDate: "Aug 10, 2025",
      status: "active" as const,
    },
    {
      id: 2,
      title: "Cholesterol Management",
      doctor: "Michael Chen",
      specialty: "General Medicine",
      medicines: [
        {
          name: "Atorvastatin 20mg",
          instructions: "Take 1 tablet at night",
        },
        {
          name: "CoQ10 100mg",
          instructions: "Take 1 capsule daily",
        },
      ],
      issuedDate: "May 5, 2025",
      expiryDate: "Aug 5, 2025",
      status: "active" as const,
    },
    {
      id: 3,
      title: "Diabetes Management",
      doctor: "Emily Rivera",
      specialty: "Endocrinology",
      medicines: [
        {
          name: "Metformin 500mg",
          instructions: "Take 1 tablet after meals",
        },
        {
          name: "Glimepiride 2mg",
          instructions: "Take 1 tablet before breakfast",
        },
      ],
      issuedDate: "Apr 15, 2025",
      expiryDate: "Jul 15, 2025",
      status: "pending" as const,
    },
  ];

  const handleBuyClick = (prescriptionId: number) => {
    toast.success(`Added prescription #${prescriptionId} medicines to cart`);
  };

  const handleDownloadClick = (prescriptionId: number) => {
    toast.success(`Downloading prescription #${prescriptionId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prescriptions.map((prescription) => (
        <PrescriptionCard
          key={prescription.id}
          title={prescription.title}
          doctor={prescription.doctor}
          specialty={prescription.specialty}
          medicines={prescription.medicines}
          issuedDate={prescription.issuedDate}
          expiryDate={prescription.expiryDate}
          status={prescription.status}
          onBuyClick={() => handleBuyClick(prescription.id)}
          onDownloadClick={() => handleDownloadClick(prescription.id)}
        />
      ))}
    </div>
  );
};

export default ActivePrescriptions;
