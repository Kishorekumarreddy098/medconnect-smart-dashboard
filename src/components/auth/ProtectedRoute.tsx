
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();
  
  // Show loading or spinner while auth state is loading
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Redirect to auth page if not signed in
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
