import React from 'react';
import { useChartStore } from '../store/chartStore';

export default function ChartWrapper({ ChartComponent }) {
  const candles = useChartStore(state => state.candles);
  const lastPrice = useChartStore(state => state.lastPrice);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ChartComponent candles={candles} lastPrice={lastPrice} />
    </div>
  );
}

