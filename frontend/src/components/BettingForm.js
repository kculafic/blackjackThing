import React from 'react';

const BettingForm = ({
  startingBalance,
  setStartingBalance,
  betAmount,
  setBetAmount,
  onStartGame,
  isLoading = false,
  isFirstGame = true
}) => {
  return (
    <div className="card p-4 mb-4">
      <h3 className="text-center mb-4">
        {isFirstGame ? 'Setup New Game' : 'Place Your Bet'}
      </h3>

      {isFirstGame && (
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
            disabled={isLoading}
          />
        </div>
      )}

      {!isFirstGame && (
        <div className="mb-3">
          <p className="text-center text-muted">
            Balance: <strong>${startingBalance.toFixed(2)}</strong>
          </p>
        </div>
      )}

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
            value={betAmount === 0 ? '' : betAmount}
            onChange={(e) => {
              const value = e.target.value;
              setBetAmount(value === '' ? 0 : Number(value));
            }}
            onFocus={(e) => e.target.select()}
            disabled={isLoading}
          />
        </div>
        {betAmount < 5 && betAmount > 0 && (
          <small className="text-danger d-block mt-1">
            Minimum bet is $5.00
          </small>
        )}
        {betAmount > startingBalance && (
          <small className="text-danger d-block mt-1">
            You cannot bet more than your current balance (${startingBalance.toFixed(2)})
          </small>
        )}
      </div>
      <button
        className="btn btn-success btn-lg w-100"
        onClick={onStartGame}
        disabled={betAmount > startingBalance || betAmount < 5 || isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {isFirstGame ? 'Starting...' : 'Dealing...'}
          </>
        ) : (
          isFirstGame ? 'Start Game' : 'Deal Hand'
        )}
      </button>
    </div>
  );
};

export default BettingForm;
