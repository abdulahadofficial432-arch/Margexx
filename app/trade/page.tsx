"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User, Settings, HelpCircle, ChevronDown, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TradingViewChart } from "@/components/trading-view-chart"
import { OrderEntryPanel } from "@/components/order-entry-panel"
import { OrderBookPanel } from "@/components/order-book-panel"
import { PositionsPanel } from "@/components/positions-panel"
import { TradingTicker } from "@/components/trading-ticker"
import { useTradingStore } from "@/lib/store/tradingStore"
import { useBinanceWebSocket } from "@/hooks/useBinanceWebSocket"

export default function TradePage() {
  const {
    selectedPair,
    currentPrice,
    priceChange24h,
    volume24h: storeVolume24h,
    high24h: storeHigh24h,
    low24h: storeLow24h,
    setSelectedPair,
  } = useTradingStore()

  // Connect to Binance WebSocket
  useBinanceWebSocket()

  // Check for API credentials
  const [showApiError, setShowApiError] = useState(false)
  
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY || ''
    const apiSecret = process.env.NEXT_PUBLIC_BINANCE_SECRET || ''
    setShowApiError(!apiKey || !apiSecret)
  }, [])

  // Initialize with BTCUSDT if not set
  useEffect(() => {
    if (!selectedPair) {
      setSelectedPair('BTCUSDT')
    }
  }, [selectedPair, setSelectedPair])

  // Use real data from store, fallback to defaults
  const price = currentPrice || 111036
  const change24h = priceChange24h || 1.37
  const vol24h = storeVolume24h || 955823256
  const high24h = storeHigh24h || 112116.5
  const low24h = storeLow24h || 107797.5
  
  // Format pair for display (BTCUSDT -> BTCUSD)
  const displayPair = selectedPair.replace('USDT', 'USD') || 'BTCUSD'

  return (
    <div className="h-screen bg-[#1E2333] text-white flex flex-col overflow-hidden relative">
      {/* API Credentials Error Banner */}
      {showApiError && (
        <div className="absolute top-2 right-2 z-50 bg-red-600 border border-red-700 rounded px-4 py-2 flex items-center gap-2 shadow-lg">
          <AlertCircle className="w-4 h-4 text-white flex-shrink-0" />
          <span className="text-white text-sm font-medium">
            API credentials not configured. Please set BINANCE_API_KEY and BINANCE_SECRET
          </span>
          <button
            onClick={() => setShowApiError(false)}
            className="ml-2 text-white hover:text-red-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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

      {/* Pair Info Bar - Above Chart */}
      <div className="h-[44px] bg-[#131622] rounded-t-[3px] relative">
        {/* Avatar Icon */}
        <div className="absolute left-[19px] top-[13px] w-[19px] h-[18px] rounded-full bg-gray-600"></div>
        
        {/* BTCUSD Text */}
        <div className="absolute left-[43px] top-[14px] text-white text-[12px] font-semibold">
          {displayPair}
        </div>
        
        {/* Dropdown Arrow */}
        <div className="absolute left-[110px] top-[25px] w-[8px] h-[5px]">
          <ChevronDown className="w-[8px] h-[5px] text-white rotate-180" />
        </div>
        
        {/* Current Price */}
        <div className="absolute left-[133px] top-[15px] text-[#F91B13] text-[12px] font-semibold tracking-[0.36px]">
          ${price.toLocaleString()}
        </div>
        
        {/* Labels Row 1 */}
        <div className="absolute left-[194px] top-[7px] text-[#B7B7B7] text-[10px] font-semibold">
          24h Change
        </div>
        <div className="absolute left-[276px] top-[7px] text-[#B7B7B7] text-[10px] font-semibold">
          24h Vol
        </div>
        <div className="absolute left-[370px] top-[7px] text-[#B7B7B7] text-[10px] font-semibold">
          High
        </div>
        <div className="absolute left-[451px] top-[7px] text-[#B7B7B7] text-[10px] font-semibold">
          Low
        </div>
        <div className="absolute left-[533px] top-[7px] text-[#B7B7B7] text-[10px] font-semibold">
          Funding
        </div>
        
        {/* Values Row 2 */}
        <div className="absolute left-[212px] top-[21px] text-[#34CD26] text-[11px] font-semibold">
          {change24h >= 0 ? "+" : ""}{change24h}%
        </div>
        <div className="absolute left-[276px] top-[21px] text-[#CFCFCF] text-[11px] font-semibold">
          ${vol24h.toLocaleString()}
        </div>
        <div className="absolute left-[370px] top-[21px] text-[#CFCFCF] text-[11px] font-semibold">
          ${high24h.toLocaleString()}
        </div>
        <div className="absolute left-[451px] top-[21px] text-[#CFCFCF] text-[11px] font-semibold">
          ${low24h.toLocaleString()}
        </div>
        <div className="absolute left-[532px] top-[22px] text-[#CFCFCF] text-[10px] font-semibold">
          04:08:14
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel: Order Entry */}
        <div className="w-[237px] border-r border-gray-800 bg-[#131622] flex-shrink-0">
          <OrderEntryPanel
            pair={displayPair}
            price={price}
            change24h={change24h}
            volume24h={vol24h}
          />
        </div>

        {/* Center Panel: Trading Chart */}
        <div className="flex-1 flex flex-col border-r border-gray-800 bg-[#131622] min-w-0 overflow-hidden" style={{ minHeight: "491px" }}>
          <TradingViewChart symbol={selectedPair || 'BTCUSDT'} />
        </div>

        {/* Right Panel: Order Book & Last Trades */}
        <div className="w-[240px] bg-[#131622] flex-shrink-0">
          <OrderBookPanel pair={displayPair} currentPrice={price} />
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
