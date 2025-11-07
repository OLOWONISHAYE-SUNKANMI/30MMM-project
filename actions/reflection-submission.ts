// app/actions/reflections.js
"use server";

import { PrismaClient } from "@/generated/client/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

/**
 * Server Action to submit a reflection and update user progress
 *
 * This function handles all the database logic for:
 *
 * - establishing current User Progress
 * - Saving the reflection entry as text
 * - Incrementing the user's current day
 * - Updating the week as necessary
 * - Managing the transition between weeks
 * - Returning the updated progress and reflection data
 *
 * @param {string} userId - The ID of the user submitting the reflection
 * @param {string} devotionalDataId - The Object ID of the devotional data
 * @param {number} devotionalNumberId - The numeric ID of the devotional
 * @param {string} reflectionText - The text of the user's reflection
 * @param {number} week - The current week number
 * @param {number} day - The current day number
 * @returns {Object} Result object containing success status and data or error message
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
  console.log("submitTextReflection called with:", {
    userId,
    devotionalDataId,
    devotionalNumberId,
    reflectionText,
    week,
    day,
  });

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
    // Execute both queries as a transaction
    const currentProgress = await prisma.userProgress.findUnique({
      where: { userId: userId },
    });

    if (!currentProgress) {
      return {
        success: false,
        error: "User progress not found.",
      };
    }

    if (currentProgress.completedDevotionalIds?.includes(devotionalNumberId)) {
      return {
        success: false,
        error:
          "You've already completed ths devotional; proceed to the next one.",
      };
    }
    const [textResponse, updatedUser] = await prisma.$transaction([
      /**
       * Review Current User Progress
       * Find current week and day to determine if we need to increment week
       */

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
          currentDay:
            currentProgress.currentDay === 35
              ? { increment: 0 } // if finished, stay at 35
              : { increment: 1 },
          currentWeek:
            currentProgress.currentDay === 35
              ? { increment: 0 } // if finished, stay at current week
              : currentProgress.currentDay % 7 === 0 // if there's an end of the week
                ? { increment: 1 }
                : currentProgress.currentWeek,
          completedDevotionalIds: { push: devotionalNumberId },
        },
      }),
    ]);

    /**
     * Return Block
     */
    return {
      success: true,
      data: {
        reflection: textResponse,
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
