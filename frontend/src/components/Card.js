import React from 'react';

const Card = ({ suit, rank }) => {
  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };

  const isRed = suit === 'hearts' || suit === 'diamonds';

  return (
    <div className={`playing-card ${isRed ? 'text-danger' : ''}`}>
      <div className="card-rank">{rank}</div>
      <div className="card-suit">{suitSymbols[suit]}</div>
    </div>
  );
};

export default Card;
