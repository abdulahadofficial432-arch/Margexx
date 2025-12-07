"use client"

import { useState } from "react"

interface OrderBookPanelProps {
  pair: string
  currentPrice: number
}

export function OrderBookPanel({ pair, currentPrice }: OrderBookPanelProps) {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">("orderbook")
  const [hideOtherAssets, setHideOtherAssets] = useState(false)

  // Mock order book data - updated to match image
  const sellOrders = [
    { price: 91732.0, quantity: 12.5, total: 1146650 },
    { price: 91731.5, quantity: 8.3, total: 760371.45 },
    { price: 91731.0, quantity: 15.2, total: 1392311.2 },
    { price: 91730.5, quantity: 6.7, total: 614594.35 },
    { price: 91730.0, quantity: 9.1, total: 834743 },
    { price: 91729.5, quantity: 11.4, total: 1045716.3 },
  ]

  const buyOrders = [
    { price: 91728.5, quantity: 10.2, total: 935630.7 },
    { price: 91728.0, quantity: 14.5, total: 1330056 },
    { price: 91727.5, quantity: 9.8, total: 898929.5 },
    { price: 91727.0, quantity: 12.3, total: 1128242.1 },
    { price: 91726.5, quantity: 8.7, total: 798020.55 },
    { price: 91726.0, quantity: 11.1, total: 1018158.6 },
  ]

  // Mock last trades
  const lastTrades = [
    { price: 91729, quantity: 537, time: "18:30:14", type: "buy" },
    { price: 91728.5, quantity: 234, time: "18:30:13", type: "sell" },
    { price: 91729.5, quantity: 156, time: "18:30:12", type: "buy" },
    { price: 91728, quantity: 89, time: "18:30:11", type: "sell" },
    { price: 91730, quantity: 445, time: "18:30:10", type: "buy" },
    { price: 91727.5, quantity: 123, time: "18:30:09", type: "sell" },
    { price: 91730.5, quantity: 678, time: "18:30:08", type: "buy" },
    { price: 91727, quantity: 345, time: "18:30:07", type: "sell" },
  ]

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num)
  }

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num)
  }

  const buyPercentage = 31
  const sellPercentage = 69

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("orderbook")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "orderbook"
              ? "text-white border-b-2 border-[#22c55e]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Order Book
        </button>
        <button
          onClick={() => setActiveTab("trades")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "trades"
              ? "text-white border-b-2 border-[#22c55e]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Last Trades
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "orderbook" ? (
          <div className="p-3">
            {/* Order Book Header */}
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 pb-2 border-b border-gray-800">
              <div>Price, $</div>
              <div className="text-right">Quantity</div>
              <div className="text-right">Total, $</div>
            </div>

            {/* Sell Orders (Red) */}
            <div className="mb-2">
              {sellOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-2 text-xs py-0.5 hover:bg-gray-900/50 cursor-pointer"
                >
                  <div className="text-red-500">{formatPrice(order.price)}</div>
                  <div className="text-right text-gray-300">{formatNumber(order.quantity)}</div>
                  <div className="text-right text-gray-300">
                    {formatNumber(order.total / 1000)}k
                  </div>
                </div>
              ))}
            </div>

            {/* Current Price */}
            <div className="py-2 border-y border-gray-800 my-2">
              <div className="text-center">
                <div className="text-base font-bold text-white">${formatPrice(currentPrice)}</div>
                <div className="text-xs text-gray-400 mt-1">239</div>
              </div>
            </div>

            {/* Buy Orders (Green) */}
            <div className="mb-3">
              {buyOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-2 text-xs py-0.5 hover:bg-gray-900/50 cursor-pointer"
                >
                  <div className="text-[#22c55e]">{formatPrice(order.price)}</div>
                  <div className="text-right text-gray-300">{formatNumber(order.quantity)}</div>
                  <div className="text-right text-gray-300">
                    {formatNumber(order.total / 1000)}k
                  </div>
                </div>
              ))}
            </div>

            {/* Buy/Sell Ratio Bar */}
            <div className="mb-3">
              <div className="flex h-4 rounded overflow-hidden">
                <div
                  className="bg-[#22c55e] flex items-center justify-center text-xs font-semibold"
                  style={{ width: `${buyPercentage}%` }}
                >
                  {buyPercentage}%
                </div>
                <div
                  className="bg-red-500 flex items-center justify-center text-xs font-semibold"
                  style={{ width: `${sellPercentage}%` }}
                >
                  {sellPercentage}%
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Buy: {buyPercentage}%</span>
                <span>Sell: {sellPercentage}%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3">
            {/* Last Trades Header */}
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 pb-2 border-b border-gray-800">
              <div>Price, $</div>
              <div className="text-right">Quantity</div>
              <div className="text-right">Time</div>
            </div>

            {/* Last Trades List */}
            <div>
              {lastTrades.map((trade, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-2 text-xs py-0.5 hover:bg-gray-900/50 cursor-pointer"
                >
                  <div className={trade.type === "buy" ? "text-[#22c55e]" : "text-red-500"}>
                    {formatPrice(trade.price)}
                  </div>
                  <div className="text-right text-gray-300">{trade.quantity}</div>
                  <div className="text-right text-gray-400">{trade.time}</div>
                </div>
              ))}
            </div>

            {/* Hide Other Assets Checkbox */}
            <div className="mt-4 pt-3 border-t border-gray-800">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideOtherAssets}
                  onChange={(e) => setHideOtherAssets(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-[#22c55e] focus:ring-[#22c55e]"
                />
                Hide other assets
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
