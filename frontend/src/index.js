import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { connectKlines } from './services/wsKlines';
import { connectOrderBook } from './services/wsOrderBook';

// start websockets
connectKlines();
connectOrderBook();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

