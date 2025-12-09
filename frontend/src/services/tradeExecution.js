import axios from 'axios';

const BACKEND = process.env.REACT_APP_BACKEND || 'http://localhost:5000';
const API_KEY = process.env.REACT_APP_APP_API_KEY || 'supersecretappkey123';

export async function executeOrder(side, { symbol = (process.env.REACT_APP_SYMBOL || 'BTCUSDT'), type = 'MARKET', quantity, price, timeInForce, positionSide }) {
  try {
    const url = `${BACKEND}/trade/${side.toLowerCase()}`;
    const body = { symbol, type, quantity, price, timeInForce, positionSide };

    const res = await axios.post(url, body, {
      headers: { 'x-api-key': API_KEY }
    });

    return res.data;
  } catch (err) {
    console.error('executeOrder err', err?.response?.data || err.message);
    throw err;
  }
}

