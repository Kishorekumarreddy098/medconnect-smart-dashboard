
import { Button } from "@/components/ui/button";

const WelcomeBanner = () => {
  return (
    <div className="col-span-12 rounded-lg bg-gradient-smartmed p-6 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome back, John!</h1>
          <p className="text-white/90 max-w-xl">
            Your health dashboard is updated. You have 1 upcoming appointment and 2 medication alerts today.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-smartmed-emerald">
            Book Appointment
          </Button>
          <Button size="sm" variant="secondary">
            Call Emergency
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
