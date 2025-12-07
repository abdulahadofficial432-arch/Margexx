"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User, Settings, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    <div className="h-screen bg-[#1E2333] text-white flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-[40px] bg-[#131622] border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-full">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center gap-6">
            <div className="w-[85px] h-[19px] rounded-[1px] bg-gray-700"></div>
            
            <nav className="hidden md:flex items-center gap-6 text-[12px] font-semibold">
              <Link href="/buy-crypto" className="text-[#7A849D] hover:text-white transition-colors">
                Buy Crypto
              </Link>
              <Link href="/trade" className="text-[#3179FF]">
                Trade
              </Link>
              <Link href="/copy-trading" className="text-[#7A849D] hover:text-white transition-colors">
                Copy trading
              </Link>
              <Link href="/convert" className="text-[#7A849D] hover:text-white transition-colors">
                Convert
              </Link>
              <Link href="/wallet" className="text-[#7A849D] hover:text-white transition-colors">
                Wallet
              </Link>
              <Link href="/referral" className="text-[#7A849D] hover:text-white transition-colors">
                Referral
              </Link>
            </nav>
          </div>

          {/* Center: Search */}
          <div className="hidden lg:flex items-center gap-2 bg-[#1E2333] rounded-[2px] px-3 py-1.5 w-[115px] h-[27px]">
            <div className="w-[10.8px] h-[10.8px] bg-[#9398A4]"></div>
            <span className="text-[#9398A4] text-[12px] font-semibold">Search</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button className="bg-[#3179FF] hover:bg-[#2563eb] text-white text-[12px] font-semibold px-4 py-1.5 h-[27px] rounded-[2px]">
              Deposit
            </Button>
            <button className="text-[#7A849D] hover:text-white p-2">
              <Bell className="w-4 h-4" />
            </button>
            <button className="text-[#7A849D] hover:text-white p-2">
              <User className="w-4 h-4" />
            </button>
            <button className="text-[#7A849D] hover:text-white p-2">
              <Settings className="w-4 h-4" />
            </button>
            <button className="text-[#7A849D] hover:text-white p-2">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Pair Info Bar */}
      <div className="h-[44px] bg-[#131622] border-b border-gray-800 px-6 flex items-center gap-6">
        <div className="w-[19px] h-[18px] rounded-full bg-gray-600"></div>
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
        <ChevronDown className="w-4 h-4 text-white ml-auto" />
      </div>

      {/* Main Trading Interface */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel: Order Entry */}
        <div className="w-[237px] border-r border-gray-800 bg-[#131622] flex-shrink-0">
          <OrderEntryPanel
            pair={selectedPair}
            price={price}
            change24h={change24h}
            volume24h={volume24h}
          />
        </div>

        {/* Center Panel: Trading Chart */}
        <div className="flex-1 flex flex-col border-r border-gray-800 bg-[#131622] min-w-0">
          <TradingViewChart symbol={selectedPair} />
        </div>

        {/* Right Panel: Order Book & Last Trades */}
        <div className="w-[240px] bg-[#131622] flex-shrink-0">
          <OrderBookPanel pair={selectedPair} currentPrice={price} />
        </div>
      </div>

      {/* Bottom Panel: Positions & Orders */}
      <div className="h-[172px] bg-[#131622] border-t border-gray-800">
        <PositionsPanel />
      </div>

      {/* Bottom Ticker */}
      <TradingTicker />
    </div>
  )
}
