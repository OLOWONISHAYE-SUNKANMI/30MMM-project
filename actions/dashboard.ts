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

    // If user has progress, format it
    let formattedProgress = null;
    if (user.userProgress) {
      // Fetch the current devotional from MongoDB
      const currentDevotional = await prisma.devotional.findFirst({
        where: {
          week: user.userProgress.currentWeek,
          day: user.userProgress.currentDay,
        },
      });

      if (!currentDevotional) {
        console.warn(
          `Devotional not found for Week ${user.userProgress.currentWeek}, Day ${user.userProgress.currentDay}`,
        );
      }

      formattedProgress = formatUserProgressResponse(
        user.userProgress,
        currentDevotional,
      );
    }

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
      progress: formattedProgress,
    };
  } catch (error) {
    console.error("Error in getCurrentUserWithProgress action:", error);
    return { success: false, error: "Failed to fetch user data" };
  }
}
