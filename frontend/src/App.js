import React, { useState } from 'react';
import './App.css';
import { createGame, hit, stand } from './api';
import BettingForm from './components/BettingForm';
import Hand from './components/Hand';
import BalanceDisplay from './components/BalanceDisplay';
import GameControls from './components/GameControls';
import SessionStats from './components/SessionStats';

function App() {
  const [game, setGame] = useState(null);
  const [startingBalance, setStartingBalance] = useState(100);
  const [betAmount, setBetAmount] = useState(5);
  const [showBettingForm, setShowBettingForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionStartBalance, setSessionStartBalance] = useState(null);
  const [isFirstGame, setIsFirstGame] = useState(true);

  const handleNewGame = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newGame = await createGame(betAmount, startingBalance);
      setGame(newGame);
      setShowBettingForm(false);

      // Track session starting balance (only on first game)
      if (isFirstGame) {
        setSessionStartBalance(startingBalance);
        setIsFirstGame(false);
      }
    } catch (err) {
      setError('Failed to start game. Please try again.');
      console.error('Error creating game:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedGame = await hit(game.id);
      setGame(updatedGame);
    } catch (err) {
      setError('Failed to draw card. Please try again.');
      console.error('Error hitting:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStand = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedGame = await stand(game.id);
      setGame(updatedGame);
    } catch (err) {
      setError('Failed to stand. Please try again.');
      console.error('Error standing:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewGameAfterRound = () => {
    setGame(null);
    setShowBettingForm(true);
    setStartingBalance(Number(game.player_balance));
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4 pt-3">
            <span className="text-danger">♥</span>♣ Blackjack ♠<span className="text-danger">♦</span>
          </h1>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error:</strong> {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          {!game && showBettingForm && (
            <BettingForm
              startingBalance={startingBalance}
              setStartingBalance={setStartingBalance}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              onStartGame={handleNewGame}
              isLoading={isLoading}
              isFirstGame={isFirstGame}
            />
          )}

          {game && (
            <div>
              <SessionStats
                sessionStartBalance={sessionStartBalance}
                currentBalance={game.player_balance}
              />

              <BalanceDisplay
                balance={game.player_balance}
                bet={game.bet_amount}
              />

              <Hand
                title="Dealer's Hand"
                cards={game.dealer_hand.cards}
                value={game.dealer_hand.value}
                backgroundColor="#f8f9fa"
              />

              <Hand
                title="Your Hand"
                cards={game.player_hand.cards}
                value={game.player_hand.value}
                backgroundColor="#f5f5f5c5"
              />

              <GameControls
                gameStatus={game.status}
                onHit={handleHit}
                onStand={handleStand}
                onNewGame={handleNewGameAfterRound}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
