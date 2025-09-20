import Link from "next/link";
import { usePathname } from "next/navigation";
import { AboutDropdown, ProgramsDropdown } from "./nav-dropdowns";
import NavLink from "./nav-link";

export default function NavLinks({ onLinkClick, isAuthenticated, isMobile }) {
  const pathname = usePathname();

  return (
    <>
      {isAuthenticated ? (
        // Links for logged-in users
        <>
          <NavLink
            href="/dashboard"
            onClick={onLinkClick}
          >
            Dashboard
          </NavLink>
          <NavLink
            href="/devotional"
            onClick={onLinkClick}
          >
            Devotionals
          </NavLink>
          <NavLink
            href="/resources"
            onClick={onLinkClick}
          >
            Resources
          </NavLink>
          {!isMobile ? (
            <ProgramsDropdown />
          ) : (
            <div className="mobile-section">
              <div className="mobile-header py-2 text-lg font-semibold text-gray-800">
                Programs
              </div>
              <div className="mobile-submenu space-y-1 pl-4">
                <NavLink
                  href="/programs/program1"
                  onClick={onLinkClick}
                  className="text-sm"
                >
                  Program 1
                </NavLink>
                <NavLink
                  href="/programs/program2"
                  onClick={onLinkClick}
                  className="text-sm"
                >
                  Program 2
                </NavLink>
                {/* Add other program links as needed */}
              </div>
            </div>
          )}
          <NavLink
            href="/testimonials"
            onClick={onLinkClick}
          >
            Testimonials
          </NavLink>
        </>
      ) : (
        // Links for logged-out users
        <>
          <NavLink
            href="/donate"
            onClick={onLinkClick}
          >
            Donate
          </NavLink>
          <NavLink
            href="/testimonials"
            onClick={onLinkClick}
          >
            Testimonials
          </NavLink>
          {!isMobile ? (
            <>
              <AboutDropdown />
              <ProgramsDropdown />
            </>
          ) : (
            <>
              {/* About section with hierarchy */}
              <div className="mobile-section">
                <div className="mobile-header py-2 text-lg font-semibold text-gray-800">
                  About
                </div>
                <div className="mobile-submenu space-y-1 pl-4">
                  <NavLink
                    href="/about"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Overview
                  </NavLink>
                  <NavLink
                    href="/about/our-story"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Our Story
                  </NavLink>
                  <NavLink
                    href="/about/leadership"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Leadership
                  </NavLink>
                </div>
              </div>

              {/* Programs section with hierarchy */}
              <div className="mobile-section">
                <div className="mobile-header py-2 text-lg font-semibold text-gray-800">
                  Programs
                </div>
                <div className="mobile-submenu space-y-1 pl-4">
                  <NavLink
                    href="/programs"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Overview
                  </NavLink>
                  <NavLink
                    href="/programs/program1"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Program 1
                  </NavLink>
                  <NavLink
                    href="/programs/program2"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Program 2
                  </NavLink>
                  {/* Add other program links as needed */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
