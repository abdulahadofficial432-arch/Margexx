"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewChartProps {
  symbol: string
}

export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Check if TradingView is already available
    const checkTradingView = () => {
      if (window.TradingView) {
        setScriptLoaded(true)
        initializeWidget()
      } else {
        // Wait for script to load
        setTimeout(checkTradingView, 100)
      }
    }

    checkTradingView()

    return () => {
      if (widgetRef.current && widgetRef.current.remove) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }, [symbol])

  const initializeWidget = () => {
    if (!containerRef.current || !window.TradingView) return

    // Clear previous widget if exists
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }

    try {
      widgetRef.current = new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0a0e27",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: containerRef.current.id,
        studies: [
          "Volume@tv-basicstudies",
        ],
        width: "100%",
        height: "100%",
      })
    } catch (error) {
      console.error("Error initializing TradingView widget:", error)
    }
  }

  // Re-initialize when script loads
  useEffect(() => {
    if (scriptLoaded && containerRef.current) {
      initializeWidget()
    }
  }, [scriptLoaded, symbol])

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">{symbol} - 1 - MARGEX</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>O: 91,200.00</span>
            <span>H: 91,611.50</span>
            <span>L: 87,863.00</span>
            <span>C: 91,583.50</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded">
            1m
          </button>
          <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded">
            5m
          </button>
          <button className="px-3 py-1 text-xs bg-[#22c55e] rounded">
            1h
          </button>
          <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded">
            1d
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 relative min-h-[500px]">
        <div
          id={`tradingview_${symbol}`}
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}

// Extend Window interface for TradingView
declare global {
  interface Window {
    TradingView: any
  }
}

