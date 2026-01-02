"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardProvider from "@/contexts/dashboard/dashboard-provider";
import { SessionProvider } from "next-auth/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <SessionProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </SessionProvider>
      </AuthProvider>
    </>
  );
}

export default Providers;
