
import Navbar from "@/components/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Prescription Card 1 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-smartmed-light-green bg-opacity-20 rounded-full">
                      <FileText className="h-5 w-5 text-smartmed-emerald" />
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                  </div>
                  <h3 className="font-medium text-lg mt-4">Heart Medication Plan</h3>
                  <p className="text-sm text-gray-600 mt-1">Dr. Sarah Johnson • Cardiology</p>
                  <div className="mt-4 border-t pt-4">
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Lisinopril 10mg</h4>
                        <p className="text-xs text-gray-500">Take 1 tablet daily with food</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Aspirin 81mg</h4>
                        <p className="text-xs text-gray-500">Take 1 tablet daily</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                    <span>Issued: May 10, 2025</span>
                    <span>Expires: Aug 10, 2025</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button className="flex-1 bg-smartmed-teal hover:bg-smartmed-teal/90">Buy Medicines</Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Prescription Card 2 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-smartmed-light-green bg-opacity-20 rounded-full">
                      <FileText className="h-5 w-5 text-smartmed-emerald" />
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                  </div>
                  <h3 className="font-medium text-lg mt-4">Cholesterol Management</h3>
                  <p className="text-sm text-gray-600 mt-1">Dr. Michael Chen • General Medicine</p>
                  <div className="mt-4 border-t pt-4">
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Atorvastatin 20mg</h4>
                        <p className="text-xs text-gray-500">Take 1 tablet at night</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">CoQ10 100mg</h4>
                        <p className="text-xs text-gray-500">Take 1 capsule daily</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                    <span>Issued: May 5, 2025</span>
                    <span>Expires: Aug 5, 2025</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button className="flex-1 bg-smartmed-teal hover:bg-smartmed-teal/90">Buy Medicines</Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Prescription Card 3 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-smartmed-light-green bg-opacity-20 rounded-full">
                      <FileText className="h-5 w-5 text-smartmed-emerald" />
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending Refill</Badge>
                  </div>
                  <h3 className="font-medium text-lg mt-4">Diabetes Management</h3>
                  <p className="text-sm text-gray-600 mt-1">Dr. Emily Rivera • Endocrinology</p>
                  <div className="mt-4 border-t pt-4">
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Metformin 500mg</h4>
                        <p className="text-xs text-gray-500">Take 1 tablet after meals</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Glimepiride 2mg</h4>
                        <p className="text-xs text-gray-500">Take 1 tablet before breakfast</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                    <span>Issued: Apr 15, 2025</span>
                    <span>Expires: Jul 15, 2025</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button className="flex-1 bg-smartmed-teal hover:bg-smartmed-teal/90">Request Refill</Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prescription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-smartmed-light-green bg-opacity-20 rounded-full flex items-center justify-center">
                              <FileText className="h-4 w-4 text-smartmed-emerald" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Prescription #{item}</div>
                              <div className="text-sm text-gray-500">{item} medicine(s)</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Dr. Name {item}</div>
                          <div className="text-sm text-gray-500">Specialty {item}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Jan {item}, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="link" size="sm" className="text-indigo-600 hover:text-indigo-900">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
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
                  <Button className="mt-6 bg-smartmed-emerald hover:bg-smartmed-emerald/90">
                    Run Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Prescriptions;
