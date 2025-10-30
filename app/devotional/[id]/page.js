// app/Foundation/[id]/page.js

"use client";

import React, { use, useEffect, useState } from "react";
import { getDevotionalById } from "@/actions/devotional";
import { completeDevotional } from "@/actions/user-progress";
import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Divider from "@/components/common/Divider";
import CompleteLesson from "@/components/Foundation/CompleteLesson";
import MainImage from "@/components/Foundation/MainImage";
import MainLesson from "@/components/Foundation/MainLesson";
import Quotes from "@/components/Foundation/Quotes";
import ReadingTime from "@/components/Foundation/ReadingTime";
import ReflectionBox from "@/components/Foundation/ReflectionBox";
import ReflectionResponse from "@/components/Foundation/ReflectionResponse";
import ScripturesSection from "@/components/Foundation/ScripturesSection";
import SubTitle from "@/components/Foundation/SubTitle";
import Title from "@/components/Foundation/Title";

export default function Devotional({ params }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);

  // Authentication and routing
  const { data: session, status } = useSession();
  const router = useRouter();

  // Data and state management
  const [devotionalData, setDevotionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reflectionResponse, setReflectionResponse] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionError, setCompletionError] = useState(null);

  // Dashboard context for progress management
  const { userProgress, refreshProgress } = useDashboardContext();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  // Load devotional data
  useEffect(() => {
    async function loadDevotional() {
      try {
        setLoading(true);
        setError(null);

        const result = await getDevotionalById(unwrappedParams.id);

        if (!result.success) {
          throw new Error(result.error);
        }

        setDevotionalData(result.devotional);
      } catch (err) {
        console.error("Error loading devotional:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (unwrappedParams.id && session) {
      loadDevotional();
    }
  }, [unwrappedParams.id, session]);

  // Check if this devotional is already completed
  useEffect(() => {
    if (userProgress && devotionalData) {
      const devotionalNumber =
        (devotionalData.week - 1) * 7 + devotionalData.day;
      const isAlreadyCompleted =
        userProgress.completedDevotionalIds?.includes(devotionalNumber) ||
        false;

      // Only update if different to prevent unnecessary re-renders
      if (isAlreadyCompleted !== isCompleted) {
        setIsCompleted(isAlreadyCompleted);
      }
    }
  }, [userProgress, devotionalData, isCompleted]);

  // Handle reflection response changes
  const handleReflectionChange = (value) => {
    setReflectionResponse(value);
  };

  // Handle devotional completion
  const handleCompleteLesson = async () => {
    if (!devotionalData || !session?.user?.id) {
      setCompletionError("Missing required data for completion");
      return;
    }

    setIsCompleting(true);
    setCompletionError(null);

    try {
      // Call the completeDevotional server action

      const result = await completeDevotional(
        session.user.id,
        devotionalData.id,
        devotionalData.week,
        devotionalData.day,
        reflectionResponse.trim() || undefined,
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      // Update local state to show completion

      setIsCompleted(true);
      setIsCompleting(false);
      // Keep isCompleting as true until user navigates away
      // This prevents the flash of buttons

      // Refresh progress in background
      refreshProgress().catch(console.error);

      console.log("Devotional completed successfully");
    } catch (err) {
      console.error("Error completing devotional:", err);
      setCompletionError(err.message);
      // Only reset completing state on error
      setIsCompleting(false);
    }
  };

  // Handle navigation actions
  const handleReturnToDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoToVideos = () => {
    router.push("/dashboard/videos");
  };

  // Loading states
  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading devotional...</p>
      </div>
    );
  }

  // Error states
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-500">Error loading devotional: {error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded bg-primary-red px-4 py-2 text-white hover:bg-red-800"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!devotionalData) {
    return null;
  }

  return (
    <div className="mt-16 flex w-full flex-col justify-between px-2 py-2 md:px-4 md:py-4 lg:px-[1vw] lg:py-[1vh]">
      <div className="mt-8 flex flex-col items-center">
        <div className="lg:max-w-10xl flex flex-col md:max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="group mb-6 flex items-center gap-2 self-start rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          >
            <svg
              className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <div className="mb-8 flex flex-col items-start bg-white md:flex-col">
            <div className="mt-[3vh]">
              <Title
                weekTitle={devotionalData.weekTitle}
                dayTitle={devotionalData.dayTitle}
                daySubtitle={devotionalData.daySubTitle}
              />
            </div>

            <div className="mb-[2vh] mt-[1vh]">
              <SubTitle
                week={devotionalData.week}
                day={devotionalData.day}
              />
            </div>

            <div className="flex w-full justify-center">
              <div className="flex items-center justify-center">
                <MainImage videoId={devotionalData.videoId} />
              </div>
            </div>

            <div className="flex w-full justify-center">
              <Quotes />
            </div>

            <div className="mb-[3vh] flex w-full justify-center">
              <ScripturesSection scriptures={devotionalData.Scriptures} />
            </div>

            <div className="justify-left mt-[1vh] flex w-full">
              <ReadingTime devotionText={devotionalData.devotionText || ""} />
            </div>

            <div className="justify-left wfull mt-[3vh] flex">
              <MainLesson devotionText={devotionalData.devotionText || ""} />
            </div>

            <div className="flex w-full flex-col items-center">
              <div className="mt-[6vh] flex w-full justify-center">
                <ReflectionBox
                  reflectionQuestion={devotionalData.reflectionQuestion}
                />
              </div>
            </div>

            {/* Completion Error Display */}
            {completionError && (
              <div className="mt-4 flex w-full justify-center">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  <p className="font-medium">Error completing devotional:</p>
                  <p className="text-sm">{completionError}</p>
                </div>
              </div>
            )}

            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
}
