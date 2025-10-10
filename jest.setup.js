// Add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

// Mock environment variables
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/test";
process.env.BETTER_AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET || "test-secret";
process.env.BETTER_AUTH_URL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";
