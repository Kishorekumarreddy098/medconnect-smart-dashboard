
import { useState } from 'react';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const [view, setView] = useState<'signIn' | 'signUp'>('signIn');
  const { isSignedIn } = useAuth();
  
  // Redirect to home if already signed in
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center">
            <div className="bg-gradient-smartmed w-10 h-10 rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-smartmed">
              SmartMed
            </span>
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setView('signIn')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                view === 'signIn' 
                  ? 'bg-smartmed-emerald text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setView('signUp')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                view === 'signUp' 
                  ? 'bg-smartmed-emerald text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        {view === 'signIn' ? (
          <SignIn 
            routing="hash" 
            path="/sign-in" 
            signUpUrl="#sign-up"
            appearance={{
              elements: {
                formButtonPrimary: "bg-smartmed-emerald hover:bg-smartmed-emerald/90 text-sm normal-case"
              }
            }}
          />
        ) : (
          <SignUp 
            routing="hash" 
            path="/sign-up" 
            signInUrl="#sign-in"
            appearance={{
              elements: {
                formButtonPrimary: "bg-smartmed-emerald hover:bg-smartmed-emerald/90 text-sm normal-case"
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
