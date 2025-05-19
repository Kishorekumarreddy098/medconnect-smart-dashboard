
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowRight, Pill, ShoppingCart } from "lucide-react";

const Pharmacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Online Pharmacy</h1>
            <p className="text-gray-500">Order your prescribed medicines online</p>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search medicines..."
              className="pl-9 w-full md:w-80"
            />
          </div>
        </div>

        <Tabs defaultValue="prescribed" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="prescribed">Prescribed</TabsTrigger>
            <TabsTrigger value="all">All Medicines</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prescribed">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-smartmed-light-green bg-opacity-20 p-4 rounded-lg mb-6">
                  <div className="flex items-start md:items-center gap-4">
                    <div className="p-3 bg-white rounded-full">
                      <Pill className="h-6 w-6 text-smartmed-emerald" />
                    </div>
                    <div>
                      <h3 className="font-medium">Order Your Prescribed Medicines</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        You have 3 active prescriptions with 7 medicines in total
                      </p>
                    </div>
                  </div>
                  <Button className="mt-4 md:mt-0 bg-smartmed-emerald hover:bg-smartmed-emerald/90">
                    Order All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Heart Medication Plan</h4>
                        <p className="text-sm text-gray-500">Dr. Sarah Johnson • May 10, 2025</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Lisinopril 10mg</p>
                          <p className="text-xs text-gray-500">30 tablets • $15.99</p>
                        </div>
                        <Button variant="outline" size="sm">Add to Cart</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Aspirin 81mg</p>
                          <p className="text-xs text-gray-500">60 tablets • $8.49</p>
                        </div>
                        <Button variant="outline" size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Cholesterol Management</h4>
                        <p className="text-sm text-gray-500">Dr. Michael Chen • May 5, 2025</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Atorvastatin 20mg</p>
                          <p className="text-xs text-gray-500">30 tablets • $22.99</p>
                        </div>
                        <Button variant="outline" size="sm">Add to Cart</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">CoQ10 100mg</p>
                          <p className="text-xs text-gray-500">30 capsules • $16.75</p>
                        </div>
                        <Button variant="outline" size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <Pill className="h-12 w-12 text-smartmed-teal opacity-50" />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2" variant="outline">Category {i % 3 + 1}</Badge>
                    <h4 className="font-medium">Medicine Name {i}</h4>
                    <div className="flex items-baseline mt-1">
                      <span className="text-lg font-bold">${(9.99 + i).toFixed(2)}</span>
                      <span className="text-xs text-gray-500 ml-2">per unit</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {i % 2 === 0 ? "Prescription required" : "No prescription required"}
                    </p>
                    <Button className="w-full mt-3 bg-smartmed-teal hover:bg-smartmed-teal/90">Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline">Load more medicines</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[1, 2].map((order) => (
                    <div key={order} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">Order #{1000 + order}</h4>
                            <Badge className={`ml-2 ${order === 1 ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                              {order === 1 ? "In Transit" : "Delivered"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Placed on May {10 - order}, 2025 • ${(35 + order * 12).toFixed(2)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                          Track Order
                        </Button>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium">Items:</p>
                        <ul className="mt-2 space-y-2">
                          <li className="text-sm flex">
                            <span className="text-gray-500 mr-2">•</span>
                            <span>Medication {order * 2 - 1} (Qty: 1)</span>
                          </li>
                          <li className="text-sm flex">
                            <span className="text-gray-500 mr-2">•</span>
                            <span>Medication {order * 2} (Qty: 2)</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="link" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="fixed bottom-6 right-6">
          <Button className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg bg-smartmed-emerald hover:bg-smartmed-emerald/90">
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
