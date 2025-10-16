"use server";

import prisma from "@/db";

export async function getDevotionalById(id: string) {
  try {
    // Parse the id to extract week and day (assuming format like "1-1" for week 1, day 1)
    const [week, day] = id.split("-").map(Number);

    // Use Prisma's findUnique with the unique constraint from your schema
    const devotional = await prisma.devotional.findUnique({
      where: {
        week_day: {
          week: week,
          day: day,
        },
      },
    });

    if (!devotional) {
      return {
        success: false,
        error: "Devotional not found",
      };
    }

    return {
      success: true,
      devotional: JSON.parse(JSON.stringify(devotional)),
    };
  } catch (error) {
    console.error("Error fetching devotional:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getAllDevotionals() {
  try {
    // Use Prisma's findMany with orderBy for sorting
    const devotionals = await prisma.devotional.findMany({
      orderBy: [{ week: "asc" }, { day: "asc" }],
    });

    return {
      success: true,
      devotionals: JSON.parse(JSON.stringify(devotionals)),
    };
  } catch (error) {
    console.error("Error fetching all devotionals:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Additional helper function to get devotionals by week
export async function getDevotionalsByWeek(week: number) {
  try {
    const devotionals = await prisma.devotional.findMany({
      where: {
        week: week,
      },
      orderBy: {
        day: "asc",
      },
    });

    return {
      success: true,
      devotionals: JSON.parse(JSON.stringify(devotionals)),
    };
  } catch (error) {
    console.error("Error fetching devotionals by week:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Helper function to get the current week's devotionals
export async function getCurrentWeekDevotionals(currentWeek: number) {
  try {
    const devotionals = await prisma.devotional.findMany({
      where: {
        week: currentWeek,
      },
      orderBy: {
        day: "asc",
      },
    });

    return {
      success: true,
      devotionals: JSON.parse(JSON.stringify(devotionals)),
    };
  } catch (error) {
    console.error("Error fetching current week devotionals:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
