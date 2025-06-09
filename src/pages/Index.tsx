
import { Card } from "@/components/ui/card";
import { Video, Calendar, FileText, Pill } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import AppointmentList from "@/components/dashboard/AppointmentList";
import MedicineReminder from "@/components/dashboard/MedicineReminder";
import DoctorList from "@/components/dashboard/DoctorList";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [prescriptionCount, setPrescriptionCount] = useState(0);

  useEffect(() => {
    if (isSignedIn) {
      fetchPrescriptionCount();
    }
  }, [isSignedIn]);

  const fetchPrescriptionCount = async () => {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('id', { count: 'exact' })
        .eq('status', 'active');

      if (!error && data) {
        setPrescriptionCount(data.length);
      }
    } catch (error) {
      console.error('Error fetching prescription count:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <WelcomeBanner />
          
          {/* Stats Cards */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <StatsCard 
              title="Upcoming Consultations" 
              value="0" 
              icon={<Video className="h-5 w-5 text-smartmed-emerald" />}
              trend={{ value: 0, isPositive: true }}
            />
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <StatsCard 
              title="Active Prescriptions" 
              value={prescriptionCount.toString()} 
              icon={<FileText className="h-5 w-5 text-smartmed-emerald" />}
              trend={{ value: 0, isPositive: true }}
            />
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <StatsCard 
              title="Medication Reminders" 
              value="0" 
              description="Today" 
              icon={<Pill className="h-5 w-5 text-smartmed-emerald" />}
            />
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <StatsCard 
              title="Upcoming Tests" 
              value="0" 
              description="This Week" 
              icon={<Calendar className="h-5 w-5 text-smartmed-emerald" />}
            />
          </div>
          
          {/* Appointments and Medicine reminders */}
          <AppointmentList />
          <MedicineReminder />
          
          {/* Top Doctors */}
          <DoctorList />
        </div>
      </div>
    </div>
  );
};

export default Index;
