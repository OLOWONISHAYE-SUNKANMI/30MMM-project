import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
import { FaChevronDown } from "react-icons/fa";
import DonateHero from "@/components/Dashboard/DonateHero";
import intToRoman from "@/lib/intToRoman";
import CardSection from "./CardSection";

export default function MainBody() {
  const { userInfo, userProgress } = useDashboardContext();

  const cohortText = userInfo.cohortRoman;

  return (
    <div className="relative mx-auto mb-8 mt-24 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-y-5 space-y-4 pt-12 max-lg:mx-2">
      <div className="flex flex-wrap items-center justify-start w-full gap-2 md:gap-y-5">
        <h1 className="text-3xl font-bold leading-relaxed md:text-4xl">
          Hello, {userInfo.fullName}
        </h1>
        <FaChevronDown size={16} />

        <h2 className="w-full text-base font-normal text-gray-400">
          Today is{" "}
          <span className="font-semibold text-almost-black">
            Week {userProgress.currentWeek} Day {userProgress.currentDay}:{" "}
            {userProgress.currentDayTitle}
          </span>
        </h2>
      </div>
      {/* Pledge Donation */}
      <div class="plg-donate" data-widget-id="S1NzAwq1gKUewVE3"></div>
      <DonateHero />
      {/* The sizes by lines are 22 14 12 and the buttons are 16 */}
      <div className="w-full mr-auto">
        <h4 className="text-3xl font-semibold leading-7 tracking-wider">
          CLEAN {cohortText}
        </h4>
      </div>
      <CardSection />
    </div>
  );
}
