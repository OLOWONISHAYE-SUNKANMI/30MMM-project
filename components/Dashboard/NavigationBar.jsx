import React from "react";
import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavigationBar() {
  const { userInfo } = useDashboardContext();

  const { initials, avatarUrl, firstName } = userInfo;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 md:mx-10">
        {/* Left section: Logo */}
        <div className="flex items-center">
          <Link href="/Dashboard">
            <div className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
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
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right Section: Avatar */}
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={avatarUrl ? avatarUrl : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="items-center justify-center text-base font-medium leading-relaxed tracking-wide max-sm:hidden">
            {firstName}
          </span>
          <FaChevronDown
            size={16}
            className="text-primary-red"
          />
        </div>
      </div>
    </nav>
  );
}
