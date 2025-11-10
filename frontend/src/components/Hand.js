import React from 'react';
import Card from './Card';

const Hand = ({ title, cards, value, backgroundColor = '#f8f9fa' }) => {
  return (
    <div className="card mb-4" style={{ backgroundColor }}>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="text-muted">Value: {value}</p>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {cards.map((card, index) => (
            <Card key={index} suit={card.suit} rank={card.rank} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hand;
