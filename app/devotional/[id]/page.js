// app/Foundation/[id]/page.js

"use client";

import React, { use, useEffect, useState } from "react";
import { getDevotionalById } from "@/actions/devotional";
import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Divider from "@/components/common/Divider";
import ReflectionProcessingForm from "@/components/Foundation/Devotional-v2/reflection-processing-form";
import MainImage from "@/components/Foundation/MainImage";
import MainLesson from "@/components/Foundation/MainLesson";
import Quotes from "@/components/Foundation/Quotes";
import ReadingTime from "@/components/Foundation/ReadingTime";
import ReflectionBox from "@/components/Foundation/ReflectionBox";
import ScripturesSection from "@/components/Foundation/ScripturesSection";
import SubTitle from "@/components/Foundation/SubTitle";
import Title from "@/components/Foundation/Title";

export default function Devotional({ params }) {
  /**
   * Hooks and contexts
   */
  const unwrappedParams = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userProgress } = useDashboardContext();
  const devotionalId = unwrappedParams.id;

  /**
   * Data and State Management
   */
  const [devotionalData, setDevotionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effects and Data Fetching
   */
  useEffect(() => {
    const fetchDevotional = async () => {
      if (devotionalId && session) {
        try {
          setLoading(true);
          setError(null);

          const result = await getDevotionalById(devotionalId);

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
    };

    fetchDevotional();
  }, [devotionalId, session]);

  /**
   * Troubleshooting Logs
   */
  useEffect(() => {
    if (devotionalData) {
      console.log("Devotional data updated:", devotionalData);
      console.log("Devotional ID:", devotionalData.numberId);
    }
  }, [devotionalData]); // This runs whenever devotionalData changes

  /**
   * Loading State
   */
  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading devotional...</p>
      </div>
    );
  }

  /**
   * Error State
   */
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

  // Error State for missing devotional
  if (!devotionalData) {
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

  /**
   *
   *
   *
   * Main JSX
   *
   *
   *
   */

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

            <Divider />

            {/* ReflectionTextBox */}
            <ReflectionProcessingForm
              devotionalDataId={devotionalData.id}
              devotionalNumberId={devotionalData.numberId}
              userId={session?.user?.id}
              week={devotionalData.week}
              day={devotionalData.day}
              firstName={session?.user?.firstName}
              lastName={session?.user?.lastName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
