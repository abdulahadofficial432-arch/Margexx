"use client"

import { useState, useEffect } from "react"
import { MessageCircle, HelpCircle, GraduationCap, BookOpen, X } from "lucide-react"

export function TradingTicker() {
  const [currentTime, setCurrentTime] = useState("10:58:40")

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
    { symbol: "ALGO/USD", change: -1.47, price: 0.01581 },
    { symbol: "1KBONK/USD", change: -3.35, price: 0.2275 },
    { symbol: "JASMY/USD", change: -1.60, price: 0.01989 },
    { symbol: "ICP/USD", change: -0.56, price: 0.01411 },
    { symbol: "1KFLOKI/USDT", change: 0, price: 4.756 },
  ]

  const formatPrice = (price: number) => {
    if (price < 1) {
      return price.toFixed(5)
    }
    if (price < 100) {
      return price.toFixed(3)
    }
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return (
    <div className="h-[21px] bg-[#131622] border-t border-gray-800 px-4 flex items-center justify-between text-[10px] font-semibold">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <div className="w-[14.7px] h-[7.38px] bg-[#07B823] transform rotate-[49deg]"></div>
          <span className="text-[#07B823] tracking-[0.20px]">Connection</span>
        </div>
        <span className="text-[#B7B7B7]">{currentTime} UTC</span>
        <span className="text-[#B7B7B7]">New listings</span>

        {/* Ticker Items */}
        {tickers.map((ticker, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-[#B7B7B7]">${formatPrice(ticker.price)}</span>
            <span className="text-[#B7B7B7]">{ticker.symbol}</span>
            {ticker.change !== 0 && (
              <span
                className={`font-semibold ${
                  ticker.change >= 0 ? "text-[#34CD26]" : "text-[#FF0000]"
                }`}
              >
                {ticker.change >= 0 ? "+" : ""}
                {ticker.change.toFixed(2)}%
              </span>
            )}
            {idx < tickers.length - 1 && (
              <div className="w-[1px] h-[15px] bg-[#B7B7B7]"></div>
            )}
          </div>
        ))}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <button className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          <span>Live chat</span>
        </button>
        <button className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
          <HelpCircle className="w-3 h-3" />
          <span>Help Center</span>
        </button>
        <button className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
          <GraduationCap className="w-3 h-3" />
          <span>Tutorials</span>
        </button>
        <button className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          <span>Guides</span>
        </button>
        <button className="text-white hover:text-gray-300 transition-colors">
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
