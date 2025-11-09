const API_URL = 'http://localhost:3000';

export const createGame = async (betAmount, startingBalance) => {
  const response = await fetch(`${API_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bet_amount: betAmount,
      starting_balance: startingBalance
    }),
  });
  return response.json();
};

export const getGame = async (gameId) => {
  const response = await fetch(`${API_URL}/games/${gameId}`);
  return response.json();
};

export const hit = async (gameId) => {
  const response = await fetch(`${API_URL}/games/${gameId}/hit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const stand = async (gameId) => {
  const response = await fetch(`${API_URL}/games/${gameId}/stand`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
