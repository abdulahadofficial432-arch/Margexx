# Binance Futures Trading Integration

This project integrates Binance Futures WebSocket and REST APIs for real-time trading.

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
BINANCE_API_KEY=your_api_key_here
BINANCE_SECRET=your_secret_key_here
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Important:** Never commit your API keys to version control!

### 3. Start the Development Servers

#### Option 1: Run both servers separately

Terminal 1 - Next.js frontend:
```bash
pnpm dev
```

Terminal 2 - Express backend:
```bash
pnpm dev:server
```

#### Option 2: Run both servers together

```bash
pnpm dev:all
```

## Architecture

### Services

- **`services/wsPrice.js`** - WebSocket service for real-time price/kline data (1m intervals)
- **`services/wsOrderBook.js`** - WebSocket service for real-time order book depth updates
- **`services/tradeExecution.js`** - REST API service for placing and managing orders

### State Management

- **`lib/store/tradingStore.ts`** - Zustand store for managing trading state
  - Current price, order book, connection status
  - Real-time updates from WebSocket services

### Backend API

- **`server/index.js`** - Express server with protected endpoints
  - `/api/trade/order` - Place new orders (POST)
  - `/api/trade/order` - Cancel orders (DELETE)
  - `/api/trade/account` - Get account information (GET)
  - `/api/trade/open-orders` - Get open orders (GET)

All API requests are signed using HMAC SHA256 as required by Binance.

### Components

- **`components/order-entry-panel.tsx`** - Buy/Sell order entry with real-time price
- **`components/order-book-panel.tsx`** - Live order book depth display
- **`components/trading-view-chart.tsx`** - TradingView chart integration
- **`app/trade/page.tsx`** - Main trading page with WebSocket integration

## WebSocket Streams

### Price Stream
- **URL:** `wss://fstream.binance.com/ws/{symbol}@kline_1m`
- **Updates:** Real-time candlestick data every minute
- **Data:** Open, High, Low, Close, Volume

### Order Book Stream
- **URL:** `wss://fstream.binance.com/ws/{symbol}@depth20@100ms`
- **Updates:** Real-time depth updates every 100ms
- **Data:** Bid/Ask levels with quantities

## API Endpoints

### Place Order
```javascript
POST /api/trade/order
Headers: {
  'X-API-KEY': 'your_api_key',
  'Content-Type': 'application/json'
}
Body: {
  symbol: 'BTCUSDT',
  side: 'BUY' | 'SELL',
  type: 'LIMIT' | 'MARKET' | 'STOP_MARKET',
  quantity: '0.001',
  price: '50000', // Required for LIMIT orders
  timeInForce: 'GTC', // For LIMIT orders
  positionSide: 'LONG' | 'SHORT',
  secret: 'your_secret'
}
```

### Cancel Order
```javascript
DELETE /api/trade/order
Headers: {
  'X-API-KEY': 'your_api_key',
  'Content-Type': 'application/json'
}
Body: {
  symbol: 'BTCUSDT',
  orderId: 123456,
  secret: 'your_secret'
}
```

## Security

- API keys are stored in environment variables
- All Binance API requests are signed with HMAC SHA256
- Backend server handles signing to keep secrets secure
- Never expose API secrets in frontend code

## Testing

1. Start both servers
2. Navigate to `/trade`
3. WebSocket connections should establish automatically
4. Real-time price updates should appear
5. Order book should show live depth data
6. Buy/Sell buttons will place real orders (use testnet for testing!)

## Binance Testnet

For testing, use Binance Futures Testnet:
- Testnet API: `https://testnet.binancefuture.com`
- Testnet WebSocket: `wss://stream.binancefuture.com`

Update the URLs in the service files when using testnet.

## Troubleshooting

### WebSocket not connecting
- Check browser console for errors
- Verify symbol format (e.g., 'BTCUSDT' not 'BTC/USDT')
- Check network connectivity

### Orders failing
- Verify API keys are correct
- Check account has sufficient balance
- Ensure API key has futures trading permissions
- Check symbol format matches Binance format

### Backend not starting
- Ensure port 3001 is available
- Check Node.js version (requires Node 18+)
- Verify all dependencies are installed

