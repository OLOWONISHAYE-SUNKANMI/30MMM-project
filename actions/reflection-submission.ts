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
export async function submitReflection(userId, devotionalId, reflectionText) {
  // Input validation on the server side is critical for security
  // Never trust that client-side validation is enough
  if (!userId || !devotionalId || !reflectionText?.trim()) {
    return {
      success: false,
      error:
        "Missing required fields. Please provide all necessary information.",
    };
  }

  try {
    // Using a transaction ensures that either all database operations succeed
    // or none of them do. This prevents partial updates that could leave your
    // data in an inconsistent state
    const result = await prisma.$transaction(async (tx) => {
      // Fetch the user's current progress for this specific devotional
      // The findUnique method uses a compound unique key of userId and devotionalId
      let userProgress = await tx.userProgress.findUnique({
        where: {
          userId_devotionalId: {
            userId: userId,
            devotionalId: devotionalId,
          },
        },
      });

      // If this is the user's first reflection for this devotional,
      // we need to create their progress record with initial values
      if (!userProgress) {
        userProgress = await tx.userProgress.create({
          data: {
            userId,
            devotionalId,
            currentDay: 1,
            week1Completed: 0,
            week2Completed: 0,
            week3Completed: 0,
            week4Completed: 0,
          },
        });
      }

      // Calculate which week the user is currently in
      // Days 1-7 map to week 1, days 8-14 map to week 2, and so on
      // Using Math.ceil ensures that day 1 gives us week 1, not week 0
      const currentWeek = Math.ceil(userProgress.currentDay / 7);

      // Dynamically construct the field name for the current week
      // This allows us to update the correct week column without a giant if/else chain
      const weekField = `week${currentWeek}Completed`;

      // Get how many days have been completed in the current week so far
      const currentWeekProgress = userProgress[weekField];

      // Calculate the new day number and week progress
      // The currentDay always increments by 1 to track absolute progress
      const newCurrentDay = userProgress.currentDay + 1;

      // The week progress increments by 1, but we need to handle the week boundary
      let newWeekProgress = currentWeekProgress + 1;

      // If the user just completed the 7th day of a week, we need to reset
      // the counter for the next week. The newCurrentDay will move to day 8, 15, 22, etc.
      // but the week counter needs to reset to 1 for the start of the new week
      if (newWeekProgress > 7) {
        newWeekProgress = 1;
      }

      // Create the reflection record with all the relevant information
      // This captures what the user wrote and when they wrote it
      const reflection = await tx.reflection.create({
        data: {
          userId,
          devotionalId,
          day: userProgress.currentDay, // Note: this is the day they just completed
          reflectionText: reflectionText.trim(),
          submittedAt: new Date(),
        },
      });

      // Update the user's progress with the new values
      // We use bracket notation for weekField since it's a dynamic property name
      const updatedProgress = await tx.userProgress.update({
        where: {
          userId_devotionalId: {
            userId,
            devotionalId,
          },
        },
        data: {
          currentDay: newCurrentDay,
          [weekField]: newWeekProgress,
          lastActivityAt: new Date(),
        },
      });

      // Return both objects so we can confirm the operation succeeded
      // and potentially use this data in the UI
      return { reflection, updatedProgress };
    });

    // If we got here, everything succeeded!
    // Optionally revalidate any paths that display this data
    // This ensures that if the user navigates to a page showing their progress,
    // they'll see the updated information
    revalidatePath("/devotionals");
    revalidatePath(`/devotionals/${devotionalId}`);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    // Log the error for debugging but don't expose detailed error messages to the client
    // This is important for security - you don't want to leak database structure or
    // other implementation details to potential attackers
    console.error("Error submitting reflection:", error);

    return {
      success: false,
      error:
        "We encountered an issue saving your reflection. Please try again.",
    };
  } finally {
    // Always disconnect from Prisma when done
    // In serverless environments, this helps prevent connection exhaustion
    await prisma.$disconnect();
  }
}
