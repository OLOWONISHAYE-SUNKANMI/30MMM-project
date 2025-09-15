import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthButtons from "./nav-auth-buttons";
import NavLogo from "./nav-bar-logo";
import NavLinks from "./nav-links";
import UserMenu from "./user-menu";

export default function MobileNavBar({ isAuthenticated, user }) {
  const [open, setOpen] = useState(false);
  const closeSheet = () => setOpen(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="mx-4 flex items-center justify-between p-4 text-black">
        {/* Left section: Logo */}
        <div className="flex w-1/4 items-center">
          <NavLogo />
        </div>

        {/* Right section: Mobile Menu */}
        <div className="flex w-1/4 items-center justify-end">
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
                {isAuthenticated ? (
                  // Logged in mobile menu
                  <>
                    <UserMenu
                      user={user}
                      mobile
                    />
                    <NavLinks
                      isAuthenticated={isAuthenticated}
                      onLinkClick={closeSheet}
                      isMobile={true}
                    />
                  </>
                ) : (
                  // Logged out mobile menu
                  <>
                    <NavLinks
                      isAuthenticated={isAuthenticated}
                      onLinkClick={closeSheet}
                      isMobile={true}
                    />
                    <AuthButtons onButtonClick={closeSheet} />
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
