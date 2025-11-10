import React from 'react';

const GameControls = ({ gameStatus, onHit, onStand, onNewGame }) => {
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

  const getAlertClass = (status) => {
    if (status.includes('player_wins') || status === 'player_blackjack') {
      return 'alert-success';
    } else if (status === 'push') {
      return 'alert-info';
    } else {
      return 'alert-danger';
    }
  };

  return (
    <div>
      {getStatusMessage(gameStatus) && (
        <div className={`alert ${getAlertClass(gameStatus)} text-center`}>
          <h4>{getStatusMessage(gameStatus)}</h4>
        </div>
      )}

      <div className="text-center">
        {gameStatus === 'in_progress' && (
          <div>
            <button className="btn btn-primary btn-lg me-2" onClick={onHit}>
              Hit
            </button>
            <button className="btn btn-warning btn-lg" onClick={onStand}>
              Stand
            </button>
          </div>
        )}

        {gameStatus !== 'in_progress' && (
          <button className="btn btn-success btn-lg" onClick={onNewGame}>
            New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameControls;
