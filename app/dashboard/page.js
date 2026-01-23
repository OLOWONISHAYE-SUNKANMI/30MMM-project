"use client";

import { useAuth } from "@/contexts/AuthContext";
import MainBody from "@/components/Dashboard/MainBody";
import PaymentVerification from "@/components/Dashboard/payment-verification";

export default function Dashboard() {
  const { authState } = useAuth();

  // Show loading state while auth is being determined
  if (authState.loading) {
    return (
      <div className="relative mx-16 flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-700"></div>
          <p className="text-gray-600">
            {authState.signingOut ? "Signing out..." : "Loading dashboard..."}
          </p>
        </div>
      </div>
    );
  }

  // Show message if not authenticated
  if (!authState.isAuthenticated || !authState.user?.id) {
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

  // Only render dashboard if user is fully authenticated with valid ID
  return (
    <div className="relative mx-16 flex min-h-screen flex-col items-center justify-start">
      <PaymentVerification>
        <MainBody />
      </PaymentVerification>
    </div>
  );
}
