import { render, screen } from '@testing-library/react';
import CleanForIndividuals from '@/app/individuals/page';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Individuals Page', () => {
  test('renders individuals page', () => {
    render(<CleanForIndividuals />);
    expect(screen.getByText('Discover Freedom, Purpose, and Integrity with CLEAN')).toBeInTheDocument();
  });

  test('displays two faces section', () => {
    render(<CleanForIndividuals />);
    expect(screen.getByText('The Two Faces of CLEAN: Your Path to Transformation')).toBeInTheDocument();
  });

  test('displays pricing plans', () => {
    render(<CleanForIndividuals />);
    expect(screen.getByText('CLEAN Starter')).toBeInTheDocument();
    expect(screen.getByText('CLEAN Essentials')).toBeInTheDocument();
  });
});