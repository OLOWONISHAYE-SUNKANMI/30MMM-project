"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUserWithProgress } from "@/actions/dashboard";
import { initialWeekStaticInfo } from "@/contexts/dashboard/dashboard-data";

const DashboardContext = createContext(undefined);

export default function DashboardProvider({ children }) {
  // Initialize with null to avoid hydration issues
  const [userInfo, setUserInfo] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const weekStaticInfo = initialWeekStaticInfo;

  // Mark as hydrated after mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch user progress after hydration
  useEffect(() => {
    if (isHydrated) {
      fetchUserProgress();
    }
  }, [isHydrated]);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      // OPTIMIZED: Single call gets both user and progress
      const result = await getCurrentUserWithProgress();

      if (!result.success) {
        throw new Error(result.error || "Failed to get user data");
      }

      const { user, progress } = result;

      // Set user info
      setUserInfo({
        name: user.name || "User",
        email: user.email,
        image: user.image,
        cohort: progress?.cohortNumber || 1,
        cohortRoman: progress?.cohortRoman || "I",
      });

      // Set progress info
      if (progress) {
        setUserProgress({
          currentWeek: progress.currentWeek.toString(),
          currentDay: progress.currentDay.toString(),
          currentDayTitle: progress.currentDayTitle,
          currentWeekTitle: progress.currentWeekTitle,
          startDate: new Date(progress.startDate),
          daysCompleted: {
            totalDays: progress.totalCompleted,
            week1: progress.daysCompleted.week1,
            week2: progress.daysCompleted.week2,
            week3: progress.daysCompleted.week3,
            week4: progress.daysCompleted.week4,
            week5: progress.daysCompleted.week5,
          },
        });
      }
    } catch (err) {
      console.error("Error fetching user progress:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Method to update progress after completing a devotional
  const updateProgress = async (week, day) => {
    try {
      const response = await fetch("/api/user-progress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ week, day }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      const data = await response.json();

      if (data.success) {
        // Refresh progress data
        await fetchUserProgress();
        return data.nextDevotional;
      }
    } catch (err) {
      console.error("Error updating progress:", err);
      throw err;
    }
  };

  // Method to refresh progress data
  const refreshProgress = () => {
    return fetchUserProgress();
  };

  const value = {
    userInfo,
    setUserInfo,
    userProgress,
    setUserProgress,
    weekStaticInfo,
    loading: loading && isHydrated, // Only show loading after hydration
    error,
    updateProgress,
    refreshProgress,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within the DashboardProvider",
    );
  }
  return context;
}
