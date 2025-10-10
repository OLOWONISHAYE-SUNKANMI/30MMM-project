// app/Foundation/[id]/page.js

"use client";

import React, { useEffect, useState } from "react";
import { getDevotionalById } from "@/actions/devotional";
import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";
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

export default function Foundation({ params }) {
  const [devotionalData, setDevotionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userProgress, updateProgress } = useDashboardContext();

  useEffect(() => {
    async function loadDevotional() {
      try {
        setLoading(true);
        const result = await getDevotionalById(params.id);

        if (!result.success) {
          throw new Error(result.error);
        }

        setDevotionalData(result.devotional);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDevotional();
  }, [params.id]);

  const handleComplete = async () => {
    if (!devotionalData) return;

    try {
      await updateProgress(devotionalData.week, devotionalData.day);
      // Handle success
    } catch (error) {
      console.error("Error completing devotional:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading devotional...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Error loading devotional: {error}</p>
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
              <ReadingTime devotionText={devotionalData.devotionText} />
            </div>

            <div className="justify-left mt-[3vh] flex w-full">
              <MainLesson devotionText={devotionalData.devotionText} />
            </div>

            <div className="flex w-full flex-col items-center">
              <div className="mt-[6vh] flex w-full justify-center">
                <ReflectionBox
                  reflectionQuestion={devotionalData.reflectionQuestion}
                />
              </div>
              <div className="mt-[6vh] flex w-full justify-center">
                <ReflectionResponse />
              </div>
            </div>

            <Divider />

            <div className="mt-[2vh] flex w-full justify-center">
              <CompleteLesson />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
