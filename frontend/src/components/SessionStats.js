import React from 'react';

const SessionStats = ({ sessionStartBalance, currentBalance }) => {
  if (sessionStartBalance === null) return null;

  const netChange = Number(currentBalance) - sessionStartBalance;
  const isWinning = netChange > 0;
  const isLosing = netChange < 0;

  return (
    <div className="card mb-3" style={{ backgroundColor: '#e8f5e9' }}>
      <div className="card-body py-2">
        <div className="row text-center">
          <div className="col-4">
            <small className="text-muted d-block">Session Start</small>
            <strong>${sessionStartBalance.toFixed(2)}</strong>
          </div>
          <div className="col-4">
            <small className="text-muted d-block">Current</small>
            <strong>${Number(currentBalance).toFixed(2)}</strong>
          </div>
          <div className="col-4">
            <small className="text-muted d-block">Net</small>
            <strong className={isWinning ? 'text-success' : isLosing ? 'text-danger' : ''}>
              {netChange >= 0 ? '+' : ''}${netChange.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionStats;
