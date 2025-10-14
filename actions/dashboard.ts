"use server";

import { PrismaClient } from "@/generated/client";
import { getUser as getServerUser } from "@/lib/session";
import { formatUserProgressResponse } from "@/lib/user-progress-utility";

const prisma = new PrismaClient();

export async function getCurrentUserWithProgress() {
  try {
    const user = await getServerUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Check if user has progress, create if not
    let userProgress = user.userProgress;

    if (!userProgress) {
      console.log("Creating initial UserProgress for user:", user.id);
      userProgress = await prisma.userProgress.create({
        data: {
          userId: user.id,
          cohortNumber: 1,
          cohortRoman: "I",
          currentWeek: 1,
          currentDay: 1,
          week1Completed: 0,
          week2Completed: 0,
          week3Completed: 0,
          week4Completed: 0,
          week5Completed: 0,
        },
      });
    }

    // If user has progress, format it
    let formattedProgress = null;
    if (userProgress) {
      // Fetch the current devotional from MongoDB
      const currentDevotional = await prisma.devotional.findFirst({
        where: {
          week: userProgress.currentWeek,
          day: userProgress.currentDay,
        },
      });

      if (!currentDevotional) {
        console.warn(
          `Devotional not found for Week ${userProgress.currentWeek}, Day ${userProgress.currentDay}`,
        );
      }

      // AWAIT the formatUserProgressResponse since it's async
      formattedProgress = await formatUserProgressResponse(
        userProgress,
        currentDevotional,
      );
    }

    // Return plain serializable data
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        profileCompleted: user.profileCompleted,
      },
      progress: formattedProgress
        ? {
            currentWeek: formattedProgress.currentWeek,
            currentDay: formattedProgress.currentDay,
            currentWeekTitle: formattedProgress.currentWeekTitle,
            currentDayTitle: formattedProgress.currentDayTitle,
            cohortNumber: formattedProgress.cohortNumber,
            cohortRoman: formattedProgress.cohortRoman,
            startDate: formattedProgress.startDate.toISOString(),
            daysCompleted: formattedProgress.daysCompleted,
            totalCompleted: formattedProgress.totalCompleted,
            devotional: formattedProgress.devotional,
            currentDevotionalId:
              formattedProgress.devotional?._id?.toString() || null, // Add optional chaining
          }
        : null,
    };
  } catch (error) {
    console.error("Error in getCurrentUserWithProgress action:", error);
    return { success: false, error: "Failed to fetch user data" };
  }
}

export async function updateUserProgress(devotionalId: number) {
  try {
    const user = await getServerUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Get current progress
    const progress = await prisma.userProgress.findUnique({
      where: { userId: user.id },
    });

    if (!progress) {
      return { success: false, error: "User progress not found" };
    }

    // Validate sequential access
    const devotional = await prisma.devotional.findFirst({
      where: { id: devotionalId },
    });

    if (!devotional) {
      return { success: false, error: "Devotional not found" };
    }

    // Check if user is on correct day
    if (
      devotional.week !== progress.currentWeek ||
      devotional.day !== progress.currentDay
    ) {
      return { success: false, error: "Cannot skip ahead in program" };
    }

    // Calculate days since start for time-based access control
    const daysSinceStart = Math.floor(
      (Date.now() - progress.startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (
      daysSinceStart <
      (progress.currentWeek - 1) * 7 + progress.currentDay - 1
    ) {
      return { success: false, error: "Content not yet available" };
    }

    // Update completion count for current week
    const weekField =
      `week${progress.currentWeek}Completed` as keyof typeof progress;
    const currentWeekCompleted = (progress[weekField] as number) + 1;

    // Determine next position
    let nextWeek = progress.currentWeek;
    let nextDay = progress.currentDay + 1;

    if (nextDay > 7) {
      nextWeek++;
      nextDay = 1;
    }

    // Update progress
    const updated = await prisma.userProgress.update({
      where: { userId: user.id },
      data: {
        [weekField]: currentWeekCompleted,
        currentWeek: nextWeek > 5 ? progress.currentWeek : nextWeek,
        currentDay: nextWeek > 5 ? progress.currentDay : nextDay,
        updatedAt: new Date(),
      },
    });

    return { success: true, progress: updated };
  } catch (error) {
    console.error("Error updating user progress:", error);
    return { success: false, error: "Failed to update progress" };
  }
}
