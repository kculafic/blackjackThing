import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  test('renders card with correct rank', () => {
    render(<Card suit="hearts" rank="A" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('renders heart symbol for hearts suit', () => {
    render(<Card suit="hearts" rank="K" />);
    expect(screen.getByText('♥')).toBeInTheDocument();
  });

  test('renders diamond symbol for diamonds suit', () => {
    render(<Card suit="diamonds" rank="Q" />);
    expect(screen.getByText('♦')).toBeInTheDocument();
  });

  test('renders club symbol for clubs suit', () => {
    render(<Card suit="clubs" rank="J" />);
    expect(screen.getByText('♣')).toBeInTheDocument();
  });

  test('renders spade symbol for spades suit', () => {
    render(<Card suit="spades" rank="10" />);
    expect(screen.getByText('♠')).toBeInTheDocument();
  });

  test('applies red text color for hearts', () => {
    const { container } = render(<Card suit="hearts" rank="A" />);
    const cardElement = container.querySelector('.playing-card');
    expect(cardElement).toHaveClass('text-danger');
  });

  test('applies red text color for diamonds', () => {
    const { container } = render(<Card suit="diamonds" rank="K" />);
    const cardElement = container.querySelector('.playing-card');
    expect(cardElement).toHaveClass('text-danger');
  });

  test('does not apply red text color for clubs', () => {
    const { container } = render(<Card suit="clubs" rank="7" />);
    const cardElement = container.querySelector('.playing-card');
    expect(cardElement).not.toHaveClass('text-danger');
  });

  test('does not apply red text color for spades', () => {
    const { container } = render(<Card suit="spades" rank="3" />);
    const cardElement = container.querySelector('.playing-card');
    expect(cardElement).not.toHaveClass('text-danger');
  });
});
