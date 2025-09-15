import Link from "next/link";
import { usePathname } from "next/navigation";
import { AboutDropdown, ProgramsDropdown } from "./nav-dropdowns";

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
          {!isMobile && <ProgramsDropdown />}
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
          {!isMobile && <AboutDropdown />}
          {!isMobile && <ProgramsDropdown />}
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
        </>
      )}
    </>
  );
}

export function NavLink({ href, children, className = "", onClick }) {
  return (
    <Link
      href={href}
      className={`transition-colors hover:text-gray-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
