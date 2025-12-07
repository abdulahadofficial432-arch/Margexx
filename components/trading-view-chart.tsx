"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Undo2, Redo2, Maximize2, Camera, 
  Crosshair, TrendingUp, Layers, Square, 
  Type, Zap, BarChart3, Ruler, Magnet, Lock, Trash2
} from "lucide-react"

interface TradingViewChartProps {
  symbol: string
}

export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m")

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
        interval: "1",
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

  const timeframes = ["1m", "5m", "1h", "1d"]
  const bottomTimeframes = ["5y", "1y", "3m", "1m", "5d", "1d"]

  return (
    <div className="flex flex-col h-full bg-[#0a0e27]">
      {/* Chart Header with Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        {/* Left Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 text-xs rounded ${
                  selectedTimeframe === tf
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <button className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded hover:bg-gray-700">
            fx
          </button>
          <span className="text-xs text-gray-400">Indicators</span>
          <button className="p-1 text-gray-400 hover:text-white">
            <Undo2 className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white">
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Symbol and OHLC */}
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold">{symbol} - 1 - MARGEX</h2>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>O91,708.50</span>
            <span>H91,762.50</span>
            <span>L91,708.50</span>
            <span className="text-white">C91,729.00</span>
          </div>
        </div>

        {/* Right: Drawing Tools */}
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Crosshair">
            <Crosshair className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Trend Line">
            <TrendingUp className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Fibonacci">
            <Layers className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Shapes">
            <Square className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Text">
            <Type className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Patterns">
            <Zap className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Prediction">
            <BarChart3 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Measure">
            <Ruler className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Magnet">
            <Magnet className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Lock">
            <Lock className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Settings">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Fullscreen">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Screenshot">
            <Camera className="w-4 h-4" />
          </button>
          <button className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded" title="Price Alerts">
            Price Alerts
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

      {/* Bottom Chart Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-800 bg-[#0a0e27]">
        <div className="flex items-center gap-2">
          {bottomTimeframes.map((tf) => (
            <button
              key={tf}
              className={`px-2 py-1 text-xs rounded ${
                tf === "1m"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>18:30:13 UTC</span>
          <button className="px-2 py-1 hover:bg-gray-800 rounded">%</button>
          <button className="px-2 py-1 hover:bg-gray-800 rounded">log</button>
          <button className="px-2 py-1 hover:bg-gray-800 rounded">auto</button>
        </div>
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
