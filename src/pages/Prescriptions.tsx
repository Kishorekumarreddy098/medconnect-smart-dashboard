
import Navbar from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PrescriptionUploader from "@/components/prescription/PrescriptionUploader";
import ActivePrescriptions from "@/components/prescription/ActivePrescriptions";
import PrescriptionHistory from "@/components/prescription/PrescriptionHistory";
import PrescriptionAnalysis from "@/components/prescription/PrescriptionAnalysis";

const Prescriptions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Prescriptions</h1>
            <p className="text-gray-500">View and manage your medical prescriptions</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search prescriptions..."
                className="pl-8 w-full md:w-64"
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-8">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <ActivePrescriptions />
          </TabsContent>
          
          <TabsContent value="history">
            <PrescriptionHistory />
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <PrescriptionUploader />
          </TabsContent>
          
          <TabsContent value="analysis">
            <PrescriptionAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Prescriptions;
