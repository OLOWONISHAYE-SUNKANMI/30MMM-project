import { render, screen } from '@testing-library/react';
import ScholarshipPage from '@/app/scholarship/page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Scholarship Page', () => {
  test('renders scholarship page', () => {
    render(<ScholarshipPage />);
    expect(screen.getByText('CLEAN for All Scholarship Program')).toBeInTheDocument();
  });

  test('displays mission section', () => {
    render(<ScholarshipPage />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  test('displays benefits section', () => {
    render(<ScholarshipPage />);
    expect(screen.getByText('Benefits of Our Scholarship Program')).toBeInTheDocument();
  });
});