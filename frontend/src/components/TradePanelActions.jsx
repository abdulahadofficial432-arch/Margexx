import React, { useState } from 'react';
import { executeOrder } from '../services/tradeExecution';
import { useTradeStore } from '../store/tradeStore';

export default function TradePanelActions({ quantityDefault = 0.001 }) {
  const [loading, setLoading] = useState(false);
  const addOrder = useTradeStore(state => state.addOrder);

  async function onBuy() {
    try {
      setLoading(true);
      const resp = await executeOrder('buy', { type: 'MARKET', quantity: quantityDefault });
      addOrder(resp.data);
      alert('Order Executed Successfully');
    } catch (err) {
      alert('Order failed: ' + (err?.response?.data?.error?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  async function onSell() {
    try {
      setLoading(true);
      const resp = await executeOrder('sell', { type: 'MARKET', quantity: quantityDefault });
      addOrder(resp.data);
      alert('Order Executed Successfully');
    } catch (err) {
      alert('Order failed: ' + (err?.response?.data?.error?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={onBuy} disabled={loading} className="buy-btn">Buy/Long</button>
      <button onClick={onSell} disabled={loading} className="sell-btn">Sell/Short</button>
    </div>
  );
}

