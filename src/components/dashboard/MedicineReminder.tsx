
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pill, Bell } from "lucide-react";

const medicationReminders = [
  {
    id: 1,
    name: "Lisinopril 10mg",
    instruction: "1 tablet with food",
    time: "8:00 AM",
    taken: true,
  },
  {
    id: 2,
    name: "Atorvastatin 20mg",
    instruction: "1 tablet at night",
    time: "9:00 PM",
    taken: false,
  },
  {
    id: 3,
    name: "Metformin 500mg",
    instruction: "1 tablet after meals",
    time: "2:30 PM",
    taken: false,
  },
];

const MedicineReminder = () => {
  return (
    <Card className="col-span-12 md:col-span-6 lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Medication Reminders</CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          <Bell className="mr-1 h-4 w-4" />
          Manage Alerts
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medicationReminders.map((med) => (
            <div key={med.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-start">
                <Checkbox checked={med.taken} className="mt-1" />
                <div className="ml-3">
                  <p className={`text-sm font-medium ${med.taken ? "line-through text-muted-foreground" : ""}`}>
                    {med.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{med.instruction}</p>
                  <div className="flex items-center mt-1">
                    <Pill className="h-3 w-3 mr-1 text-smartmed-teal" />
                    <span className="text-xs text-smartmed-teal font-medium">{med.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button className="w-full bg-smartmed-teal hover:bg-smartmed-teal/90">
            <Pill className="h-4 w-4 mr-2" />
            Refill Prescriptions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineReminder;
