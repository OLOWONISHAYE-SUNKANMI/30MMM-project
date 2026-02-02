import { render, screen } from '@testing-library/react';
import FounderBio from '@/app/founders-bio/page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('FounderBio Page', () => {
  test('renders founder bio page', () => {
    render(<FounderBio />);
    expect(screen.getByText('Dr. Donovan Anderson')).toBeInTheDocument();
  });

  test('displays academic excellence section', () => {
    render(<FounderBio />);
    expect(screen.getByText('Academic Excellence')).toBeInTheDocument();
  });

  test('displays leadership section', () => {
    render(<FounderBio />);
    expect(screen.getByText('Leadership at Zion Church')).toBeInTheDocument();
  });
});