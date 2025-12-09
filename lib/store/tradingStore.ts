"use client"

import { create } from 'zustand'

interface KlineData {
  symbol: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  timestamp: number
  isClosed: boolean
}

interface OrderBookLevel {
  price: number
  quantity: number
  total: number
}

interface OrderBook {
  bids: OrderBookLevel[]
  asks: OrderBookLevel[]
  lastUpdateId: number | null
}

interface TradingState {
  // Price data
  currentPrice: number
  priceChange24h: number
  volume24h: number
  high24h: number
  low24h: number
  klineData: KlineData | null
  
  // Order book
  orderBook: OrderBook
  
  // Connection status
  priceWsConnected: boolean
  orderBookWsConnected: boolean
  
  // Selected pair
  selectedPair: string
  
  // Actions
  setCurrentPrice: (price: number) => void
  setKlineData: (data: KlineData) => void
  setOrderBook: (orderBook: OrderBook) => void
  setPriceWsConnected: (connected: boolean) => void
  setOrderBookWsConnected: (connected: boolean) => void
  setSelectedPair: (pair: string) => void
  updateMarketData: (data: {
    price?: number
    change24h?: number
    volume24h?: number
    high24h?: number
    low24h?: number
  }) => void
}

export const useTradingStore = create<TradingState>((set) => ({
  // Initial state
  currentPrice: 0,
  priceChange24h: 0,
  volume24h: 0,
  high24h: 0,
  low24h: 0,
  klineData: null,
  orderBook: {
    bids: [],
    asks: [],
    lastUpdateId: null,
  },
  priceWsConnected: false,
  orderBookWsConnected: false,
  selectedPair: 'BTCUSDT',
  
  // Actions
  setCurrentPrice: (price) => set({ currentPrice: price }),
  
  setKlineData: (data) => set({ 
    klineData: data,
    currentPrice: data.close,
  }),
  
  setOrderBook: (orderBook) => set({ orderBook }),
  
  setPriceWsConnected: (connected) => set({ priceWsConnected: connected }),
  
  setOrderBookWsConnected: (connected) => set({ orderBookWsConnected: connected }),
  
  setSelectedPair: (pair) => set({ selectedPair: pair }),
  
  updateMarketData: (data) => set((state) => ({
    ...state,
    ...data,
  })),
}))

