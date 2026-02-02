import { render, screen } from '@testing-library/react';
import CleanForChurches from '@/app/churches/page';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Churches Page', () => {
  test('renders churches page', () => {
    render(<CleanForChurches />);
    expect(screen.getByText('CLEAN Packages for Churches: Find the Right Fit for Your Ministry')).toBeInTheDocument();
  });

  test('displays why CLEAN section', () => {
    render(<CleanForChurches />);
    expect(screen.getByText('Why CLEAN for Churches?')).toBeInTheDocument();
  });

  test('displays packages section', () => {
    render(<CleanForChurches />);
    expect(screen.getByText('Explore CLEAN Packages for Churches')).toBeInTheDocument();
  });
});