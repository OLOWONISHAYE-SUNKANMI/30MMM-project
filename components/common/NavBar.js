"use client";

import { useEffect, useState } from "react";
import { getCurrentAuthState } from "@/actions/auth";
import { useAuth } from "@/contexts/AuthContext";
import DesktopNavBar from "./desktop-nav-bar";
import LoadingNavBar from "./loading-nav-bar";
import MobileNavBar from "./mobile-nav-bar";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add listener for resize events
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function fetchAuth() {
      try {
        const authData = await getCurrentAuthState();
        setAuthState({
          ...authData,
          loading: false,
          error: null,
        });
        console.log("NavBar auth data:", authData);
      } catch (error) {
        console.error("Failed to fetch auth:", error);

        // Always default to unauthenticated state on any error
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

  // Show loading state
  if (authState.loading) {
    return <LoadingNavBar />;
  }

  // Show error state briefly if needed (optional)
  if (authState.error) {
    console.warn("NavBar auth error:", authState.error);
    // Still render the navbar but in unauthenticated state
  }

  return isMobile ? (
    <MobileNavBar
      isAuthenticated={authState.isAuthenticated}
      user={authState.user}
    />
  ) : (
    <DesktopNavBar
      isAuthenticated={authState.isAuthenticated}
      user={authState.user}
    />
  );
}
