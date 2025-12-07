"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

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
    <div className="w-full h-full flex items-center justify-between px-4" style={{ fontFamily: 'Inter' }}>
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <div className="w-[14.7px] h-[7.38px] bg-[#07B823] transform rotate-[49deg]"></div>
          <span className="text-[#07B823] text-[10px] font-semibold tracking-[0.20px]">Connection</span>
        </div>
        <span className="text-[#B7B7B7] text-[10px] font-semibold">{currentTime} UTC</span>
        <span className="text-[#B7B7B7] text-[10px] font-semibold">New listings</span>

        {/* Ticker Items with separators */}
        {tickers.map((ticker, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-[#B7B7B7] text-[10px] font-semibold">${formatPrice(ticker.price)}</span>
            <span className="text-[#B7B7B7] text-[10px] font-semibold">{ticker.symbol}</span>
            {ticker.change !== 0 && (
              <span
                className={`text-[10px] font-semibold ${
                  ticker.change >= 0 ? "text-[#34CD26]" : ticker.change === -1.47 ? "text-[#FD0000]" : "text-[#FF0000]"
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

      {/* Right Side Icons and Links */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <div className="w-[13px] h-[10.37px] bg-[#7A849D]"></div>
        <div className="w-[12px] h-[11.41px] bg-[#7A849D]"></div>
        <div className="w-[12px] h-[8.30px] bg-[#7A849D]"></div>
        <div className="w-[12px] h-[10.37px] bg-[#7A849D]"></div>
        
        {/* Text Links */}
        <span className="text-white text-[10px] font-semibold">Live chat</span>
        <span className="text-white text-[10px] font-semibold">Help Center</span>
        <span className="text-white text-[10px] font-semibold">Tutorials</span>
        <span className="text-white text-[10px] font-semibold">Guides</span>
        
        {/* Social Icons */}
        <div className="flex items-center gap-1">
          <div className="w-[11px] h-[11.41px] bg-black"></div>
          <div className="w-[11px] h-[10.34px] bg-[#757575]"></div>
        </div>
        <div className="w-[13px] h-[13px] bg-gradient-to-b from-[#2AABEE] to-[#229ED9] relative">
          <div className="absolute left-[3px] top-[2px] w-[7px] h-[5px] bg-white"></div>
        </div>
        <div className="w-[13px] h-[12.44px] bg-[#0088CE]"></div>
      </div>
    </div>
  )
}
