// Add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

// Mock TextEncoder/TextDecoder for Node.js environment
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock environment variables
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/test";
process.env.BETTER_AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET || "test-secret";
process.env.BETTER_AUTH_URL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

// Mock useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
  AuthProvider: ({ children }) => children,
}));

// Mock auth functions
jest.mock('@/actions/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock Web APIs for Node.js environment
global.Request = undefined;
global.Response = undefined;

// Mock auth functions
jest.mock('@/actions/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
  AuthProvider: ({ children }) => children,
}));
