"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth"; // Assuming you have an auth context/hook
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <MobileNavBar
      isAuthenticated={isAuthenticated}
      user={user}
    />
  ) : (
    <DesktopNavBar
      isAuthenticated={isAuthenticated}
      user={user}
    />
  );
}
