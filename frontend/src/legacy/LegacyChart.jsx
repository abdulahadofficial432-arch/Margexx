// Placeholder wrapper for your existing chart component. Replace this file with your real component file or re-export it.
import React from 'react';

export default function LegacyChart({ candles, lastPrice }){
  // Very minimal placeholder: integrate your real chart component here.
  return (
    <div style={{ padding: 12, color: '#fff' }}>
      <div>Last price: {lastPrice}</div>
      <pre style={{ maxHeight: 400, overflow: 'auto' }}>{JSON.stringify(candles.slice(-20), null, 2)}</pre>
    </div>
  );
}

