import React, { useState } from 'react';
import './App.css';
import { createGame, hit, stand } from './api';

function App() {
  const [game, setGame] = useState(null);

  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };

  const getStatusMessage = (status) => {
    switch(status) {
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
    const newGame = await createGame();
    setGame(newGame);
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

          {!game && (
            <div className="text-center">
              <button className="btn btn-success btn-lg" onClick={handleNewGame}>
                New Game
              </button>
            </div>
          )}

          {game && (
            <div>
              <div className="card mb-4 bg-light">
                <div className="card-body">
                  <h3 className="card-title">Dealer's Hand</h3>
                  <p className="text-muted">Value: {game.dealer_hand.value}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {game.dealer_hand.cards.map((card, index) => (
                      <div key={index} className={`playing-card ${card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-danger' : ''}`}>
                        <div className="card-rank">{card.rank}</div>
                        <div className="card-suit">{suitSymbols[card.suit]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card mb-4 bg-success bg-opacity-10">
                <div className="card-body">
                  <h3 className="card-title">Your Hand</h3>
                  <p className="text-muted">Value: {game.player_hand.value}</p>
                  <div className="d-flex flex-wrap gap-2">
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
                  <button className="btn btn-success btn-lg" onClick={handleNewGame}>
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
