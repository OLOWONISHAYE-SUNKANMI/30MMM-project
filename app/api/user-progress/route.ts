import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  calculateNextPosition,
  createInitialProgress,
  formatUserProgressResponse,
  getDevotionalId,
  validateDevotionalExists,
} from "@/lib/user-progress-utility";

// GET - Fetch user progress (create if doesn't exist)
export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;

    // Try to find existing progress
    let userProgress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    // Create default progress if none exists (for existing test users)
    if (!userProgress) {
      const initialProgress = createInitialProgress(userId, 1); // Default cohort 1
      userProgress = await prisma.userProgress.create({
        data: initialProgress,
      });
    }

    // Format for frontend consumption
    const formattedProgress = await formatUserProgressResponse(
      userProgress,
      null,
    );

    return NextResponse.json({
      success: true,
      progress: formattedProgress,
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch user progress" },
      { status: 500 },
    );
  }
}

// PATCH - Update progress (mark devotional complete)
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const { week, day } = await request.json();

    // Validate devotional exists
    const isValid = await validateDevotionalExists(week, day);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid devotional position" },
        { status: 400 },
      );
    }

    // Get current progress
    const currentProgress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    if (!currentProgress) {
      return NextResponse.json(
        { error: "User progress not found" },
        { status: 404 },
      );
    }

    // CRITICAL: Verify user can only complete current devotional (no skipping ahead)
    if (
      week !== currentProgress.currentWeek ||
      day !== currentProgress.currentDay
    ) {
      return NextResponse.json(
        {
          error: "Can only complete current devotional",
          currentPosition: {
            week: currentProgress.currentWeek,
            day: currentProgress.currentDay,
          },
        },
        { status: 403 },
      );
    }

    // Calculate devotional ID and next position
    const devotionalId = getDevotionalId(week, day);
    const nextPosition = calculateNextPosition(week, day);
    const nextWeek = nextPosition.week;
    const nextDay = nextPosition.day;

    // Determine which week counter to increment
    const weekField = `week${week}Completed` as
      | "week1Completed"
      | "week2Completed"
      | "week3Completed"
      | "week4Completed"
      | "week5Completed";
    const currentWeekCount = currentProgress[weekField];

    // Build update data with proper typing
    const updateData: {
      currentWeek: number;
      currentDay: number;
      lastAccessedAt: Date;
      completedDevotionalIds?: { push: number };
      week1Completed?: number;
      week2Completed?: number;
      week3Completed?: number;
      week4Completed?: number;
      week5Completed?: number;
    } = {
      // Update current position
      currentWeek: nextWeek,
      currentDay: nextDay,
      lastAccessedAt: new Date(),
    };

    // Increment the appropriate week counter
    updateData[weekField] = Math.min(currentWeekCount + 1, 7); // Cap at 7

    // Add to completed IDs if not already there
    if (!currentProgress.completedDevotionalIds.includes(devotionalId)) {
      updateData.completedDevotionalIds = {
        push: devotionalId,
      };
    }

    // Update progress
    const updatedProgress = await prisma.userProgress.update({
      where: { userId },
      data: updateData,
    });

    // Format response
    const formattedProgress = await formatUserProgressResponse(
      updatedProgress,
      null,
    );

    return NextResponse.json({
      success: true,
      progress: formattedProgress,
      message: "Devotional marked complete",
      nextDevotional: {
        week: nextWeek,
        day: nextDay,
      },
    });
  } catch (error) {
    console.error("Error updating user progress:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 },
    );
  }
}

// POST - Create or reset progress
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { cohortNumber, reset } = body;

    if (reset) {
      // Reset existing progress
      const existingProgress = await prisma.userProgress.findUnique({
        where: { userId },
      });

      if (!existingProgress) {
        return NextResponse.json(
          { error: "No progress to reset" },
          { status: 404 },
        );
      }

      const resetProgress = await prisma.userProgress.update({
        where: { userId },
        data: {
          currentWeek: 1,
          currentDay: 1,
          week1Completed: 0,
          week2Completed: 0,
          week3Completed: 0,
          week4Completed: 0,
          week5Completed: 0,
          completedDevotionalIds: [],
          startDate: new Date(),
          lastAccessedAt: new Date(),
        },
      });

      const formattedProgress = await formatUserProgressResponse(
        resetProgress,
        null,
      );

      return NextResponse.json({
        success: true,
        progress: formattedProgress,
        message: "Progress reset successfully",
      });
    }

    // Create new progress with cohort
    const validCohort = cohortNumber || 1;
    const initialProgress = createInitialProgress(userId, validCohort);

    const newProgress = await prisma.userProgress.create({
      data: initialProgress,
    });

    const formattedProgress = await formatUserProgressResponse(
      newProgress,
      null,
    );

    return NextResponse.json(
      {
        success: true,
        progress: formattedProgress,
        message: "Progress created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user progress:", error);
    return NextResponse.json(
      { error: "Failed to create progress" },
      { status: 500 },
    );
  }
}
