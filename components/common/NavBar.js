"use client";

import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeSheet = () => setOpen(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const routes = {
    landing: [
      "/",
      "/founders-bio",
      "/about",
      "/scholarship",
      "/scholarship-application",
      "/individuals",
      "/churches",
    ],
    hideButtons: [
      "/login",
      "/signup",
      "/pricing",
      "/dashboard",
      "/sitemap",
      "/devotional",
      "/settings",
      "/payment",
      "/contact",
      "/donate",
    ],
    default: [],
  };

  const NavLink = ({ href, children, className = "" }) => (
    <Link
      href={href}
      className={`transition-colors hover:text-gray-600 ${className}`}
      onClick={closeSheet}
    >
      {children}
    </Link>
  );

  const AboutDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center transition-colors hover:text-gray-600">
        About
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <NavLink href="/about">About the Program</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/individuals">Clean for Individuals</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/churches">Clean for Churches</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/founders-bio">Founder&apos;s Bio</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href="/scholarship">Scholarship</NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const ProgramsDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center transition-colors hover:text-gray-600">
        Programs
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {programsList.map((program) => (
          <DropdownMenuItem
            key={program.name}
            asChild
          >
            <Link
              href={program.href}
              target="_blank"
            >
              {program.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const programsList = [
    { name: "Carpenter's Son Program", href: "https://the-carpenters-son.org" },
  ];

  const aboutLinks = [
    { name: "About the Program", href: "/about" },
    { name: "Clean for Individuals", href: "/individuals" },
    { name: "Clean for Churches", href: "/churches" },
    { name: "Founder's Bio", href: "/founders-bio" },
    { name: "Scholarship", href: "/scholarship" },
  ];

  const navLinks = (
    <>
      <AboutDropdown />
      <ProgramsDropdown />
      <NavLink href="/donate">Donate</NavLink>
      <NavLink href="/testimonials">Testimonials</NavLink>
    </>
  );

  const renderButtons = () => {
    if (routes.landing.includes(pathname)) {
      return (
        <NavLink href="/pricing">
          <Button
            variant="outline"
            className="w-full border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
          >
            Start Your Journey
          </Button>
        </NavLink>
      );
    }

    if (routes.hideButtons.includes(pathname)) {
      return null;
    }

    return (
      <>
        <NavLink href="/login">
          <Button
            variant="outline"
            className="w-full border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
          >
            Log In
          </Button>
        </NavLink>
        <NavLink href="/signup">
          <Button className="w-full bg-primary-red text-white hover:bg-red-800">
            Sign Up
          </Button>
        </NavLink>
      </>
    );
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="mx-4 flex items-center justify-between p-4 text-black md:mx-10">
        {/* Left section: Logo */}
        <div className="flex w-1/4 items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Thirty Mighty Men Ministries Logo"
                width={35}
                height={35}
              />
              <Image
                src="/images-2/Thirty Mighty Men Ministries - text logo.png"
                alt="Thirty Mighty Men Ministries Logo"
                className="h-fit w-auto max-w-[175px]"
                width={602}
                height={169}
              />
            </div>
          </Link>
        </div>

        {/* Center section: Navigation Links (desktop only) */}
        {!isMobile && (
          <div className="flex w-1/2 items-center justify-center gap-6">
            {navLinks}
          </div>
        )}

        {/* Right section: Buttons or Mobile Menu */}
        <div className="flex w-1/4 items-center justify-end">
          {isMobile ? (
            <Sheet
              open={open}
              onOpenChange={setOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80"
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <NavLink
                    href="/"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Home
                  </NavLink>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">About</h4>
                    {aboutLinks.map((item) => (
                      <NavLink
                        key={item.name}
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <NavLink
                    href="/donate"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Donate
                  </NavLink>
                  <NavLink
                    href="/testimonials"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Testimonials
                  </NavLink>
                  {renderButtons()}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-4">{renderButtons()}</div>
          )}
        </div>
      </div>
    </nav>
  );
}
