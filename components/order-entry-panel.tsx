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
}

export function OrderEntryPanel({ pair, price, change24h, volume24h }: OrderEntryPanelProps) {
  const [orderType, setOrderType] = useState("Market")
  const [marginMode, setMarginMode] = useState("Isolated")
  const [leverage, setLeverage] = useState(60)
  const [orderSize, setOrderSize] = useState("0")
  const [orderSizeUsd, setOrderSizeUsd] = useState("0")

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const formatVolume = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    }
    return `$${num.toLocaleString()}`
  }

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Main Trade</h3>
        <div className="text-2xl font-bold text-gray-300">0.0 USDT</div>
      </div>

      {/* Trading Pair Info */}
      <div className="mb-6 p-3 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">{pair}</span>
          <span className={`text-sm ${change24h >= 0 ? "text-[#22c55e]" : "text-red-500"}`}>
            {change24h >= 0 ? "+" : ""}{change24h}%
          </span>
        </div>
        <div className="text-2xl font-bold mb-1">${formatNumber(price)}</div>
        <div className="text-xs text-gray-400 space-y-1">
          <div>24h Volume: {formatVolume(volume24h)}</div>
          <div>24h High: ${formatNumber(91611.5)}</div>
          <div>24h Low: ${formatNumber(87863)}</div>
          <div>Funding Time: 05:42:49</div>
        </div>
      </div>

      {/* Order Type Selection */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          {["Limit", "Market", "Stop Market"].map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`flex-1 px-3 py-2 text-sm rounded ${
                orderType === type
                  ? "bg-[#22c55e] text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Margin Mode */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setMarginMode("Isolated")}
            className={`flex-1 px-3 py-2 text-sm rounded ${
              marginMode === "Isolated"
                ? "bg-[#22c55e] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Isolated
          </button>
          <button
            onClick={() => setMarginMode("Cross")}
            className={`flex-1 px-3 py-2 text-sm rounded ${
              marginMode === "Cross"
                ? "bg-[#22c55e] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Cross
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">Leverage</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLeverage(Math.max(1, leverage - 1))}
              className="px-2 py-1 bg-gray-800 rounded text-sm"
            >
              -
            </button>
            <span className="text-sm font-semibold">{leverage}x</span>
            <button
              onClick={() => setLeverage(Math.min(100, leverage + 1))}
              className="px-2 py-1 bg-gray-800 rounded text-sm"
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
      <div className="space-y-2">
        <Button
          className="w-full bg-[#22c55e] hover:bg-[#20b855] text-white font-semibold py-6"
        >
          Buy / Market
        </Button>
        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-6"
        >
          Sell / Market
        </Button>
      </div>
    </div>
  )
}

