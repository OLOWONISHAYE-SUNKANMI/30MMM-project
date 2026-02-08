import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

describe('Card Components', () => {
  test('renders Card component', () => {
    render(<Card data-testid="card">Test Card</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  test('renders CardHeader component', () => {
    render(<CardHeader data-testid="card-header">Header</CardHeader>);
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
  });

  test('renders CardTitle component', () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>);
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
  });

  test('renders CardDescription component', () => {
    render(<CardDescription data-testid="card-description">Description</CardDescription>);
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
  });

  test('renders CardContent component', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  test('renders CardFooter component', () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
  });
});