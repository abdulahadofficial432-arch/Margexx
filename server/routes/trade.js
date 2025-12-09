// server/routes/trade.js
const express = require('express');
const axios = require('axios');
const signature = require('../utils/signature');
const qs = require('querystring');

const router = express.Router();
const BASE = 'https://fapi.binance.com'; // futures REST

// helper to post signed request to Binance
async function postOrder(payload) {
  const timestamp = Date.now();
  const query = { ...payload, timestamp };
  const queryString = qs.stringify(query);
  const signatureStr = signature.sign(queryString, process.env.BINANCE_SECRET);
  const url = `${BASE}/fapi/v1/order?${queryString}&signature=${signatureStr}`;

  const headers = {
    'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
    'Content-Type': 'application/json'
  };

  return axios.post(url, {}, { headers });
}

// POST /trade/buy or /trade/sell
router.post('/:side', async (req, res) => {
  try {
    const sideParam = req.params.side.toUpperCase(); // 'BUY' or 'SELL'
    if (!['BUY','SELL'].includes(sideParam)) {
      return res.status(400).json({ error: 'side must be buy or sell' });
    }

    const { symbol, type, quantity, price, leverage, positionSide, timeInForce } = req.body;

    // Basic validation
    if (!symbol || !type || !quantity) {
      return res.status(400).json({ error: 'symbol, type, quantity required' });
    }

    // Build order payload for Binance futures
    const payload = {
      symbol,
      side: sideParam,
      type: type.toUpperCase(), // MARKET or LIMIT
      quantity: quantity.toString()
    };

    if (type.toUpperCase() === 'LIMIT') {
      payload.price = price;
      payload.timeInForce = timeInForce || 'GTC';
    }

    if (positionSide) payload.positionSide = positionSide; // BOTH, LONG, SHORT

    // Call Binance
    const binanceResp = await postOrder(payload);
    return res.json({ ok: true, data: binanceResp.data });

  } catch (err) {
    console.error('Trade error', err?.response?.data || err.message);
    const data = err?.response?.data || { message: err.message };
    return res.status(500).json({ ok: false, error: data });
  }
});

module.exports = router;

