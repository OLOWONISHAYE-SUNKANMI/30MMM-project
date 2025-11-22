import prisma from "@/db";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { GET, PATCH, POST } from "../route";

// Mock dependencies
jest.mock("@/db", () => ({
  __esModule: true,
  default: {
    userProgress: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/user-progress-utility", () => ({
  createInitialProgress: jest.fn((userId, cohort) => ({
    userId,
    cohortNumber: cohort,
    cohortRoman: "I",
    currentWeek: 1,
    currentDay: 1,
    startDate: new Date(),
    lastAccessedAt: new Date(),
    week1Completed: 0,
    week2Completed: 0,
    week3Completed: 0,
    week4Completed: 0,
    week5Completed: 0,
    completedDevotionalIds: [],
  })),
  formatUserProgressResponse: jest.fn((progress) => ({
    cohortNumber: progress.cohortNumber,
    cohortRoman: progress.cohortRoman,
    currentWeek: progress.currentWeek,
    currentDay: progress.currentDay,
    startDate: progress.startDate.toISOString(),
    weekProgress: {
      week1: { completed: progress.week1Completed, total: 7 },
      week2: { completed: progress.week2Completed, total: 7 },
      week3: { completed: progress.week3Completed, total: 7 },
      week4: { completed: progress.week4Completed, total: 7 },
      week5: { completed: progress.week5Completed, total: 7 },
    },
    totalCompleted: progress.completedDevotionalIds.length,
    totalDevotionals: 35,
  })),
  validateDevotionalExists: jest.fn(() => true),
  getDevotionalId: jest.fn((week, day) => (week - 1) * 7 + day),
  calculateNextPosition: jest.fn((week, day) => {
    if (day < 7) return { week, day: day + 1 };
    if (week < 5) return { week: week + 1, day: 1 };
    return { week: 5, day: 7 }; // Program complete
  }),
}));

describe("User Progress API Routes", () => {
  const mockUserId = "test-user-123";
  const mockSession = {
    user: {
      id: mockUserId,
      email: "test@example.com",
      name: "Test User",
    },
  };

  const mockUserProgress = {
    id: "progress-123",
    userId: mockUserId,
    cohortNumber: 1,
    cohortRoman: "I",
    currentWeek: 1,
    currentDay: 1,
    startDate: new Date("2025-01-01"),
    lastAccessedAt: new Date("2025-01-01"),
    week1Completed: 0,
    week2Completed: 0,
    week3Completed: 0,
    week4Completed: 0,
    week5Completed: 0,
    completedDevotionalIds: [],
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/user-progress", () => {
    it("should return 401 if user is not authenticated", async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe("Not authenticated");
    });

    it("should return existing user progress", async () => {
      (auth as jest.Mock).mockResolvedValue(mockSession);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue(
        mockUserProgress,
      );

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.progress).toBeDefined();
      expect(data.progress.currentWeek).toBe(1);
      expect(data.progress.currentDay).toBe(1);
    });

    it("should create default progress if none exists", async () => {
      (auth as jest.Mock).mockResolvedValue(mockSession);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.userProgress.create as jest.Mock).mockResolvedValue(
        mockUserProgress,
      );

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(prisma.userProgress.create).toHaveBeenCalled();
    });
  });

  describe("PATCH /api/user-progress", () => {
    it("should return 401 if user is not authenticated", async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
        {
          method: "PATCH",
          body: JSON.stringify({ week: 1, day: 1 }),
        },
      );
      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe("Not authenticated");
    });

    it("should mark devotional as complete and advance position", async () => {
      (auth as jest.Mock).mockResolvedValue(mockSession);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue(
        mockUserProgress,
      );

      const updatedProgress = {
        ...mockUserProgress,
        currentDay: 2,
        week1Completed: 1,
        completedDevotionalIds: [1],
      };
      (prisma.userProgress.update as jest.Mock).mockResolvedValue(
        updatedProgress,
      );

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
        {
          method: "PATCH",
          body: JSON.stringify({ week: 1, day: 1 }),
        },
      );
      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Devotional marked complete");
      expect(data.nextDevotional).toEqual({ week: 1, day: 2 });
    });

    it("should return 403 if user tries to skip ahead", async () => {
      (auth as jest.Mock).mockResolvedValue(mockSession);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue(
        mockUserProgress,
      );

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
        {
          method: "PATCH",
          body: JSON.stringify({ week: 2, day: 1 }), // Trying to skip to week 2
        },
      );
      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toBe("Can only complete current devotional");
      expect(data.currentPosition).toEqual({ week: 1, day: 1 });
    });

    it("should return 404 if progress not found", async () => {
      (auth as jest.Mock).mockResolvedValue(mockSession);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
        {
          method: "PATCH",
          body: JSON.stringify({ week: 1, day: 1 }),
        },
      );
      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe("User progress not found");
    });
  });

  describe("POST /api/user-progress", () => {
    it("should return 401 if user is not authenticated", async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
        {
          method: "POST",
          body: JSON.stringify({ reset: true }),
        },
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe("Not authenticated");
    });

    it("should reset existing progress", async () => {
      (auth as jest.Mock).mockResolvedValue(mockSession);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue(
        mockUserProgress,
      );
      (prisma.userProgress.update as jest.Mock).mockResolvedValue(
        mockUserProgress,
      );

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
        {
          method: "POST",
          body: JSON.stringify({ reset: true }),
        },
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Progress reset successfully");
      expect(prisma.userProgress.update).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        data: expect.objectContaining({
          currentWeek: 1,
          currentDay: 1,
          week1Completed: 0,
        }),
      });
    });

    it("should create new progress with cohort", async () => {
      (auth as jest.Mock).mockResolvedValue(mockSession);
      (prisma.userProgress.create as jest.Mock).mockResolvedValue(
        mockUserProgress,
      );

      const request = new NextRequest(
        "http://localhost:3000/api/user-progress",
        {
          method: "POST",
          body: JSON.stringify({ cohortNumber: 5 }),
        },
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Progress created successfully");
      expect(prisma.userProgress.create).toHaveBeenCalled();
    });
  });
});
