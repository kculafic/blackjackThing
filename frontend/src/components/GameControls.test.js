import { render, screen, fireEvent } from '@testing-library/react';
import GameControls from './GameControls';

describe('GameControls Component', () => {
  const mockOnHit = jest.fn();
  const mockOnStand = jest.fn();
  const mockOnNewGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    gameStatus: 'in_progress',
    onHit: mockOnHit,
    onStand: mockOnStand,
    onNewGame: mockOnNewGame
  };

  describe('During active gameplay (in_progress)', () => {
    test('renders Hit button when game is in progress', () => {
      render(<GameControls {...defaultProps} />);
      expect(screen.getByRole('button', { name: /hit/i })).toBeInTheDocument();
    });

    test('renders Stand button when game is in progress', () => {
      render(<GameControls {...defaultProps} />);
      expect(screen.getByRole('button', { name: /stand/i })).toBeInTheDocument();
    });

    test('does not render New Game button when game is in progress', () => {
      render(<GameControls {...defaultProps} />);
      expect(screen.queryByRole('button', { name: /new game/i })).not.toBeInTheDocument();
    });

    test('does not display status message when game is in progress', () => {
      render(<GameControls {...defaultProps} />);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    test('calls onHit when Hit button is clicked', () => {
      render(<GameControls {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /hit/i }));
      expect(mockOnHit).toHaveBeenCalledTimes(1);
    });

    test('calls onStand when Stand button is clicked', () => {
      render(<GameControls {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /stand/i }));
      expect(mockOnStand).toHaveBeenCalledTimes(1);
    });
  });

  describe('Player wins', () => {
    test('displays "You Win!" message when player wins', () => {
      render(<GameControls {...defaultProps} gameStatus="player_wins" />);
      expect(screen.getByText('You Win!')).toBeInTheDocument();
    });

    test('renders New Game button when player wins', () => {
      render(<GameControls {...defaultProps} gameStatus="player_wins" />);
      expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
    });

    test('does not render Hit/Stand buttons when player wins', () => {
      render(<GameControls {...defaultProps} gameStatus="player_wins" />);
      expect(screen.queryByRole('button', { name: /hit/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /stand/i })).not.toBeInTheDocument();
    });

    test('applies success alert class when player wins', () => {
      const { container } = render(<GameControls {...defaultProps} gameStatus="player_wins" />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-success');
    });
  });

  describe('Dealer wins', () => {
    test('displays "Dealer Wins" message when dealer wins', () => {
      render(<GameControls {...defaultProps} gameStatus="dealer_wins" />);
      expect(screen.getByText('Dealer Wins')).toBeInTheDocument();
    });

    test('renders New Game button when dealer wins', () => {
      render(<GameControls {...defaultProps} gameStatus="dealer_wins" />);
      expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
    });

    test('applies danger alert class when dealer wins', () => {
      const { container } = render(<GameControls {...defaultProps} gameStatus="dealer_wins" />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-danger');
    });
  });

  describe('Push (tie)', () => {
    test('displays "Push (Tie)" message on tie', () => {
      render(<GameControls {...defaultProps} gameStatus="push" />);
      expect(screen.getByText('Push (Tie)')).toBeInTheDocument();
    });

    test('applies info alert class on push', () => {
      const { container } = render(<GameControls {...defaultProps} gameStatus="push" />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-info');
    });

    test('renders New Game button on push', () => {
      render(<GameControls {...defaultProps} gameStatus="push" />);
      expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
    });
  });

  describe('Player busted', () => {
    test('displays "Busted! Dealer Wins" message when player busts', () => {
      render(<GameControls {...defaultProps} gameStatus="player_busted" />);
      expect(screen.getByText('Busted! Dealer Wins')).toBeInTheDocument();
    });

    test('applies danger alert class when player busts', () => {
      const { container } = render(<GameControls {...defaultProps} gameStatus="player_busted" />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-danger');
    });

    test('renders New Game button when player busts', () => {
      render(<GameControls {...defaultProps} gameStatus="player_busted" />);
      expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
    });
  });

  describe('Player blackjack', () => {
    test('displays "Blackjack! You Win!" message on blackjack', () => {
      render(<GameControls {...defaultProps} gameStatus="player_blackjack" />);
      expect(screen.getByText('Blackjack! You Win!')).toBeInTheDocument();
    });

    test('applies success alert class on blackjack', () => {
      const { container } = render(<GameControls {...defaultProps} gameStatus="player_blackjack" />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-success');
    });

    test('renders New Game button on blackjack', () => {
      render(<GameControls {...defaultProps} gameStatus="player_blackjack" />);
      expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
    });
  });

  describe('New Game functionality', () => {
    test('calls onNewGame when New Game button is clicked', () => {
      render(<GameControls {...defaultProps} gameStatus="player_wins" />);
      fireEvent.click(screen.getByRole('button', { name: /new game/i }));
      expect(mockOnNewGame).toHaveBeenCalledTimes(1);
    });
  });
});
