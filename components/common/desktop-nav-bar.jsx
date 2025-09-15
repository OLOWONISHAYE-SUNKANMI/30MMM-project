import AuthButtons from "./nav-auth-buttons";
import NavLogo from "./nav-bar-logo";
import NavLinks from "./nav-links";
import UserMenu from "./user-menu";

export default function DesktopNavBar({ isAuthenticated, user }) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="mx-10 flex items-center justify-between p-4 text-black">
        {/* Left section: Logo */}
        <div className="flex w-1/4 items-center">
          <NavLogo />
        </div>

        {/* Center section: Navigation Links */}
        <div className="flex w-1/2 items-center justify-center gap-6">
          <NavLinks isAuthenticated={isAuthenticated} />
        </div>

        {/* Right section: Auth buttons or User menu */}
        <div className="flex w-1/4 items-center justify-end gap-4">
          {isAuthenticated ? <UserMenu user={user} /> : <AuthButtons />}
        </div>
      </div>
    </nav>
  );
}
