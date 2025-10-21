"use server";

import prisma from "@/db";

export async function getUserProgress(userId: string) {
  // Validate userId parameter
  if (!userId || typeof userId !== "string") {
    return {
      success: false,
      error: "Invalid user ID provided",
    };
  }

  try {
    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        cohortNumber: true,
        cohortRoman: true,
        currentWeek: true,
        currentDay: true,
        startDate: true,
        lastAccessedAt: true,
        week1Completed: true,
        week2Completed: true,
        week3Completed: true,
        week4Completed: true,
        week5Completed: true,
        completedDevotionalIds: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userProgress) {
      return {
        success: false,
        error: "User progress not found",
      };
    }

    return {
      success: true,
      userProgress: userProgress,
    };
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateUserProgress(
  userId: string,
  updates: {
    currentWeek?: number;
    currentDay?: number;
    week1Completed?: number;
    week2Completed?: number;
    week3Completed?: number;
    week4Completed?: number;
    week5Completed?: number;
    completedDevotionalIds?: number[];
  },
) {
  try {
    const userProgress = await prisma.userProgress.update({
      where: {
        userId: userId,
      },
      data: {
        ...updates,
        lastAccessedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      userProgress: userProgress,
    };
  } catch (error) {
    console.error("Error updating user progress:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
