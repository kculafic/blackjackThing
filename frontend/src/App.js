import React, { useState } from 'react';
import './App.css';
import { createGame, hit, stand } from './api';

function App() {
  const [game, setGame] = useState(null);

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
    <div className="App">
      <h1>Blackjack</h1>

      {!game && (
        <button onClick={handleNewGame}>New Game</button>
      )}

      {game && (
        <div>
          <div>
            <h2>Dealer's Hand (Value: {game.dealer_hand.value})</h2>
            <div>
              {game.dealer_hand.cards.map((card, index) => (
                <span key={index}>{card.rank} of {card.suit} </span>
              ))}
            </div>
          </div>

          <div>
            <h2>Your Hand (Value: {game.player_hand.value})</h2>
            <div>
              {game.player_hand.cards.map((card, index) => (
                <span key={index}>{card.rank} of {card.suit} </span>
              ))}
            </div>
          </div>

          <div>
            <p>Status: {game.status}</p>
          </div>

          {game.status === 'in_progress' && (
            <div>
              <button onClick={handleHit}>Hit</button>
              <button onClick={handleStand}>Stand</button>
            </div>
          )}

          {game.status !== 'in_progress' && (
            <button onClick={handleNewGame}>New Game</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
