
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth, UserButton, SignInButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="bg-gradient-smartmed w-8 h-8 rounded-md flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-smartmed">
                  SmartMed
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className={`${
                  isActive('/') 
                    ? 'border-smartmed-emerald text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Dashboard
              </Link>
              {isSignedIn && (
                <>
                  <Link 
                    to="/consultations" 
                    className={`${
                      isActive('/consultations') 
                        ? 'border-smartmed-emerald text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Consultations
                  </Link>
                  <Link 
                    to="/prescriptions" 
                    className={`${
                      isActive('/prescriptions') 
                        ? 'border-smartmed-emerald text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Prescriptions
                  </Link>
                  <Link 
                    to="/pharmacy" 
                    className={`${
                      isActive('/pharmacy') 
                        ? 'border-smartmed-emerald text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Pharmacy
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {isSignedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2 font-semibold border-b">Notifications</div>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm">No new notifications</p>
                      <p className="text-xs text-gray-500">Check back later</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <div className="ml-3 relative">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton>
                  <Button variant="outline" className="bg-smartmed-emerald text-white hover:bg-smartmed-emerald/90">
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
