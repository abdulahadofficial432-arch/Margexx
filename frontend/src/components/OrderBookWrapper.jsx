import React from 'react';
import { useOrderBookStore } from '../store/orderBookStore';

export default function OrderBookWrapper({ OrderBookComponent }) {
  const bids = useOrderBookStore(state => state.bids);
  const asks = useOrderBookStore(state => state.asks);

  return (
    <OrderBookComponent bids={bids} asks={asks} />
  );
}

