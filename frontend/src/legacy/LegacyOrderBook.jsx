import React from 'react';

export default function LegacyOrderBook({ bids, asks }){
  return (
    <div style={{ padding: 12, color: '#fff', fontSize: 12 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold' }}>Asks</div>
          <div style={{ maxHeight: 300, overflow: 'auto' }}>
            {asks.slice(0,20).map(([p,q], i) => (
              <div key={i} style={{ color: '#ff6b6b' }}>{p} — {q}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold' }}>Bids</div>
          <div style={{ maxHeight: 300, overflow: 'auto' }}>
            {bids.slice(0,20).map(([p,q], i) => (
              <div key={i} style={{ color: '#4cd137' }}>{p} — {q}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

