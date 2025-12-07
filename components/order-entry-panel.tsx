"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface OrderEntryPanelProps {
  pair: string
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

export function OrderEntryPanel({ pair, price, change24h, volume24h, high24h, low24h }: OrderEntryPanelProps) {
  const [orderType, setOrderType] = useState("Market")
  const [marginMode, setMarginMode] = useState("Isolated")
  const [leverage, setLeverage] = useState(60)
  const [orderSize, setOrderSize] = useState("0")
  const [orderSizeUsd, setOrderSizeUsd] = useState("0")
  const [showPairDropdown, setShowPairDropdown] = useState(false)

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num)
  }

  const formatVolume = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    }
    return `$${num.toLocaleString()}`
  }

  const buyPrice = price
  const sellPrice = price - 0.5

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Main Trade</h3>
        <div className="text-2xl font-bold text-gray-300">0.0 USDT</div>
      </div>

      {/* Trading Pair Selector */}
      <div className="mb-4 relative">
        <button
          onClick={() => setShowPairDropdown(!showPairDropdown)}
          className="w-full flex items-center justify-between px-3 py-2 bg-gray-900 rounded-lg hover:bg-gray-800"
        >
          <span className="text-lg font-semibold">{pair}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        {showPairDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-800 rounded-lg z-10">
            <button className="w-full px-3 py-2 text-left hover:bg-gray-800">BTCUSD</button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-800">ETHUSD</button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-800">SOLUSD</button>
          </div>
        )}
      </div>

      {/* Order Type Selection */}
      <div className="mb-4">
        <div className="flex gap-2">
          {["Limit", "Market", "Stop Market"].map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`flex-1 px-3 py-2 text-sm rounded ${
                orderType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Margin Mode & Leverage */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setMarginMode("Isolated")}
            className={`flex-1 px-3 py-2 text-sm rounded ${
              marginMode === "Isolated"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Isolated
          </button>
          <button
            onClick={() => setMarginMode("Cross")}
            className={`flex-1 px-3 py-2 text-sm rounded ${
              marginMode === "Cross"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Cross
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Leverage</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLeverage(Math.max(1, leverage - 1))}
              className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700"
            >
              -
            </button>
            <span className="text-sm font-semibold">{leverage}x</span>
            <button
              onClick={() => setLeverage(Math.min(100, leverage + 1))}
              className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Order Size */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mb-2 block">Order Size (Leveraged)</label>
        <div className="space-y-2">
          <Input
            type="text"
            value={orderSize}
            onChange={(e) => setOrderSize(e.target.value)}
            placeholder="0 USD"
            className="bg-gray-900 border-gray-700 text-white"
          />
          <Input
            type="text"
            value={orderSizeUsd}
            onChange={(e) => setOrderSizeUsd(e.target.value)}
            placeholder="0.0 USDT"
            className="bg-gray-900 border-gray-700 text-white"
          />
        </div>
        <div className="mt-2">
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Buy/Sell Buttons */}
      <div className="space-y-2 mb-3">
        <Button
          className="w-full bg-[#22c55e] hover:bg-[#20b855] text-white font-semibold py-6 text-base"
        >
          Buy / Market ${formatNumber(buyPrice)}
        </Button>
        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-6 text-base"
        >
          Sell / Market ${formatNumber(sellPrice)}
        </Button>
      </div>

      {/* Order Cost */}
      <div className="text-sm text-gray-400 text-center">
        Order cost (Margin) 0.0000 USDT
      </div>
    </div>
  )
}
