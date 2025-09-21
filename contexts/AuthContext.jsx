"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentAuthState } from "@/actions/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchAuth() {
      try {
        const authData = await getCurrentAuthState();
        setAuthState({
          ...authData,
          loading: false,
          error: null,
        });
        console.log("AuthContext auth data:", authData);
      } catch (error) {
        console.error("Failed to fetch auth:", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: error.message || "Authentication check failed",
        });
      }
    }

    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
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
