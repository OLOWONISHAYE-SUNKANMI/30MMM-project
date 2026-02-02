import { render } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';

// Mock the entire AuthContext module
jest.mock('@/contexts/AuthContext', () => ({
  __esModule: true,
  useAuth: jest.fn(() => ({
    authState: {
      user: { id: '1', name: 'Test User' },
      loading: false,
      isAuthenticated: true,
      signingOut: false
    }
  })),
  AuthProvider: ({ children }) => children,
}));

// Mock PaymentVerification component
jest.mock('@/components/Dashboard/payment-verification', () => {
  return function PaymentVerification({ children }) {
    return <div data-testid="payment-verification">{children}</div>;
  };
});

// Mock MainBody component
jest.mock('@/components/Dashboard/MainBody', () => {
  return function MainBody() {
    return <div data-testid="main-body">Dashboard Content</div>;
  };
});

describe('Dashboard Page', () => {
  test('renders dashboard page without crashing', () => {
    const { container } = render(<DashboardPage />);
    expect(container).toBeInTheDocument();
  });
});