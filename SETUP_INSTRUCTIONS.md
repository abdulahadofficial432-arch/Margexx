# Setup Instructions for Binance Futures Trading Integration

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

This will install:
- Zustand (state management)
- Express (backend server)
- CORS (for API requests)
- Sonner (toast notifications)
- Concurrently (to run both servers)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Binance API Credentials (REQUIRED for trading)
BINANCE_API_KEY=your_binance_api_key_here
BINANCE_SECRET=your_binance_secret_key_here

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: For frontend direct access (NOT RECOMMENDED for production)
# NEXT_PUBLIC_BINANCE_API_KEY=your_api_key
# NEXT_PUBLIC_BINANCE_SECRET=your_secret
```

**⚠️ SECURITY WARNING:** Never commit `.env.local` to version control!

### 3. Get Binance API Credentials

1. Go to https://www.binance.com/en/my/settings/api-management
2. Create a new API key
3. Enable "Enable Futures" permission
4. Copy the API Key and Secret Key to your `.env.local` file

**For Testing:** Use Binance Testnet:
- Testnet: https://testnet.binancefuture.com
- Testnet API Keys: https://testnet.binancefuture.com/en/my/settings/api-management

### 4. Start the Application

#### Option A: Run Both Servers Together (Recommended)

```bash
pnpm dev:all
```

This starts:
- Next.js frontend on http://localhost:3011
- Express backend on http://localhost:3001

#### Option B: Run Servers Separately

Terminal 1 (Frontend):
```bash
pnpm dev
```

Terminal 2 (Backend):
```bash
pnpm dev:server
```

### 5. Access the Trading Interface

Navigate to: http://localhost:3011/trade

## Features

✅ **Real-time Price Updates**
- WebSocket connection to Binance Futures
- 1-minute kline (candlestick) data
- Live price updates in UI

✅ **Live Order Book**
- Real-time depth updates every 100ms
- Bid/Ask levels with quantities
- Buy/Sell ratio visualization

✅ **Functional Buy/Sell Buttons**
- Place real orders on Binance Futures
- Support for Limit, Market, and Stop Market orders
- Toast notifications for order status

✅ **Secure API Integration**
- HMAC SHA256 signature for all requests
- API keys stored securely in environment variables
- Backend handles signing (secrets never exposed to frontend)

## Architecture Overview

```
Frontend (Next.js)
├── WebSocket Services
│   ├── wsPrice.js → Price/kline stream
│   └── wsOrderBook.js → Order book depth stream
├── State Management (Zustand)
│   └── tradingStore.ts → Global trading state
├── API Client
│   └── tradeApi.ts → Backend API calls
└── Components
    ├── order-entry-panel.tsx → Buy/Sell interface
    ├── order-book-panel.tsx → Live order book
    └── trading-view-chart.tsx → Chart display

Backend (Express)
└── server/index.js
    ├── /api/trade/order (POST) → Place order
    ├── /api/trade/order (DELETE) → Cancel order
    ├── /api/trade/account (GET) → Account info
    └── /api/trade/open-orders (GET) → Open orders
```

## WebSocket Streams

### Price Stream
- **Endpoint:** `wss://fstream.binance.com/ws/{symbol}@kline_1m`
- **Example:** `wss://fstream.binance.com/ws/btcusdt@kline_1m`
- **Updates:** Every minute when kline closes
- **Data:** Open, High, Low, Close, Volume

### Order Book Stream
- **Endpoint:** `wss://fstream.binance.com/ws/{symbol}@depth20@100ms`
- **Example:** `wss://fstream.binance.com/ws/btcusdt@depth20@100ms`
- **Updates:** Every 100ms
- **Data:** Top 20 bid/ask levels with quantities

## API Usage Examples

### Place a Limit Buy Order

```javascript
import { placeOrder } from '@/lib/api/tradeApi'

const result = await placeOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '50000',
  timeInForce: 'GTC',
  positionSide: 'LONG',
  apiKey: process.env.NEXT_PUBLIC_BINANCE_API_KEY,
  secret: process.env.NEXT_PUBLIC_BINANCE_SECRET,
})
```

### Place a Market Sell Order

```javascript
const result = await placeOrder({
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'MARKET',
  quantity: '0.001',
  positionSide: 'SHORT',
  apiKey: process.env.NEXT_PUBLIC_BINANCE_API_KEY,
  secret: process.env.NEXT_PUBLIC_BINANCE_SECRET,
})
```

## Troubleshooting

### WebSocket Not Connecting

1. Check browser console for errors
2. Verify symbol format: `BTCUSDT` (not `BTC/USDT` or `BTC-USD`)
3. Check network connectivity
4. Ensure Binance API is accessible from your location

### Orders Failing

1. Verify API keys are correct in `.env.local`
2. Check account has sufficient balance
3. Ensure API key has "Enable Futures" permission
4. Verify symbol format matches Binance (e.g., `BTCUSDT`)
5. Check order parameters (price, quantity format)

### Backend Server Not Starting

1. Check port 3001 is available: `lsof -i :3001` (Mac/Linux) or `netstat -ano | findstr :3001` (Windows)
2. Verify Node.js version: `node --version` (requires 18+)
3. Check all dependencies installed: `pnpm install`
4. Check server logs for specific errors

### Environment Variables Not Loading

1. Ensure `.env.local` is in the root directory
2. Restart the development server after changing `.env.local`
3. For Next.js, variables must start with `NEXT_PUBLIC_` to be accessible in browser
4. Backend can access all variables without prefix

## Security Best Practices

1. ✅ **Never commit `.env.local`** - Already in `.gitignore`
2. ✅ **Use environment variables** - Never hardcode API keys
3. ✅ **Backend handles signing** - Secrets never exposed to frontend
4. ✅ **Use testnet for development** - Test with fake money first
5. ✅ **Limit API key permissions** - Only enable what you need
6. ✅ **Use IP whitelist** - Restrict API key to your server IP

## Next Steps

1. Test with Binance Testnet first
2. Start with small order sizes
3. Monitor WebSocket connections
4. Check order execution in Binance dashboard
5. Review error logs for any issues

## Support

For issues:
1. Check browser console for errors
2. Check backend server logs
3. Verify API credentials
4. Test WebSocket connection manually
5. Review Binance API documentation: https://binance-docs.github.io/apidocs/futures/en/

