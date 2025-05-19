
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Video } from "lucide-react";

const Consultations = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Video Consultations</h1>
            <p className="text-gray-500">Book and manage your doctor video appointments</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-smartmed-emerald hover:bg-smartmed-emerald/90">
              <Calendar className="mr-2 h-4 w-4" />
              Book New Consultation
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Appointment with Dr. Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">Cardiologist</p>
                  <div className="mt-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Today, 10:30 AM - 11:00 AM
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline">Reschedule</Button>
                <Button className="bg-smartmed-emerald hover:bg-smartmed-emerald/90">
                  <Video className="mr-2 h-4 w-4" />
                  Join Call
                </Button>
              </div>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Appointment with Dr. Michael Chen</h3>
                  <p className="text-sm text-gray-600">Dermatologist</p>
                  <div className="mt-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Tomorrow, 2:00 PM - 2:30 PM
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline">Reschedule</Button>
                <Button variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  View Details
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Video className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Appointment with Dr. Emily Rivera</h3>
                  <p className="text-sm text-gray-600">Neurologist</p>
                  <div className="mt-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      May 15, 2025 - 11:00 AM
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline">View Summary</Button>
                <Button variant="outline" className="bg-smartmed-light-green hover:bg-smartmed-light-green/90 text-gray-700">
                  Book Follow-up
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="p-4 bg-gray-100 rounded-full">
                <Calendar className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No cancelled appointments</h3>
              <p className="text-gray-500 text-center mt-2">
                You don't have any cancelled appointments at this time.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Consultations;
