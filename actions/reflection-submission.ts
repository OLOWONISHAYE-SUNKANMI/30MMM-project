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

  /**
   * Save the Reflection Entry As Text
   */
  const record = await prisma.reflectionResponse.create({
    data: {
      // add other fields
      devotionalId: devotionalDataId,
      response: reflectionText.trim(),
      week: week,
      day: day,
      user: {
        connect: { id: userId },
      },
    },
  });

  if (!record) {
    return {
      success: false,
      error: "Failed to save reflection. Please try again.",
    };
  }
  console.log("Text Reflection Submitted, moving to update user progress...");

  /**
   * Update weeek Progress by (if day 7, move to day 1 of next week)
   */

  /**
   * Update Curent Day to next day (if day 7, move to day 1 of next week)
   */

  /**
   * Return Block
   */
  return {
    success: true,
    data: record,
  };
}
