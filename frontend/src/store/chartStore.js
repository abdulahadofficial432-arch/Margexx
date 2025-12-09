import { create } from 'zustand';

export const useChartStore = create(set => ({
  candles: [], // {t, o, h, l, c, v}
  lastPrice: null,
  pushCandle: (candle) => set(state => {
    const arr = [...state.candles];
    if (arr.length && arr[arr.length - 1].t === candle.t) {
      arr[arr.length - 1] = candle;
    } else {
      arr.push(candle);
      if (arr.length > 500) arr.shift();
    }
    return { candles: arr, lastPrice: candle.c };
  }),
  setCandles: (candles) => set({ candles }),
}));

