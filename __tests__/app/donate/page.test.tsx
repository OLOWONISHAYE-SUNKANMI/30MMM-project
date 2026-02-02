import { render, screen } from '@testing-library/react';
import DonationPage from '@/app/donate/page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <script {...props}>{children}</script>,
}));

describe('Donate Page', () => {
  test('renders donate page', () => {
    render(<DonationPage />);
    expect(screen.getByText('Support Our Cause')).toBeInTheDocument();
  });

  test('displays donation card', () => {
    render(<DonationPage />);
    expect(screen.getByText('Make a Donation')).toBeInTheDocument();
  });

  test('displays security features', () => {
    render(<DonationPage />);
    expect(screen.getByText('Secure')).toBeInTheDocument();
    expect(screen.getByText('Tax Deductible')).toBeInTheDocument();
    expect(screen.getByText('Impact')).toBeInTheDocument();
  });
});