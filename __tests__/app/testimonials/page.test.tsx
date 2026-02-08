import { render, screen } from '@testing-library/react';
import TestimonialsPage from '@/app/testimonials/page';

jest.mock('@/components/testimonials/video-carousel', () => {
  return function MockVideoCarousel() {
    return <div data-testid="video-carousel">Video Carousel</div>;
  };
});

describe('Testimonials Page', () => {
  test('renders testimonials page', () => {
    render(<TestimonialsPage />);
    expect(screen.getByText('Transformed Lives: Real Men, Real Stories, Real Freedom')).toBeInTheDocument();
  });

  test('displays video carousel', () => {
    render(<TestimonialsPage />);
    expect(screen.getByTestId('video-carousel')).toBeInTheDocument();
  });

  test('displays scripture quote', () => {
    render(<TestimonialsPage />);
    expect(screen.getByText(/Therefore, if anyone is in Christ/)).toBeInTheDocument();
  });
});