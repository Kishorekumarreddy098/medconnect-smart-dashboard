
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    availability: "Available Today",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    availability: "Available Tomorrow",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Dr. Emily Rivera",
    specialty: "Neurologist",
    rating: 4.7,
    availability: "Available Today",
    avatar: "/placeholder.svg",
  },
];

const DoctorList = () => {
  return (
    <Card className="col-span-12">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Top Doctors</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="border rounded-lg p-4 flex flex-col items-center text-center transition-shadow hover:shadow-md"
            >
              <Avatar className="h-20 w-20 mb-3">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback className="text-lg">
                  {doctor.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-base">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              <div className="flex items-center mt-2 mb-3">
                <div className="flex">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
              </div>
              <Badge className="mb-3 bg-green-100 hover:bg-green-200 text-green-800 border-none">
                {doctor.availability}
              </Badge>
              <Button className="w-full bg-smartmed-emerald hover:bg-smartmed-emerald/90">
                Book Appointment
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorList;
