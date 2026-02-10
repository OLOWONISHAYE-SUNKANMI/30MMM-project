"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardProvider from "@/contexts/dashboard/dashboard-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <AuthProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}

export default Providers;
