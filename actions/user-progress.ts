"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";

export async function getUserProgress() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!userProgress) {
      // Create initial progress if it doesn't exist
      const initialProgress = await prisma.userProgress.create({
        data: {
          userId: session.user.id,
          cohortNumber: 46, // You might want to determine this dynamically
          cohortRoman: "XLVI",
          currentWeek: 1,
          currentDay: 1,
        },
      });

      return {
        success: true,
        progress: initialProgress,
      };
    }

    return {
      success: true,
      progress: userProgress,
    };
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
