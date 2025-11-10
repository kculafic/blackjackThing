import React from 'react';

const BettingForm = ({
  startingBalance,
  setStartingBalance,
  betAmount,
  setBetAmount,
  onStartGame
}) => {
  return (
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
        onClick={onStartGame}
        disabled={betAmount > startingBalance || betAmount < 5}
      >
        Start Game
      </button>
    </div>
  );
};

export default BettingForm;
