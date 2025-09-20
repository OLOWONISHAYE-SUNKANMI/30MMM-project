import React, { useEffect, useState } from "react";
import { getCurrentAuthState } from "@/actions/auth";
import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
import NavLogo from "@/components/common/nav-bar-logo";
import UserMenu from "@/components/common/user-menu";

export default function NavigationBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });
  // const { userInfo } = useDashboardContext();

  // const { initials, avatarUrl, firstName } = userInfo;

  useEffect(() => {
    async function fetchAuth() {
      try {
        const authData = await getCurrentAuthState();
        setAuthState({
          ...authData,
          loading: false,
          error: null,
        });
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

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 md:mx-10">
        {/* Left section: Logo */}
        <NavLogo />

        {/* Right Section: Avatar */}
        <UserMenu user={authState.user} />
        {/* <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={avatarUrl ? avatarUrl : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="items-center justify-center text-base font-medium leading-relaxed tracking-wide max-sm:hidden">
            {firstName}
          </span>
          <FaChevronDown
            size={16}
            className="text-primary-red"
          />
        </div> */}
      </div>
    </nav>
  );
}
