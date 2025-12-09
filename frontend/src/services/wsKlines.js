import { useChartStore } from '../store/chartStore';

const symbolLower = (process.env.REACT_APP_SYMBOL || 'BTCUSDT').toLowerCase();
const stream = `${symbolLower}@kline_1m`;
const wsUrl = `wss://fstream.binance.com/ws/${stream}`;

let ws;
let reconnectTimeout = null;

export function connectKlines() {
  const pushCandle = useChartStore.getState().pushCandle;

  function init() {
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Klines WS open');
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };

    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        const k = data.k;
        const candle = {
          t: k.t,
          o: parseFloat(k.o),
          h: parseFloat(k.h),
          l: parseFloat(k.l),
          c: parseFloat(k.c),
          v: parseFloat(k.v)
        };
        pushCandle(candle);
      } catch (e) {
        console.error('kline parse err', e);
      }
    };

    ws.onclose = () => {
      console.log('Klines WS closed, reconnecting in 3s');
      reconnectTimeout = setTimeout(init, 3000);
    };

    ws.onerror = (err) => {
      console.error('Klines WS err', err);
      ws.close();
    };
  }

  init();
}

export function disconnectKlines() {
  if (ws) ws.close();
}

