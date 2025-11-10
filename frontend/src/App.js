import React, { useState } from 'react';
import './App.css';
import { createGame, hit, stand } from './api';
import BettingForm from './components/BettingForm';
import Hand from './components/Hand';
import BalanceDisplay from './components/BalanceDisplay';
import GameControls from './components/GameControls';

function App() {
  const [game, setGame] = useState(null);
  const [startingBalance, setStartingBalance] = useState(100);
  const [betAmount, setBetAmount] = useState(5);
  const [showBettingForm, setShowBettingForm] = useState(true);

  const handleNewGame = async () => {
    const newGame = await createGame(betAmount, startingBalance);
    setGame(newGame);
    setShowBettingForm(false);
  };

  const handleHit = async () => {
    const updatedGame = await hit(game.id);
    setGame(updatedGame);
  };

  const handleStand = async () => {
    const updatedGame = await stand(game.id);
    setGame(updatedGame);
  };

  const handleNewGameAfterRound = () => {
    setGame(null);
    setShowBettingForm(true);
    setStartingBalance(Number(game.player_balance));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">♠ Blackjack ♥</h1>

          {!game && showBettingForm && (
            <BettingForm
              startingBalance={startingBalance}
              setStartingBalance={setStartingBalance}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              onStartGame={handleNewGame}
            />
          )}

          {game && (
            <div>
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
