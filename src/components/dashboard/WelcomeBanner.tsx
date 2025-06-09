
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const WelcomeBanner = () => {
  const { isSignedIn, user } = useAuth();
  
  return (
    <div className="col-span-12 rounded-lg bg-gradient-smartmed p-6 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            Welcome{isSignedIn && user ? `, ${user.firstName || 'back'}` : ' to SmartMed'}!
          </h1>
          <p className="text-white/90 max-w-xl">
            {isSignedIn 
              ? "Your health dashboard is ready. Upload a prescription to get started with our AI-powered analysis." 
              : "Transform your healthcare experience with AI-powered prescription analysis and digital health management."
            }
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          {isSignedIn ? (
            <>
              <Link to="/prescriptions">
                <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-smartmed-emerald">
                  Upload Prescription
                </Button>
              </Link>
              <Button size="sm" variant="secondary">
                Call Emergency
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-smartmed-emerald">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" variant="secondary">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
