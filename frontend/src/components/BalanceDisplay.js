import React from 'react';

const BalanceDisplay = ({ balance, bet }) => {
  return (
    <div className="alert alert-info text-center mb-3">
      <strong>Balance: ${Number(balance).toFixed(2)}</strong> | Bet: ${Number(bet).toFixed(2)}
    </div>
  );
};

export default BalanceDisplay;
