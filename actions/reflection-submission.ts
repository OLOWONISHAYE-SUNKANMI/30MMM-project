// app/actions/reflections.js
"use server";

import { PrismaClient } from "@/generated/client/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

/**
 * Server Action to submit a reflection and update user progress
 *
 * This function handles all the database logic for:
 * - Creating a new reflection entry
 * - Incrementing the user's current day
 * - Updating the appropriate week completion counter
 * - Managing the transition between weeks
 */
export async function submitTextReflection(
  userId,
  devotionalDataId,
  devotionalNumberId,
  reflectionText,
  week,
  day,
) {
  // Input validation on the server side is critical for security
  // Never trust that client-side validation is enough
  if (
    !userId ||
    !week ||
    !day ||
    !devotionalDataId ||
    !reflectionText?.trim()
  ) {
    return {
      success: false,
      error:
        "Missing required fields. Please provide all necessary information.",
    };
  }

  try {
    // Calculate next week and day
    const isLastDay = day === 7;
    const nextWeek = isLastDay ? week + 1 : week;
    const nextDay = isLastDay ? 1 : day + 1;

    console.log("calculated params: ", isLastDay, nextWeek, nextDay);

    // Execute both queries as a transaction
    const [record, updatedUser] = await prisma.$transaction([
      /**
       * Save the Reflection Entry As Text
       */
      prisma.reflectionResponse.create({
        data: {
          devotionalId: devotionalDataId,
          response: reflectionText.trim(),
          week: week,
          day: day,
          user: {
            connect: { id: userId },
          },
        },
      }),

      /**
       * Update User Progress
       * Update current week and day (if day 7, move to day 1 of next week)
       */
      prisma.userProgress.update({
        where: { userId: userId },
        data: {
          currentDay: isLastDay ? 1 : { increment: 1 },
          currentWeek: isLastDay ? { increment: 1 } : undefined,
        },
      }),
    ]);

    console.log(
      "Text Reflection Submitted and user progress updated:",
      `Week ${nextWeek}, Day ${nextDay}`,
    );

    /**
     * Return Block
     */
    return {
      success: true,
      data: {
        reflection: record,
        userProgress: {
          currentWeek: updatedUser.currentWeek,
          currentDay: updatedUser.currentDay,
          completedDevotionalIds: { push: devotionalNumberId },
        },
      },
    };
  } catch (error) {
    console.error("Transaction failed:", error);
    return {
      success: false,
      error: "Failed to save reflection and update progress. Please try again.",
    };
  }
}
