import NavLogo from "./nav-bar-logo";

export default function LoadingNavBar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="mx-4 flex items-center justify-between p-4 text-black">
        {/* Left section: Logo */}
        <div className="flex w-1/4 items-center">
          <NavLogo />
        </div>
      </div>
    </nav>
  );
}
