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

  const refreshAuthState = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const authData = await getCurrentAuthState();
      const newState = {
        ...authData,
        loading: false,
        signingOut: false,
        error: null,
      };
      setAuthState(newState);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify({
          isAuthenticated: newState.isAuthenticated,
          user: newState.user
        }));
      }
    } catch (error) {
      console.error("Failed to fetch auth:", error);
      const errorState = {
        isAuthenticated: false,
        user: null,
        loading: false,
        signingOut: false,
        error: error.message || "Authentication check failed",
      };
      setAuthState(errorState);
      
      // Clear localStorage on error
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('authState');
      if (stored) {
        try {
          const parsedState = JSON.parse(stored);
          setAuthState(prev => ({
            ...prev,
            ...parsedState,
            loading: true // Still need to verify with server
          }));
        } catch (error) {
          console.error('Error parsing stored auth state:', error);
          localStorage.removeItem('authState');
        }
      }
    }
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
