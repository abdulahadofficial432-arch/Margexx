import React from 'react';
import ChartWrapper from './components/ChartWrapper';
import OrderBookWrapper from './components/OrderBookWrapper';
import TradePanelActions from './components/TradePanelActions';

// NOTE: Replace `LegacyChart` and `LegacyOrderBook` with your existing components.
import LegacyChart from './legacy/LegacyChart';
import LegacyOrderBook from './legacy/LegacyOrderBook';

export default function App(){
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <ChartWrapper ChartComponent={LegacyChart} />
        </div>
        <div style={{ width: 360 }}>
          <OrderBookWrapper OrderBookComponent={LegacyOrderBook} />
        </div>
      </div>
      <div style={{ height: 120 }}>
        <TradePanelActions quantityDefault={0.001} />
      </div>
    </div>
  );
}

