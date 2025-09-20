import Link from "next/link";

export default function NavLink({ href, children, className = "", onClick }) {
  return (
    <Link
      href={href}
      className={`block transition-colors hover:text-gray-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
