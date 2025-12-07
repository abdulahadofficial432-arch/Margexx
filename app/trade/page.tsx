"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User, Wallet, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TradingViewChart } from "@/components/trading-view-chart"
import { OrderEntryPanel } from "@/components/order-entry-panel"
import { OrderBookPanel } from "@/components/order-book-panel"
import { PositionsPanel } from "@/components/positions-panel"
import { TradingTicker } from "@/components/trading-ticker"

export default function TradePage() {
  const [selectedPair, setSelectedPair] = useState("BTCUSD")
  const [price, setPrice] = useState(91583.5)
  const [change24h, setChange24h] = useState(1.90)
  const [volume24h, setVolume24h] = useState(408007294)

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => prev + (Math.random() - 0.5) * 100)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-gray-800 bg-[#0a0e27]">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#22c55e] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="text-white font-bold text-lg">MARGEX</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/buy-crypto" className="text-gray-400 hover:text-white transition-colors">
                Buy Crypto
              </Link>
              <Link href="/trade" className="text-white font-semibold">
                Trade
              </Link>
              <Link href="/copy-trading" className="text-gray-400 hover:text-white transition-colors">
                Copy trading
              </Link>
              <Link href="/convert" className="text-gray-400 hover:text-white transition-colors">
                Convert
              </Link>
              <Link href="/wallet" className="text-gray-400 hover:text-white transition-colors">
                Wallet
              </Link>
              <Link href="/referral" className="text-gray-400 hover:text-white transition-colors">
                Referral
              </Link>
            </nav>
          </div>

          {/* Center: Search */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-1.5 flex-1 max-w-md mx-8">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search markets..."
              className="bg-transparent border-none outline-none text-sm text-white flex-1"
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button className="bg-[#22c55e] hover:bg-[#20b855] text-white text-sm px-4 py-1.5">
              Deposit
            </Button>
            <button className="text-gray-400 hover:text-white p-2">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white p-2">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Trading Interface */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
          {/* Left Panel: Order Entry */}
          <div className="col-span-12 lg:col-span-3 border-r border-gray-800 bg-[#0f1422] flex flex-col">
            <OrderEntryPanel
              pair={selectedPair}
              price={price}
              change24h={change24h}
              volume24h={volume24h}
            />
          </div>

          {/* Center Panel: Trading Chart */}
          <div className="col-span-12 lg:col-span-6 flex flex-col border-r border-gray-800 bg-[#0a0e27]">
            <TradingViewChart symbol={selectedPair} />
          </div>

          {/* Right Panel: Order Book & Last Trades */}
          <div className="col-span-12 lg:col-span-3 bg-[#0f1422] flex flex-col">
            <OrderBookPanel pair={selectedPair} currentPrice={price} />
          </div>
        </div>

        {/* Bottom Panel: Positions & Orders */}
        <div className="border-t border-gray-800 bg-[#0f1422]">
          <PositionsPanel />
        </div>
      </div>

      {/* Bottom Ticker */}
      <TradingTicker />
    </div>
  )
}

