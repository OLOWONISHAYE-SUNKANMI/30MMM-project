import { render, screen } from '@testing-library/react';
import SettingsPage from '@/app/dashboard/settings/page';

describe('Dashboard Settings Page', () => {
  test('renders settings page', () => {
    render(<SettingsPage />);
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });
});