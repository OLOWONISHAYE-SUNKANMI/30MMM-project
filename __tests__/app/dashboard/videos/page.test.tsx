import { render, screen } from '@testing-library/react';
import VideosPage from '@/app/dashboard/videos/page';

// Mock video components
jest.mock('@/components/Dashboard/videos/video-player', () => {
  return function MockVideoPlayer() {
    return <div>Video Player</div>;
  };
});

describe('Dashboard Videos Page', () => {
  test('renders videos page', () => {
    render(<VideosPage />);
    expect(screen.getByText('Video Player')).toBeInTheDocument();
  });
});