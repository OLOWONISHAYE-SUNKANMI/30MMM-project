import { PrismaClient, UserProgress } from "@/generated/client";

const prisma = new PrismaClient();

// Type for the formatted response
export interface FormattedUserProgress {
  currentWeek: number;
  currentDay: number;
  currentDayTitle: string;
  currentWeekTitle: string;
  currentDaySubTitle: string | null;
  cohortNumber: number;
  cohortRoman: string;
  startDate: Date;
  lastAccessedAt: Date;
  daysCompleted: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
    week5: number;
  };
  completedDevotionalIds: number[];
  totalCompleted: number;
  totalDevotionals: number;
  overallProgress: number;
}

/**
 * Convert number to Roman numerals (for cohort display)
 */
export function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

/**
 * Get devotional details from MongoDB database
 */
export async function getDevotionalDetails(week: number, day: number) {
  try {
    const devotional = await prisma.devotional.findFirst({
      where: {
        week: week,
        day: day,
      },
      select: {
        id: true,
        week: true,
        day: true,
        weekTitle: true,
        dayTitle: true,
        daySubTitle: true,
      },
    });

    if (!devotional) {
      return {
        id: null,
        week: week,
        day: day,
        dayTitle: "Unknown",
        weekTitle: "Unknown",
        daySubTitle: null,
      };
    }

    return {
      id: devotional.id,
      week: devotional.week,
      day: devotional.day,
      dayTitle: devotional.dayTitle,
      weekTitle: devotional.weekTitle,
      daySubTitle: devotional.daySubTitle,
    };
  } catch (error) {
    console.error("Error fetching devotional details:", error);
    return {
      id: null,
      week: week,
      day: day,
      dayTitle: "Unknown",
      weekTitle: "Unknown",
      daySubTitle: null,
    };
  }
}

/**
 * Get devotional by ID (1-35)
 */
export async function getDevotionalById(devotionalId: number) {
  // Calculate week and day from devotional ID (1-35)
  const week = Math.ceil(devotionalId / 7);
  const day = devotionalId - (week - 1) * 7;

  return await getDevotionalDetails(week, day);
}

/**
 * Calculate which week a devotional ID belongs to
 */
export function getWeekFromDevotionalId(devotionalId: number): number {
  return Math.ceil(devotionalId / 7);
}

/**
 * Calculate devotional ID from week and day (returns 1-35)
 */
export function getDevotionalId(week: number, day: number): number {
  return (week - 1) * 7 + day;
}

/**
 * Calculate next week and day after completing a devotional
 */
export function calculateNextPosition(currentWeek: number, currentDay: number) {
  // If completed day 7 of a week, move to next week
  if (currentDay === 7) {
    // Don't advance past week 5
    if (currentWeek < 5) {
      return { week: currentWeek + 1, day: 1 };
    }
    // Completed all 5 weeks
    return { week: 5, day: 7 };
  }

  // Otherwise, advance to next day
  return { week: currentWeek, day: currentDay + 1 };
}

/**
 * Format user progress data for frontend consumption
 */
export async function formatUserProgressResponse(
  userProgress: UserProgress,
): Promise<FormattedUserProgress> {
  const devotionalDetails = await getDevotionalDetails(
    userProgress.currentWeek,
    userProgress.currentDay,
  );

  const totalCompleted = userProgress.completedDevotionalIds.length;
  const overallProgress = Math.round((totalCompleted / 35) * 100);

  return {
    // For MainBody component
    currentWeek: userProgress.currentWeek,
    currentDay: userProgress.currentDay,
    currentDayTitle: devotionalDetails.dayTitle,
    currentWeekTitle: devotionalDetails.weekTitle,
    currentDaySubTitle: devotionalDetails.daySubTitle,
    cohortNumber: userProgress.cohortNumber,
    cohortRoman: userProgress.cohortRoman,
    startDate: userProgress.startDate,
    lastAccessedAt: userProgress.lastAccessedAt,

    // For WeekCards component (matches existing structure)
    daysCompleted: {
      week1: userProgress.week1Completed,
      week2: userProgress.week2Completed,
      week3: userProgress.week3Completed,
      week4: userProgress.week4Completed,
      week5: userProgress.week5Completed,
    },

    // Additional metadata
    completedDevotionalIds: userProgress.completedDevotionalIds,
    totalCompleted,
    totalDevotionals: 35,
    overallProgress,
  };
}

/**
 * Create initial user progress object
 */
export function createInitialProgress(
  userId: string,
  cohortNumber: number = 1,
) {
  return {
    userId,
    cohortNumber,
    cohortRoman: toRoman(cohortNumber),
    currentWeek: 1,
    currentDay: 1,
    week1Completed: 0,
    week2Completed: 0,
    week3Completed: 0,
    week4Completed: 0,
    week5Completed: 0,
    completedDevotionalIds: [],
  };
}

/**
 * Validate if a devotional exists in the database
 */
export async function validateDevotionalExists(
  week: number,
  day: number,
): Promise<boolean> {
  try {
    const devotional = await prisma.devotional.findFirst({
      where: {
        week: week,
        day: day,
      },
    });
    return devotional !== null;
  } catch (error) {
    console.error("Error validating devotional:", error);
    return false;
  }
}

/**
 * Get all devotionals for a specific week
 */
export async function getDevotionalsForWeek(week: number) {
  try {
    const devotionals = await prisma.devotional.findMany({
      where: {
        week: week,
      },
      orderBy: {
        day: "asc",
      },
      select: {
        id: true,
        week: true,
        day: true,
        weekTitle: true,
        dayTitle: true,
        daySubTitle: true,
      },
    });
    return devotionals;
  } catch (error) {
    console.error("Error fetching devotionals for week:", error);
    return [];
  }
}

/**
 * Calculate how many days have passed since the program start
 */
export function getDaysSinceStart(startDate: Date): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate maximum accessible week and day based on start date
 * Users unlock 1 devotional per day from their start date
 */
export function getMaxAccessiblePosition(startDate: Date): {
  week: number;
  day: number;
} {
  const daysSinceStart = getDaysSinceStart(startDate);

  // Users can access devotionals based on days elapsed (0-indexed becomes 1-indexed)
  const accessibleDays = daysSinceStart + 1; // Day 0 = access devotional 1

  // Cap at 35 devotionals (5 weeks × 7 days)
  const cappedDays = Math.min(accessibleDays, 35);

  // Calculate week and day from accessible days
  const week = Math.ceil(cappedDays / 7);
  const day = cappedDays - (week - 1) * 7;

  return { week, day };
}

/**
 * Check if a specific devotional is accessible based on start date
 * Returns true if the user has "unlocked" this devotional by time
 */
export function isDevotionalAccessible(
  startDate: Date,
  requestedWeek: number,
  requestedDay: number,
): boolean {
  const maxAccessible = getMaxAccessiblePosition(startDate);

  // Calculate devotional IDs for comparison (1-35)
  const requestedId = getDevotionalId(requestedWeek, requestedDay);
  const maxAccessibleId = getDevotionalId(
    maxAccessible.week,
    maxAccessible.day,
  );

  return requestedId <= maxAccessibleId;
}
