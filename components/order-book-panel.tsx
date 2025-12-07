"use client"

import { useState } from "react"

interface OrderBookPanelProps {
  pair: string
  currentPrice: number
}

export function OrderBookPanel({ pair, currentPrice }: OrderBookPanelProps) {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">("orderbook")

  // Mock order book data
  const sellOrders = [
    { price: 91575.0, quantity: 12.5, total: 1144687.5 },
    { price: 91574.5, quantity: 8.3, total: 759668.35 },
    { price: 91574.0, quantity: 15.2, total: 1391924.8 },
    { price: 91573.5, quantity: 6.7, total: 613542.45 },
    { price: 91573.0, quantity: 9.1, total: 833314.3 },
    { price: 91572.5, quantity: 11.4, total: 1043926.5 },
    { price: 91572.0, quantity: 7.8, total: 714261.6 },
    { price: 91571.5, quantity: 13.6, total: 1245372.4 },
  ]

  const buyOrders = [
    { price: 91579.0, quantity: 10.2, total: 934105.8 },
    { price: 91579.5, quantity: 14.5, total: 1327902.75 },
    { price: 91580.0, quantity: 9.8, total: 897484.0 },
    { price: 91580.5, quantity: 12.3, total: 1126440.15 },
    { price: 91581.0, quantity: 8.7, total: 796754.7 },
    { price: 91581.5, quantity: 11.1, total: 1016554.65 },
    { price: 91582.0, quantity: 6.4, total: 586124.8 },
    { price: 91582.5, quantity: 15.9, total: 1456061.75 },
  ]

  // Mock last trades
  const lastTrades = [
    { price: 91583.5, quantity: 36, time: "18:17:11", type: "buy" },
    { price: 91583.0, quantity: 12, time: "18:17:08", type: "sell" },
    { price: 91584.0, quantity: 25, time: "18:17:05", type: "buy" },
    { price: 91582.5, quantity: 8, time: "18:17:02", type: "sell" },
    { price: 91585.0, quantity: 45, time: "18:16:59", type: "buy" },
    { price: 91581.0, quantity: 19, time: "18:16:56", type: "sell" },
    { price: 91586.0, quantity: 32, time: "18:16:53", type: "buy" },
    { price: 91580.5, quantity: 14, time: "18:16:50", type: "sell" },
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
          <div className="p-4">
            {/* Order Book Header */}
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 pb-2 border-b border-gray-800">
              <div>Price, $</div>
              <div className="text-right">Quantity</div>
              <div className="text-right">Total, $</div>
            </div>

            {/* Sell Orders (Red) */}
            <div className="mb-4">
              {sellOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-gray-900/50 cursor-pointer"
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
            <div className="py-3 border-y border-gray-800 my-2">
              <div className="text-center">
                <div className="text-lg font-bold text-white">${formatPrice(currentPrice)}</div>
                <div className="text-xs text-gray-400 mt-1">Buy: 35% / Sell: 65%</div>
              </div>
            </div>

            {/* Buy Orders (Green) */}
            <div>
              {buyOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-gray-900/50 cursor-pointer"
                >
                  <div className="text-[#22c55e]">{formatPrice(order.price)}</div>
                  <div className="text-right text-gray-300">{formatNumber(order.quantity)}</div>
                  <div className="text-right text-gray-300">
                    {formatNumber(order.total / 1000)}k
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
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
                  className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-gray-900/50 cursor-pointer"
                >
                  <div className={trade.type === "buy" ? "text-[#22c55e]" : "text-red-500"}>
                    {formatPrice(trade.price)}
                  </div>
                  <div className="text-right text-gray-300">{trade.quantity}</div>
                  <div className="text-right text-gray-400">{trade.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

