"use client";

import { useEffect, useState } from "react";
import { getDevotionalById } from "@/actions/devotional";
import { getUserProgress } from "@/actions/user-progress";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import DonateHero from "@/components/Dashboard/DonateHero";
import CardSection from "./CardSection";

export default function MainBody() {
  const { data: session, status } = useSession();
  const [userProgress, setUserProgress] = useState(null);
  const [currentDevotional, setCurrentDevotional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "loading") {
        console.log("MainBody - Session is loading, waiting...");
        return;
      }

      if (status === "unauthenticated" || !session?.user?.id) {
        console.log("MainBody - No user session found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch user progress
        const progressResult = await getUserProgress(session.user.id);

        if (progressResult.success) {
          setUserProgress(progressResult.userProgress);

          // Fetch current devotional
          const currentWeek = progressResult.userProgress.currentWeek || 1;
          const currentDay = progressResult.userProgress.currentDay || 1;
          const devotionalId = `${currentWeek}-${currentDay}`;

          const devotionalResult = await getDevotionalById(devotionalId);

          if (devotionalResult.success) {
            setCurrentDevotional(devotionalResult.devotional);
            console.log(
              "MainBody - Current devotional:",
              devotionalResult.devotional,
            );
          }
        } else {
          console.error(
            "MainBody - Failed to fetch user progress:",
            progressResult.error,
          );
          setError(progressResult.error);
        }
      } catch (error) {
        console.error("MainBody - Error fetching user data:", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="container relative flex size-full animate-pulse flex-col items-center justify-center rounded-lg border bg-white shadow-sm">
        <div className="mb-4 h-8 w-48 rounded bg-gray-200"></div>
        <div className="h-4 w-32 rounded bg-gray-200"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container relative flex size-full flex-col items-center justify-center rounded-lg border bg-white shadow-sm">
        <p>Please log in to view your progress</p>
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

  if (!session?.user) {
    return (
      <div className="container relative flex size-full flex-col items-center justify-center rounded-lg border bg-white shadow-sm">
        <p>Session not available</p>
      </div>
    );
  }

  // Default values
  const cohortDisplay = userProgress?.cohortRoman || "I";
  const weekDisplay = userProgress?.currentWeek || 1;
  const dayDisplay = userProgress?.currentDay || 1;
  const devotionalTitle = currentDevotional?.dayTitle || "Loading...";

  // Create the devotional ID in the format "week-day"
  const devotionalId = `${weekDisplay}-${dayDisplay}`;

  console.log("MainBody - Rendering with:", {
    userId: session.user.id,
    userProgress,
    currentDevotional,
    cohortDisplay,
    weekDisplay,
    dayDisplay,
  });

  return (
    <div className="relative mx-auto mb-8 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-y-5 space-y-4 pt-12 max-lg:mx-2">
      <div className="flex w-full flex-wrap items-center justify-start gap-2 md:gap-y-5">
        <h1 className="text-3xl font-bold leading-relaxed md:text-4xl">
          Hello, {session.user.name || "User"}!
        </h1>
        <FaChevronDown size={16} />

        <h2 className="w-full text-base font-normal text-gray-400">
          Today is{" "}
          <Link href={`/devotional/${devotionalId}`}>
            <span className="font-semibold text-almost-black hover:underline">
              Week {weekDisplay} Day {dayDisplay}: {devotionalTitle}
            </span>
          </Link>
        </h2>
      </div>
      <DonateHero />
      <div className="mr-auto w-full">
        <h4 className="text-3xl font-semibold leading-7 tracking-wider">
          CLEAN {cohortDisplay}
        </h4>
      </div>
      <CardSection userId={session.user.id} />
    </div>
  );
}
