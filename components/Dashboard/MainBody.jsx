import { useEffect, useState } from "react";
import { getCurrentAuthState } from "@/actions/auth";
import { useAuth } from "@/contexts/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import DonateHero from "@/components/Dashboard/DonateHero";
import CardSection from "./CardSection";

export default function MainBody() {
  const [isMobile, setIsMobile] = useState(false);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchAuth() {
      try {
        const authData = await getCurrentAuthState();
        setAuthState({
          ...authData,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to fetch auth:", error);

        // Always default to unauthenticated state on any error
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: error.message || "Authentication check failed",
        });
      }
    }

    fetchAuth();
    console.log("Auth State from Body:", authState);
  }, []);

  return (
    <div className="relative mx-auto mb-8 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-y-5 space-y-4 pt-12 max-lg:mx-2">
      <div className="flex w-full flex-wrap items-center justify-start gap-2 md:gap-y-5">
        <h1 className="text-3xl font-bold leading-relaxed md:text-4xl">
          Hello, {authState.user?.fullName}
        </h1>
        <FaChevronDown size={16} />

        <h2 className="w-full text-base font-normal text-gray-400">
          Today is{" "}
          <span className="font-semibold text-almost-black">
            Week CurrentWeekNum Day CurrentDayNum: CurrentDayTitle
          </span>
        </h2>
      </div>
      <DonateHero />
      {/* The sizes by lines are 22 14 12 and the buttons are 16 */}
      <div className="mr-auto w-full">
        <h4 className="text-3xl font-semibold leading-7 tracking-wider">
          CLEAN cohortNumText
        </h4>
      </div>
      <CardSection />
    </div>
  );
}
