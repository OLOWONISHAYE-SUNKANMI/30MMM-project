"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardProvider from "@/contexts/dashboard/dashboard-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <DashboardProvider>{children}</DashboardProvider>
      </AuthProvider>
    </>
  );
}

export default Providers;
