import Link from "next/link";

export default function RootPage() {
  return (
    <main className="mx-auto mt-[20vh] grid h-[80vh] w-[80vw] grid-cols-4 gap-4">
      <Link
        href="/LogIn"
        className="text-center"
      >
        Log In
      </Link>
      <Link
        href="/SignUp"
        className="text-center"
      >
        Sign Up
      </Link>
      <Link
        href="/Settings"
        className="text-center"
      >
        Settings
      </Link>
      <Link
        href="/dashboard"
        className="text-center"
      >
        Dashboard
      </Link>
      <Link
        href="/foundation"
        className="text-center"
      >
        Foundation
      </Link>
      <Link
        href="/contact"
        className="text-center"
      >
        Contact
      </Link>
      <Link
        href="/help"
        className="text-center"
      >
        Help & Support
      </Link>
      <Link
        href="/terms"
        className="text-center"
      >
        Terms of Service
      </Link>
      <Link
        href="/landing"
        className="text-center"
      >
        Landing Page
      </Link>

      <div>Loading Page</div>
      <div>Error Page</div>
    </main>
  );
}
