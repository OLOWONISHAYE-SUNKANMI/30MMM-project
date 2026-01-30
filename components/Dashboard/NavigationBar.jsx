import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavLogo from "@/components/common/nav-bar-logo";
import UserMenu from "@/components/common/user-menu";

export default function NavigationBar() {
  const [isMobile, setIsMobile] = useState(false);
  const { authState } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 md:mx-10">
        {/* Left section: Logo */}
        <NavLogo />

        {/* Right Section: Avatar */}
        <UserMenu user={authState.user} />
      </div>
    </nav>
  );
}
