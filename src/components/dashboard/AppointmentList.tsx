
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, FileText } from "lucide-react";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Today, 10:30 AM",
    status: "upcoming",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "Tomorrow, 2:00 PM",
    status: "upcoming",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    doctor: "Dr. Emily Rivera",
    specialty: "Neurologist",
    date: "May 25, 11:15 AM",
    status: "scheduled",
    avatar: "/placeholder.svg",
  },
];

const statusStyles = {
  upcoming: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  completed: "bg-green-100 text-green-800 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
};

const AppointmentList = () => {
  return (
    <Card className="col-span-12 md:col-span-6 lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Upcoming Appointments</CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          <Calendar className="mr-1 h-4 w-4" />
          View Calendar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center mb-3 sm:mb-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={appointment.avatar} alt={appointment.doctor} />
                  <AvatarFallback>
                    {appointment.doctor
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium">{appointment.doctor}</p>
                  <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{appointment.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Badge variant="secondary" className={statusStyles[appointment.status as keyof typeof statusStyles]}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 sm:h-8 sm:w-8">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button size="sm" className="h-8 w-full sm:w-auto bg-smartmed-emerald hover:bg-smartmed-emerald/90">
                  <Video className="h-4 w-4 mr-2" />
                  Join Call
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="link">View all appointments</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
