"use client"

import { useState, useEffect } from "react"
import { X, MessageCircle, HelpCircle, BookOpen, GraduationCap } from "lucide-react"

export function TradingTicker() {
  const [currentTime, setCurrentTime] = useState("18:30:13")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getUTCHours().toString().padStart(2, "0")
      const minutes = now.getUTCMinutes().toString().padStart(2, "0")
      const seconds = now.getUTCSeconds().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const tickers = [
    { symbol: "ISD", change: 1.81, price: 0.003091 },
    { symbol: "HBAR/USD", change: 1.38, price: 0.13546 },
    { symbol: "FARTCOIN/USD", change: 2.38, price: 0.3958 },
    { symbol: "ASTER/USD", change: -3.03, price: 0.9554 },
    { symbol: "HYPE/USD", change: -5.74, price: 29.651 },
    { symbol: "PUN", change: 0, price: 0 },
    { symbol: "BTC/USD", change: 2.04, price: 91729 },
    { symbol: "ETH/USD", change: 0.16, price: 3053.25 },
    { symbol: "SOL/USD", change: 2.45, price: 133.75 },
    { symbol: "ADA/USD", change: -1.23, price: 0.4285 },
    { symbol: "BNB/USD", change: 0.01, price: 613.9 },
    { symbol: "LTC/USD", change: 0.02, price: 160.41 },
  ]

  const formatPrice = (price: number) => {
    if (price === 0) return ""
    if (price < 1) {
      return price.toFixed(4)
    }
    if (price < 100) {
      return price.toFixed(2)
    }
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return (
    <div className="bg-[#0a0e27] border-t border-gray-800 py-2 px-4">
      <div className="flex items-center justify-between text-xs">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          {/* Connection Status */}
          <div className="flex items-center gap-2 text-gray-400">
            <span>Connection {currentTime} UTC</span>
          </div>

          {/* New Listings */}
          <div className="text-gray-400">
            <span className="text-[#22c55e]">New listings</span>
          </div>

          {/* Scrolling Ticker */}
          <div className="flex items-center gap-6 overflow-x-auto flex-1 min-w-0">
            {tickers.map((ticker, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-gray-300 font-medium">{ticker.symbol}</span>
                {ticker.price > 0 && (
                  <>
                    <span
                      className={`font-semibold ${
                        ticker.change >= 0 ? "text-[#22c55e]" : "text-red-500"
                      }`}
                    >
                      {ticker.change >= 0 ? "+" : ""}
                      {ticker.change.toFixed(2)}%
                    </span>
                    <span className="text-gray-400">${formatPrice(ticker.price)}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 ml-4">
          <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">Live chat</span>
          </button>
          <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs">Help Center</span>
          </button>
          <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <GraduationCap className="w-4 h-4" />
            <span className="text-xs">Tutorials</span>
          </button>
          <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs">Guides</span>
          </button>
          <button className="text-gray-400 hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
