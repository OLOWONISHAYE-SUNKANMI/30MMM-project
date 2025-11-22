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

export async function completeDevotional(
  userId: string,
  devotionalId: string,
  week: number,
  day: number,
  reflectionResponse?: string,
) {
  try {
    // Calculate devotional number (1-35) from week and day
    const devotionalNumber = (week - 1) * 7 + day;

    // Save reflection response if provided
    if (reflectionResponse?.trim()) {
      await prisma.reflectionResponse.upsert({
        where: {
          userId_devotionalId: {
            userId: userId,
            devotionalId: devotionalId,
          },
        },
        update: {
          response: reflectionResponse,
          week: week,
          day: day,
        },
        create: {
          userId: userId,
          devotionalId: devotionalId,
          week: week,
          day: day,
          response: reflectionResponse,
        },
      });
    }

    // Get current progress to update
    const currentProgress = await prisma.userProgress.findUnique({
      where: { userId: userId },
    });

    if (!currentProgress) {
      throw new Error("User progress not found");
    }

    // Add devotional to completed list if not already there
    const completedIds = [...currentProgress.completedDevotionalIds];
    if (!completedIds.includes(devotionalNumber)) {
      completedIds.push(devotionalNumber);
    }

    // Update week completion count
    const weekCompletedKey =
      `week${week}Completed` as keyof typeof currentProgress;
    const weekCompleted = Math.min(
      (currentProgress[weekCompletedKey] as number) + 1,
      7,
    );

    // Calculate next lesson
    let nextWeek = week;
    let nextDay = day + 1;
    if (nextDay > 7) {
      nextWeek = week + 1;
      nextDay = 1;
    }
    if (nextWeek > 5) {
      nextWeek = 5;
      nextDay = 7;
    }

    // Update progress
    const updatedProgress = await prisma.userProgress.update({
      where: { userId: userId },
      data: {
        completedDevotionalIds: completedIds,
        [weekCompletedKey]: weekCompleted,
        currentWeek: nextWeek,
        currentDay: nextDay,
        lastAccessedAt: new Date(),
      },
    });

    return {
      success: true,
      userProgress: updatedProgress,
    };
  } catch (error) {
    console.error("Error completing devotional:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function saveReflectionResponse(
  userId: string,
  devotionalId: string,
  week: number,
  day: number,
  response: string,
) {
  try {
    const reflectionResponse = await prisma.reflectionResponse.upsert({
      where: {
        userId_devotionalId: {
          userId: userId,
          devotionalId: devotionalId,
        },
      },
      update: {
        response: response,
        week: week,
        day: day,
      },
      create: {
        userId: userId,
        devotionalId: devotionalId,
        week: week,
        day: day,
        response: response,
      },
    });

    return {
      success: true,
      reflectionResponse: reflectionResponse,
    };
  } catch (error) {
    console.error("Error saving reflection response:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
