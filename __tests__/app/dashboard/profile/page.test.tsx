import { render, waitFor } from '@testing-library/react';
import ProfilePage from '@/app/dashboard/profile/page';
import { act } from 'react';

// Mock the entire AuthContext module
jest.mock('@/contexts/AuthContext', () => ({
  __esModule: true,
  useAuth: jest.fn(() => ({
    authState: {
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      loading: false,
      isAuthenticated: true,
      signingOut: false
    }
  })),
  AuthProvider: ({ children }) => children,
}));

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ profile: null }),
  })
);

describe('Dashboard Profile Page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders profile page without crashing', async () => {
    await act(async () => {
      const { container } = render(<ProfilePage />);
      expect(container).toBeInTheDocument();
    });
  });
});