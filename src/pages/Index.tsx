
import { Card, CardContent } from "@/components/ui/card";
import { Video, Calendar, FileText, Pill } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import AppointmentList from "@/components/dashboard/AppointmentList";
import MedicineReminder from "@/components/dashboard/MedicineReminder";
import DoctorList from "@/components/dashboard/DoctorList";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";

const Index = () => {
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
              value="3" 
              icon={<Video className="h-5 w-5 text-smartmed-emerald" />}
              trend={{ value: 15, isPositive: true }}
            />
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <StatsCard 
              title="Active Prescriptions" 
              value="7" 
              icon={<FileText className="h-5 w-5 text-smartmed-emerald" />}
              trend={{ value: 5, isPositive: true }}
            />
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <StatsCard 
              title="Medication Reminders" 
              value="3" 
              description="Today" 
              icon={<Pill className="h-5 w-5 text-smartmed-emerald" />}
            />
          </div>
          
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <StatsCard 
              title="Upcoming Tests" 
              value="2" 
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
