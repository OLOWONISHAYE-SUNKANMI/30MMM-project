"use client";

import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import DonateHero from "@/components/Dashboard/DonateHero";
import CardSection from "./CardSection";

export default function MainBody() {
  const { userInfo, userProgress, loading, error } = useDashboardContext();

  if (loading) {
    return (
      <div className="container relative flex size-full animate-pulse flex-col items-center justify-center rounded-lg border bg-white shadow-sm">
        <div className="mb-4 h-8 w-48 rounded bg-gray-200"></div>
        <div className="h-4 w-32 rounded bg-gray-200"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container relative flex size-full flex-col items-center justify-center rounded-lg border bg-white shadow-sm">
        <p className="text-red-600">Error loading progress: {error}</p>
      </div>
    );
  }

  // Default values if data is not yet loaded
  const cohortDisplay = userInfo?.cohortRoman || "N/A";
  const weekDisplay = userProgress?.currentWeek || "1";
  const dayDisplay = userProgress?.currentDay || "1";
  const devotionalTitle = userProgress?.currentDayTitle || "Loading...";

  return (
    <div className="relative mx-auto mb-8 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-y-5 space-y-4 pt-12 max-lg:mx-2">
      <div className="flex w-full flex-wrap items-center justify-start gap-2 md:gap-y-5">
        <h1 className="text-3xl font-bold leading-relaxed md:text-4xl">
          Hello, {userInfo?.name || "User"}!
        </h1>
        <FaChevronDown size={16} />

        <h2 className="w-full text-base font-normal text-gray-400">
          Today is{" "}
          <span className="font-semibold text-almost-black">
            Week {weekDisplay} Day {dayDisplay}: {devotionalTitle}
          </span>
        </h2>
      </div>
      <DonateHero />
      {/* The sizes by lines are 22 14 12 and the buttons are 16 */}
      <div className="mr-auto w-full">
        <h4 className="text-3xl font-semibold leading-7 tracking-wider">
          CLEAN {cohortDisplay}
        </h4>
      </div>
      <CardSection />
    </div>
  );
}
