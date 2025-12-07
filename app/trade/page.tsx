"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TradingViewChart } from "@/components/trading-view-chart"
import { OrderEntryPanel } from "@/components/order-entry-panel"
import { OrderBookPanel } from "@/components/order-book-panel"
import { PositionsPanel } from "@/components/positions-panel"
import { TradingTicker } from "@/components/trading-ticker"

export default function TradePage() {
  const [selectedPair, setSelectedPair] = useState("BTCUSD")
  const [price, setPrice] = useState(91729)
  const [change24h, setChange24h] = useState(2.04)
  const [volume24h, setVolume24h] = useState(415938489)
  const [high24h, setHigh24h] = useState(91843.5)
  const [low24h, setLow24h] = useState(87863)

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => prev + (Math.random() - 0.5) * 50)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    }
    return `$${num.toLocaleString()}`
  }

  return (
    <div className="h-screen bg-[#0a0e27] text-white flex flex-col overflow-hidden">
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
              <Link href="/trade" className="text-blue-500 font-semibold">
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
          <div className="flex items-center gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5">
              Deposit
            </Button>
            <button className="text-gray-400 hover:text-white p-2">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white p-2">
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white p-2">
              <Settings className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white p-2">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pair Info Bar */}
        <div className="border-t border-gray-800 px-4 py-2 bg-[#0f1422]">
          <div className="flex items-center gap-6 text-sm">
            <div className="font-semibold">{selectedPair}</div>
            <div className="text-lg font-bold">${price.toLocaleString()}</div>
            <div className={`text-sm ${change24h >= 0 ? "text-[#22c55e]" : "text-red-500"}`}>
              24h Change {change24h >= 0 ? "+" : ""}{change24h}%
            </div>
            <div className="text-gray-400 text-sm">
              24h Vol {formatNumber(volume24h)}
            </div>
            <div className="text-gray-400 text-sm">
              High ${high24h.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">
              Low ${low24h.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">
              Funding 05:29:45
            </div>
          </div>
        </div>
      </header>

      {/* Main Trading Interface */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden min-h-0">
          {/* Left Panel: Order Entry */}
          <div className="col-span-12 lg:col-span-3 border-r border-gray-800 bg-[#0f1422] flex flex-col">
            <OrderEntryPanel
              pair={selectedPair}
              price={price}
              change24h={change24h}
              volume24h={volume24h}
              high24h={high24h}
              low24h={low24h}
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

