import SidePanel from "@/components/Dashboard/SidePanel/SidePanel";
import AuthButtons from "./nav-auth-buttons";
import NavLogo from "./nav-bar-logo";
import NavLinks from "./nav-links";
import UserMenu from "./user-menu";

export default function DesktopNavBar({
  isAuthenticated,
  user,
  showInternalMenu,
}) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="mx-4 lg:mx-6 xl:mx-10 flex items-center justify-between p-3 lg:p-4 text-black">
        {/* Left section: Logo */}
        <div className="flex items-center">
          <NavLogo />
        </div>

        {/* Center section: Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6">
          <NavLinks
            isAuthenticated={isAuthenticated}
            showInternalMenu={showInternalMenu}
          />
        </div>

        {/* Right section: Auth buttons or User menu */}
        <div className="flex items-center justify-end gap-2 lg:gap-4">
          {isAuthenticated ? <UserMenu user={user} /> : <AuthButtons />}
          {isAuthenticated && showInternalMenu && <SidePanel />}
        </div>
      </div>
    </nav>
  );
}
