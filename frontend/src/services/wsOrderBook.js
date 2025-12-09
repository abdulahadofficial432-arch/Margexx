import { useOrderBookStore } from '../store/orderBookStore';

const symbolLower = (process.env.REACT_APP_SYMBOL || 'BTCUSDT').toLowerCase();
const stream = `${symbolLower}@depth20@100ms`;
const wsUrl = `wss://fstream.binance.com/ws/${stream}`;

let ws;
let reconnectTimeout = null;

export function connectOrderBook() {
  const setBook = useOrderBookStore.getState().setBook;
  const updateBookPartial = useOrderBookStore.getState().updateBookPartial;

  function init() {
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('OrderBook WS open');
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };

    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (data.b && data.a) {
          updateBookPartial(data.b, data.a);
        } else {
          if (data.bids && data.asks) {
            setBook(data.bids, data.asks);
          }
        }
      } catch (e) {
        console.error('orderbook parse err', e);
      }
    };

    ws.onclose = () => {
      console.log('OrderBook WS closed, reconnecting in 3s');
      reconnectTimeout = setTimeout(init, 3000);
    };

    ws.onerror = (err) => {
      console.error('OrderBook WS err', err);
      ws.close();
    };
  }

  init();
}

export function disconnectOrderBook() {
  if (ws) ws.close();
}

