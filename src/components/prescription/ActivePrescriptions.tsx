
import { useEffect, useState } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import PrescriptionCard from "./PrescriptionCard";

type Prescription = {
  id: string;
  patient_name: string | null;
  doctor_name: string | null;
  prescription_date: string | null;
  additional_instructions: string | null;
  status: string;
  created_at: string;
  prescription_medicines: Array<{
    medicine_name: string;
    dosage: string | null;
    frequency: string | null;
    duration: string | null;
    instructions: string | null;
  }>;
};

const ActivePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to view prescriptions");
        return;
      }

      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          prescription_medicines (
            medicine_name,
            dosage,
            frequency,
            duration,
            instructions
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prescriptions:', error);
        toast.error("Failed to load prescriptions");
        return;
      }

      setPrescriptions(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = (prescriptionId: string) => {
    toast.success(`Added prescription medicines to cart`);
  };

  const handleDownloadClick = (prescriptionId: string) => {
    toast.success(`Downloading prescription`);
  };

  const formatMedicines = (medicines: any[]) => {
    return medicines.map(med => ({
      name: `${med.medicine_name}${med.dosage ? ` ${med.dosage}` : ''}`,
      instructions: [med.frequency, med.duration, med.instructions].filter(Boolean).join(', ') || 'As directed'
    }));
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading prescriptions...</div>
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-smartmed-light-green bg-opacity-20 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-smartmed-emerald" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Prescriptions</h3>
        <p className="text-gray-500">Upload a prescription to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prescriptions.map((prescription) => (
        <PrescriptionCard
          key={prescription.id}
          title={prescription.patient_name ? `Prescription for ${prescription.patient_name}` : 'Prescription'}
          doctor={prescription.doctor_name || 'Unknown Doctor'}
          specialty="General Medicine"
          medicines={formatMedicines(prescription.prescription_medicines)}
          issuedDate={formatDate(prescription.prescription_date || prescription.created_at)}
          expiryDate={formatDate(prescription.prescription_date)} // You might want to calculate expiry date
          status="active"
          onBuyClick={() => handleBuyClick(prescription.id)}
          onDownloadClick={() => handleDownloadClick(prescription.id)}
        />
      ))}
    </div>
  );
};

export default ActivePrescriptions;
