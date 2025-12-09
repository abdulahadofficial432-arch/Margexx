"use client"

import { useEffect, useRef } from 'react'
import { useTradingStore } from '@/lib/store/tradingStore'
import { wsPriceService } from '@/services/wsPrice'
import { wsOrderBookService } from '@/services/wsOrderBook'

/**
 * Hook to connect Binance WebSocket services to Zustand store
 */
export function useBinanceWebSocket() {
  const {
    selectedPair,
    setCurrentPrice,
    setKlineData,
    setOrderBook,
    setPriceWsConnected,
    setOrderBookWsConnected,
    updateMarketData,
  } = useTradingStore()

  const priceUnsubscribeRef = useRef<(() => void) | null>(null)
  const orderBookUnsubscribeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Subscribe to price updates
    const priceUnsubscribe = wsPriceService.onUpdate((data) => {
      if (data.type === 'kline') {
        setKlineData({
          symbol: data.data.symbol,
          open: data.data.open,
          high: data.data.high,
          low: data.data.low,
          close: data.data.close,
          volume: data.data.volume,
          timestamp: data.data.timestamp,
          isClosed: data.data.isClosed,
        })
        setCurrentPrice(data.price)
      } else if (data.type === 'connected') {
        setPriceWsConnected(data.status)
      }
    })

    priceUnsubscribeRef.current = priceUnsubscribe

    // Subscribe to order book updates
    const orderBookUnsubscribe = wsOrderBookService.onUpdate((data) => {
      if (data.type === 'snapshot' || data.type === 'update') {
        setOrderBook(data.orderBook)
      } else if (data.type === 'connected') {
        setOrderBookWsConnected(data.status)
      }
    })

    orderBookUnsubscribeRef.current = orderBookUnsubscribe

    // Start subscriptions
    wsPriceService.subscribe(selectedPair, '1m')
    wsOrderBookService.subscribe(selectedPair, 20)

    // Cleanup on unmount
    return () => {
      if (priceUnsubscribeRef.current) {
        priceUnsubscribeRef.current()
      }
      if (orderBookUnsubscribeRef.current) {
        orderBookUnsubscribeRef.current()
      }
      wsPriceService.unsubscribe()
      wsOrderBookService.unsubscribe()
    }
  }, [selectedPair, setCurrentPrice, setKlineData, setOrderBook, setPriceWsConnected, setOrderBookWsConnected])

  // Handle symbol change
  useEffect(() => {
    wsPriceService.changeSymbol(selectedPair)
    wsOrderBookService.changeSymbol(selectedPair)
  }, [selectedPair])
}

