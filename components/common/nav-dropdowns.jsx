"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function AboutDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2 p-4">
              <ListItem
                href="/about"
                title="About Us"
              >
                Learn about our ministry and mission
              </ListItem>
              <ListItem
                href="/founders-bio"
                title="Founder's Bio"
              >
                Meet our founder and leadership
              </ListItem>
              <ListItem
                href="/contact"
                title="Contact"
              >
                Get in touch with our team
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function ProgramsDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Programs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-2 p-4">
              <ListItem
                href="/individuals"
                title="For Individuals"
              >
                Personal growth and development
              </ListItem>
              <ListItem
                href="/churches"
                title="For Churches"
              >
                Programs for church communities
              </ListItem>
              <ListItem
                href="/scholarship"
                title="Scholarship"
              >
                Financial assistance opportunities
              </ListItem>
              <ListItem
                href="/clean-program"
                title="CLEAN Program"
              >
                Our signature transformative program
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-slate-500">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
