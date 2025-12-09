import { create } from 'zustand';

export const useOrderBookStore = create(set => ({
  bids: [], // [[price, qty], ...]
  asks: [],
  buyRatio: 50,
  setBook: (bids, asks) => set({ bids, asks }),
  updateBookPartial: (bidsDelta, asksDelta) => set(state => {
    const mergeSide = (side, delta) => {
      const map = new Map(side.map(([p,q]) => [p, parseFloat(q)]));
      delta.forEach(([p,q]) => {
        const qn = parseFloat(q);
        if (qn === 0) map.delete(p);
        else map.set(p, qn);
      });
      return Array.from(map.entries()).map(([p,q]) => [p, q.toString()]);
    };
    const newBids = mergeSide(state.bids, bidsDelta);
    const newAsks = mergeSide(state.asks, asksDelta);
    return { bids: newBids, asks: newAsks };
  })
}));

