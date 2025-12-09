import { create } from 'zustand';

export const useTradeStore = create(set => ({
  positions: [],
  orders: [],
  addOrder: (order) => set(state => ({ orders: [order, ...state.orders] })),
  updateOrder: (orderId, upd) => set(state => ({
    orders: state.orders.map(o => o.orderId === orderId ? {...o, ...upd} : o)
  })),
  setPositions: (positions) => set({ positions }),
}));

