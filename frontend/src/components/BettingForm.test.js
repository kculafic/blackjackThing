import { render, screen, fireEvent } from '@testing-library/react';
import BettingForm from './BettingForm';

describe('BettingForm Component', () => {
  const mockSetStartingBalance = jest.fn();
  const mockSetBetAmount = jest.fn();
  const mockOnStartGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    startingBalance: 100,
    setStartingBalance: mockSetStartingBalance,
    betAmount: 5,
    setBetAmount: mockSetBetAmount,
    onStartGame: mockOnStartGame
  };

  test('renders setup new game heading', () => {
    render(<BettingForm {...defaultProps} />);
    expect(screen.getByText('Setup New Game')).toBeInTheDocument();
  });

  test('displays current starting balance with two decimal places', () => {
    render(<BettingForm {...defaultProps} />);
    expect(screen.getByText(/Starting Balance: \$100\.00/)).toBeInTheDocument();
  });

  test('displays bet amount label', () => {
    render(<BettingForm {...defaultProps} />);
    expect(screen.getByText('Bet Amount:')).toBeInTheDocument();
  });

  test('renders start game button', () => {
    render(<BettingForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });

  test('start game button is enabled when bet is valid', () => {
    render(<BettingForm {...defaultProps} />);
    const button = screen.getByRole('button', { name: /start game/i });
    expect(button).not.toBeDisabled();
  });

  test('start game button is disabled when bet exceeds balance', () => {
    render(<BettingForm {...defaultProps} betAmount={150} />);
    const button = screen.getByRole('button', { name: /start game/i });
    expect(button).toBeDisabled();
  });

  test('start game button is disabled when bet is less than minimum', () => {
    render(<BettingForm {...defaultProps} betAmount={3} />);
    const button = screen.getByRole('button', { name: /start game/i });
    expect(button).toBeDisabled();
  });

  test('start game button is disabled when bet equals 0', () => {
    render(<BettingForm {...defaultProps} betAmount={0} />);
    const button = screen.getByRole('button', { name: /start game/i });
    expect(button).toBeDisabled();
  });

  test('calls onStartGame when button is clicked', () => {
    render(<BettingForm {...defaultProps} />);
    const button = screen.getByRole('button', { name: /start game/i });
    fireEvent.click(button);
    expect(mockOnStartGame).toHaveBeenCalledTimes(1);
  });

  test('calls setStartingBalance when range slider changes', () => {
    render(<BettingForm {...defaultProps} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '200' } });
    expect(mockSetStartingBalance).toHaveBeenCalledWith(200);
  });

  test('calls setBetAmount when bet input changes', () => {
    render(<BettingForm {...defaultProps} />);
    const input = screen.getByPlaceholderText(/enter bet amount/i);
    fireEvent.change(input, { target: { value: '25' } });
    expect(mockSetBetAmount).toHaveBeenCalledWith(25);
  });

  test('bet input has minimum value of 5', () => {
    render(<BettingForm {...defaultProps} />);
    const input = screen.getByPlaceholderText(/enter bet amount/i);
    expect(input).toHaveAttribute('min', '5');
  });

  test('bet input has maximum value equal to starting balance', () => {
    render(<BettingForm {...defaultProps} startingBalance={500} />);
    const input = screen.getByPlaceholderText(/enter bet amount/i);
    expect(input).toHaveAttribute('max', '500');
  });

  test('displays $ prefix before bet input', () => {
    render(<BettingForm {...defaultProps} />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });
});
