"use client"

import { useState } from "react"

interface OrderBookPanelProps {
  pair: string
  currentPrice: number
}

export function OrderBookPanel({ pair, currentPrice }: OrderBookPanelProps) {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">("orderbook")

  // Mock order book data - matching the design
  const sellOrders = [
    { price: 111045.5, quantity: 11925, total: 10789300 },
    { price: 111045, quantity: 11925, total: 10789300 },
    { price: 111045.5, quantity: 11925, total: 10789300 },
    { price: 111045, quantity: 11925, total: 10789300 },
    { price: 111045.5, quantity: 11925, total: 10789300 },
    { price: 111045, quantity: 11925, total: 10789300 },
    { price: 111045.5, quantity: 11925, total: 10789300 },
    { price: 111045, quantity: 11925, total: 10789300 },
    { price: 111045.5, quantity: 11925, total: 10789300 },
  ]

  const buyOrders = [
    { price: 111045, quantity: 11045, total: 11045 },
    { price: 111045, quantity: 11045, total: 11045 },
    { price: 111045, quantity: 111045, total: 111045 },
    { price: 111045, quantity: 111045, total: 111045 },
    { price: 111045, quantity: 111045, total: 111045 },
    { price: 111045, quantity: 111045, total: 111045 },
    { price: 1111045, quantity: 1111045, total: 1111045 },
    { price: 1111045, quantity: 1111045, total: 1111045 },
    { price: 1111045, quantity: 1111045, total: 1111045 },
  ]

  // Mock last trades
  const lastTrades = [
    { price: 111034, quantity: 359, time: "19:51:45", type: "buy" },
    { price: 111033.5, quantity: 20, time: "19:51:44", type: "sell" },
    { price: 111034.5, quantity: 16, time: "19:51:45", type: "sell" },
    { price: 111032.5, quantity: 13, time: "19:51:45", type: "sell" },
    { price: 111034, quantity: 123, time: "19:51:42", type: "buy" },
    { price: 111034, quantity: 567, time: "19:51:41", type: "buy" },
  ]

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num)
  }

  return (
    <div className="flex flex-col h-full bg-[#131622]">
      {activeTab === "orderbook" ? (
        <>
          {/* Order Book Header */}
          <div className="px-3 py-2 border-b border-gray-800">
            <div className="text-white text-[12px] font-semibold tracking-[0.12px] mb-2">
              Order Book
            </div>
            <div className="flex items-center gap-4 text-[10px] text-white font-semibold">
              <div className="text-[11px] tracking-[0.11px]">Quantity</div>
              <div className="text-[10px]">Total, $</div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-[14px] h-[4px] bg-[#FF0909]"></div>
              <div className="w-[14px] h-[4px] bg-[#FF0909]"></div>
              <div className="w-[14px] h-[4px] bg-[#49526C]"></div>
              <div className="w-[14px] h-[4px] bg-[#15FF09]"></div>
              <div className="w-[14px] h-[4px] bg-[#15FF09]"></div>
              <div className="w-[14px] h-[4px] bg-[#49526C]"></div>
            </div>
          </div>

          {/* Sell Orders (Red) with gradient backgrounds */}
          <div className="flex-1 overflow-y-auto relative">
            <div className="absolute inset-0">
              {sellOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="relative px-3 py-0.5 hover:bg-gray-900/30 cursor-pointer"
                  style={{
                    background: idx === 0 
                      ? "linear-gradient(0deg, rgba(255, 0, 0, 0.20) 0%, rgba(153, 0, 0, 0.01) 100%)"
                      : idx < 9
                      ? `rgba(255, 0, 0, ${0.20 - idx * 0.02})`
                      : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="text-[#D50000] font-semibold">{formatPrice(order.price)}</div>
                    <div className="text-white font-semibold">{formatNumber(order.quantity)}</div>
                    <div className="text-white text-[10px] font-semibold">
                      {formatNumber(order.total)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Current Price Separator */}
              <div className="h-[23px] bg-[#131622] flex items-center justify-between px-3 border-y border-gray-800">
                <div className="text-[#34CD26] text-[12px] font-semibold tracking-[1.08px]">
                  {formatPrice(currentPrice)}
                </div>
                <div className="text-[#B7B7B7] text-[12px] font-semibold tracking-[0.12px]">12</div>
              </div>

              {/* Buy Orders (Green) with gradient backgrounds */}
              {buyOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="relative px-3 py-0.5 hover:bg-gray-900/30 cursor-pointer"
                  style={{
                    background: idx < 6
                      ? `rgba(13, 255, 0, ${0.20 - idx * 0.03})`
                      : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="text-[#34CD26] font-semibold">{formatPrice(order.price)}</div>
                    <div className="text-white font-semibold">{formatNumber(order.quantity)}</div>
                    <div className="text-white text-[10px] font-semibold">
                      {formatNumber(order.total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buy/Sell Ratio Bar */}
          <div className="px-3 py-2 border-t border-gray-800">
            <div className="flex h-[1px] rounded-[2px] overflow-hidden mb-1">
              <div className="bg-[#00FF09] flex-1" style={{ width: "40%" }}></div>
              <div className="bg-[#FF0000] flex-1" style={{ width: "60%" }}></div>
            </div>
            <div className="flex justify-between text-[10px]">
              <div className="text-[#00FF08] font-semibold">Buy: 40%</div>
              <div className="text-[#F90B0B] font-semibold">Sell: 60%</div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="px-3 py-2 border-b border-gray-800">
            <div className="text-white text-[12px] font-semibold">Last Trades</div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <div className="flex items-center justify-between text-[10px] text-white font-semibold mb-2 pb-1 border-b border-gray-800">
              <div className="tracking-[0.30px]">Price, $</div>
              <div className="tracking-[0.30px]">Quantity</div>
              <div className="tracking-[0.30px]">Time</div>
            </div>
            <div>
              {lastTrades.map((trade, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1 text-[11px] hover:bg-gray-900/30 cursor-pointer"
                >
                  <div
                    className={
                      trade.type === "buy"
                        ? "text-[#34CD26] font-semibold tracking-[0.30px]"
                        : "text-[#D50000] font-semibold"
                    }
                  >
                    {formatPrice(trade.price)}
                  </div>
                  <div className="text-white font-semibold">{trade.quantity}</div>
                  <div className="text-white font-semibold">{trade.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-t border-gray-800">
        <button
          onClick={() => setActiveTab("orderbook")}
          className={`flex-1 px-3 py-2 text-[10px] font-semibold ${
            activeTab === "orderbook"
              ? "text-[#3179FF] border-b-2 border-[#3179FF]"
              : "text-[#E1E2E3] hover:text-white"
          }`}
        >
          Order Book
        </button>
        <button
          onClick={() => setActiveTab("trades")}
          className={`flex-1 px-3 py-2 text-[10px] font-semibold ${
            activeTab === "trades"
              ? "text-[#3179FF] border-b-2 border-[#3179FF]"
              : "text-[#E1E2E3] hover:text-white"
          }`}
        >
          Last Trades
        </button>
      </div>
    </div>
  )
}
