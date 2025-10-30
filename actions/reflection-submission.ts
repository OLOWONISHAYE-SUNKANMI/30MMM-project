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
  devotionalId,
  reflectionText,
  week,
  day,
) {
  // Input validation on the server side is critical for security
  // Never trust that client-side validation is enough
  if (!userId || !devotionalId || !reflectionText?.trim()) {
    return {
      success: false,
      error:
        "Missing required fields. Please provide all necessary information.",
    };
  }

  console.log(devotionalId);

  /**
   * Save the Reflection Entry As Text
   */
  const record = await prisma.reflectionResponse.create({
    data: {
      // add other fields
      userId: userId,
      devotionalId: devotionalId,
      response: reflectionText.trim(),
      week: week,
      day: day,
      user: {
        connect: { id: userId },
      },
    },
  });

  /**
   * Fetch the user's current progress
   */

  try {
    const record = await prisma.userProgress.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!record) {
      return {
        success: false,
        error: "User progress record not found.",
      };
    }
    console.log("submitReflection - userProgress:", record);

    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error("Error in submitReflection:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
