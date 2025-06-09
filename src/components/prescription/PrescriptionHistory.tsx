
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PrescriptionHistory = {
  id: string;
  patient_name: string | null;
  doctor_name: string | null;
  prescription_date: string | null;
  status: string;
  created_at: string;
  prescription_medicines: Array<{
    medicine_name: string;
  }>;
};

const PrescriptionHistory = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptionHistory();
  }, []);

  const fetchPrescriptionHistory = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to view prescription history");
        return;
      }

      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          prescription_medicines (
            medicine_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prescription history:', error);
        toast.error("Failed to load prescription history");
        return;
      }

      setPrescriptions(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to load prescription history");
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (id: string) => {
    toast.info(`Viewing prescription details`);
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

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      expired: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[status as keyof typeof statusColors] || statusColors.completed}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading prescription history...</div>
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-smartmed-light-green bg-opacity-20 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-smartmed-emerald" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescription History</h3>
        <p className="text-gray-500">Your prescription history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prescription</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-smartmed-light-green bg-opacity-20 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-smartmed-emerald" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {prescription.patient_name ? `Prescription for ${prescription.patient_name}` : 'Prescription'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {prescription.prescription_medicines.length} medicine(s)
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">{prescription.doctor_name || 'Unknown Doctor'}</div>
                  <div className="text-sm text-gray-500">General Medicine</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">
                    {formatDate(prescription.prescription_date || prescription.created_at)}
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(prescription.status)}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleViewClick(prescription.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PrescriptionHistory;
