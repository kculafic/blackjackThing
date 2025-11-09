import React, { useState } from 'react';
import './App.css';
import { createGame, hit, stand } from './api';

function App() {
  const [game, setGame] = useState(null);
  const [startingBalance, setStartingBalance] = useState(100);
  const [betAmount, setBetAmount] = useState(5);
  const [showBettingForm, setShowBettingForm] = useState(true);

  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'player_wins':
        return 'You Win!';
      case 'dealer_wins':
        return 'Dealer Wins';
      case 'push':
        return 'Push (Tie)';
      case 'player_busted':
        return 'Busted! Dealer Wins';
      case 'player_blackjack':
        return 'Blackjack! You Win!';
      default:
        return '';
    }
  };

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">♠ Blackjack ♥</h1>

          {!game && showBettingForm && (
            <div className="card p-4 mb-4">
              <h3 className="text-center mb-4">Setup New Game</h3>
              <div className="mb-3">
                <label className="form-label">Starting Balance: ${startingBalance.toFixed(2)}</label>
                <input
                  type="range"
                  className="form-range"
                  min="50"
                  max="1000"
                  step="50"
                  value={startingBalance}
                  onChange={(e) => setStartingBalance(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bet Amount:</label>
                <div className="input-group" style={{ maxWidth: '300px' }}>
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter bet amount (minimum 5)"
                    min="5"
                    max={startingBalance}
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                  />
                </div>
              </div>
              <button
                className="btn btn-success btn-lg w-100"
                onClick={handleNewGame}
                disabled={betAmount > startingBalance || betAmount < 5}
              >
                Start Game
              </button>
            </div>
          )}

          {game && (
            <div>
              <div className="alert alert-info text-center mb-3">
                <strong>Balance: ${Number(game.player_balance).toFixed(2)}</strong> | Bet: ${Number(game.bet_amount).toFixed(2)}
              </div>

              <div className="card mb-4 bg-light">
                <div className="card-body">
                  <h3 className="card-title">Dealer's Hand</h3>
                  <p className="text-muted">Value: {game.dealer_hand.value}</p>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {game.dealer_hand.cards.map((card, index) => (
                      <div key={index} className={`playing-card ${card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-danger' : ''}`}>
                        <div className="card-rank">{card.rank}</div>
                        <div className="card-suit">{suitSymbols[card.suit]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card mb-4" style={{ backgroundColor: '#f5f5f5c5' }}>
                <div className="card-body">
                  <h3 className="card-title">Your Hand</h3>
                  <p className="text-muted">Value: {game.player_hand.value}</p>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {game.player_hand.cards.map((card, index) => (
                      <div key={index} className={`playing-card ${card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-danger' : ''}`}>
                        <div className="card-rank">{card.rank}</div>
                        <div className="card-suit">{suitSymbols[card.suit]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {getStatusMessage(game.status) && (
                <div className={`alert ${game.status.includes('player_wins') || game.status === 'player_blackjack' ? 'alert-success' : game.status === 'push' ? 'alert-info' : 'alert-danger'} text-center`}>
                  <h4>{getStatusMessage(game.status)}</h4>
                </div>
              )}

              <div className="text-center">
                {game.status === 'in_progress' && (
                  <div>
                    <button className="btn btn-primary btn-lg me-2" onClick={handleHit}>
                      Hit
                    </button>
                    <button className="btn btn-warning btn-lg" onClick={handleStand}>
                      Stand
                    </button>
                  </div>
                )}

                {game.status !== 'in_progress' && (
                  <button className="btn btn-success btn-lg" onClick={() => {
                    setGame(null);
                    setShowBettingForm(true);
                    setStartingBalance(Number(game.player_balance));
                  }}>
                    New Game
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
