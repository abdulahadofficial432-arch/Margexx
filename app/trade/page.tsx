"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { TradingViewChart } from "@/components/trading-view-chart"
import { OrderEntryPanel } from "@/components/order-entry-panel"
import { OrderBookPanel } from "@/components/order-book-panel"
import { PositionsPanel } from "@/components/positions-panel"
import { TradingTicker } from "@/components/trading-ticker"

export default function TradePage() {
  const [selectedPair, setSelectedPair] = useState("BTCUSD")
  const [price, setPrice] = useState(111036)
  const [change24h, setChange24h] = useState(1.37)
  const [volume24h, setVolume24h] = useState(955823256)
  const [high24h, setHigh24h] = useState(112116.5)
  const [low24h, setLow24h] = useState(107797.5)

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => prev + (Math.random() - 0.5) * 10)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden" style={{ fontFamily: 'Inter' }}>
      {/* Main Container */}
      <div className="absolute inset-0 bg-[#1E2333]">
        {/* Top Navigation Bar - 40px height */}
        <header className="absolute top-0 left-0 w-full h-[40px] bg-[#131622] flex items-center justify-between px-4">
          {/* Logo */}
          <div className="w-[85px] h-[19px] rounded-[1px] bg-gray-700"></div>
          
          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/buy-crypto" className="text-[#7A849D] text-[12px] font-semibold">
              Buy Crypto
            </Link>
            <Link href="/trade" className="text-[#3179FF] text-[12px] font-semibold">
              Trade
            </Link>
            <Link href="/copy-trading" className="text-[#7A849D] text-[12px] font-semibold">
              Copy trading
            </Link>
            <Link href="/convert" className="text-[#7A849D] text-[12px] font-semibold">
              Convert
            </Link>
            <Link href="/wallet" className="text-[#7A849D] text-[12px] font-semibold tracking-[0.36px]">
              Wallet
            </Link>
            <Link href="/referral" className="text-[#7A849D] text-[12px] font-semibold">
              Referral
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="w-[115px] h-[27px] bg-[#1E2333] rounded-[2px] flex items-center gap-2 px-2">
              <div className="w-[10.8px] h-[10.8px] bg-[#9398A4]"></div>
              <span className="text-[#9398A4] text-[12px] font-semibold">Search</span>
            </div>
            
            {/* Deposit Button */}
            <button className="w-[65px] h-[27px] bg-[#3179FF] rounded-[2px] text-white text-[12px] font-semibold">
              Deposit
            </button>
            
            {/* Icons */}
            <div className="flex items-center gap-2">
              <div className="w-[17px] h-[17.63px] bg-[#7A849D]"></div>
              <div className="w-[15px] h-[16.59px] bg-[#7A849D]"></div>
              <div className="w-[17px] h-[16.59px] bg-[#7A849D]"></div>
              <div className="w-[11px] h-[17.63px] bg-[#7A849D]"></div>
              <div className="flex flex-col gap-1">
                <div className="w-[6px] h-[6.22px] bg-[#7A849D]"></div>
                <div className="w-[6px] h-[6.22px] bg-[#7A849D]"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Pair Info Bar - 44px height, at top 45px */}
        <div className="absolute left-0 top-[45px] w-full h-[44px] bg-[#131622] rounded-t-[3px] flex items-center gap-6 px-6">
          <div className="w-[19px] h-[18.14px] rounded-full bg-gray-600"></div>
          <div className="text-white text-[12px] font-semibold">{selectedPair}</div>
          <div className="text-[#F91B13] text-[12px] font-semibold tracking-[0.36px]">
            ${price.toLocaleString()}
          </div>
          <div className="text-[#B7B7B7] text-[10px] font-semibold">24h Change</div>
          <div className="text-[#34CD26] text-[11px] font-semibold">
            {change24h >= 0 ? "+" : ""}{change24h}%
          </div>
          <div className="text-[#B7B7B7] text-[10px] font-semibold">24h Vol</div>
          <div className="text-[#CFCFCF] text-[11px] font-semibold">
            ${(volume24h / 1000000).toFixed(0)}M
          </div>
          <div className="text-[#B7B7B7] text-[10px] font-semibold">High</div>
          <div className="text-[#CFCFCF] text-[11px] font-semibold">${high24h.toLocaleString()}</div>
          <div className="text-[#B7B7B7] text-[10px] font-semibold">Low</div>
          <div className="text-[#CFCFCF] text-[11px] font-semibold">${low24h.toLocaleString()}</div>
          <div className="text-[#B7B7B7] text-[10px] font-semibold">Funding</div>
          <div className="text-[#CFCFCF] text-[10px] font-semibold">04:08:14</div>
          <Image
            src="/Assets/Drop Arrow.png"
            alt="Dropdown"
            width={8}
            height={5}
            className="ml-auto"
          />
        </div>

        {/* Left Panel: Order Entry - 237px width, at top 93px */}
        <div className="absolute left-[4px] top-[93px] w-[237px] h-[491px] bg-[#131622] rounded-[2px]">
          <OrderEntryPanel
            pair={selectedPair}
            price={price}
            change24h={change24h}
            volume24h={volume24h}
          />
        </div>

        {/* Center Panel: Trading Chart - 948px width, at left 246px, top 93px */}
        <div className="absolute left-[246px] top-[93px] w-[948px] h-[491px] bg-[#131622] rounded-[2px]">
          <TradingViewChart symbol={selectedPair} />
        </div>

        {/* Right Panel: Order Book & Last Trades - 240px width, at left 1197px, top 45px */}
        <div className="absolute left-[1197px] top-[45px] w-[240px]">
          <OrderBookPanel pair={selectedPair} currentPrice={price} />
        </div>

        {/* Bottom Panel: Positions & Orders - 1434px width, at left 3px, top 587px */}
        <div className="absolute left-[3px] top-[587px] w-[1434px] h-[172px] bg-[#131622] rounded-[4px]">
          <PositionsPanel />
        </div>

        {/* Bottom Ticker - 1440px width, at top 763px */}
        <div className="absolute left-0 top-[763px] w-full h-[21px] bg-[#131622]">
          <TradingTicker />
        </div>
      </div>
    </div>
  )
}
