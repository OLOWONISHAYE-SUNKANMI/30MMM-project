"use client";

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
          {!isMobile ? (
            <ProgramsDropdown />
          ) : (
            <div className="mobile-section"></div>
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
          {!isMobile ? (
            <>
              <AboutDropdown />
              <ProgramsDropdown />
              <NavLink
                href="/testimonials"
                onClick={onLinkClick}
              >
                Testimonials
              </NavLink>
              <NavLink
                href="/scholarship"
                onClick={onLinkClick}
              >
                Scholarship Program
              </NavLink>
              <NavLink
                href="/donate"
                onClick={onLinkClick}
              >
                Donate
              </NavLink>
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
                    Our Mission
                  </NavLink>
                  <NavLink
                    href="/founders-bio"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Our Founder
                  </NavLink>
                  <NavLink
                    href="/contact"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Get in Touch
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
                    href="/individuals"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    For Individuals
                  </NavLink>
                  <NavLink
                    href="/churches"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    For Churches
                  </NavLink>
                  <NavLink
                    href="/scholarship"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    Scholarship Assistance
                  </NavLink>
                  <NavLink
                    href="https://www.the-carpenters-son.org/"
                    onClick={onLinkClick}
                    className="text-sm"
                  >
                    The Carpenter's Son Apprenticeship
                  </NavLink>
                  {/* Add other program links as needed */}
                </div>
              </div>

              <NavLink
                href="/testimonials"
                onClick={onLinkClick}
              >
                Testimonials
              </NavLink>
              <NavLink
                href="/donate"
                onClick={onLinkClick}
              >
                Donate
              </NavLink>
            </>
          )}
        </>
      )}
    </>
  );
}
