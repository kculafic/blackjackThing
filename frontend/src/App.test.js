import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Blackjack title', () => {
    render(<App />);
    expect(screen.getByText(/♠ Blackjack ♥/i)).toBeInTheDocument();
  });

  test('renders betting form on initial load', () => {
    render(<App />);
    expect(screen.getByText('Setup New Game')).toBeInTheDocument();
  });

  test('renders start game button initially', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });

  test('does not render game controls initially', () => {
    render(<App />);
    expect(screen.queryByRole('button', { name: /hit/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /stand/i })).not.toBeInTheDocument();
  });
});
