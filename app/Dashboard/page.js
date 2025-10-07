"use client";

import { useAuth } from "@/contexts/AuthContext";
import MainBody from "@/components/Dashboard/MainBody";
import NavigationBar from "@/components/Dashboard/NavigationBar";
import PaymentVerification from "@/components/Dashboard/payment-verification";

export default function Dashboard() {
  const { authState } = useAuth();

  if (authState.loading) {
    return (
      <div className="relative mx-16 flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600">
            {authState.signingOut ? "Signing out..." : "Loading dashboard..."}
          </p>
        </div>
      </div>
    );
  }

  // Only render dashboard if user is authenticated
  if (authState.isAuthenticated) {
    return (
      <div className="relative mx-16 flex min-h-screen flex-col items-center justify-start">
        <PaymentVerification>
          <NavigationBar />
          <MainBody />
        </PaymentVerification>
      </div>
    );
  } else {
    return (
      <div className="relative mx-16 flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600">
            You must be logged in to view the dashboard.
          </p>
        </div>
      </div>
    );
  }
}
