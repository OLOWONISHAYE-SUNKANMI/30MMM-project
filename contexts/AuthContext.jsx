"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentAuthState } from "@/actions/auth";
import { usePathname } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    signingOut: false,
    error: null,
  });

  // Function to refresh auth state from server
  const refreshAuthState = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const authData = await getCurrentAuthState();
      setAuthState({
        ...authData,
        loading: false,
        signingOut: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch auth:", error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        signingOut: false,
        error: error.message || "Authentication check failed",
      });
    }
  };

  // Refresh auth state on mount
  useEffect(() => {
    refreshAuthState();
  }, []);

  // Refresh auth state when pathname changes (e.g., after login redirect)
  useEffect(() => {
    if (pathname) {
      refreshAuthState();
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, refreshAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
