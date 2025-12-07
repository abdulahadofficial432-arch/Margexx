"use client"

import { useState } from "react"

interface OrderBookPanelProps {
  pair: string
  currentPrice: number
}

export function OrderBookPanel({ pair, currentPrice }: OrderBookPanelProps) {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">("orderbook")

  // Mock order book data - matching the design exactly
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
    <div className="flex flex-col bg-[#131622]" style={{ fontFamily: 'Inter' }}>
      {/* Order Book Section - 185px height at top 45px */}
      <div className="absolute left-0 top-[45px] w-[240px] h-[185px] bg-[#131622] rounded-[2px]">
        {/* Header */}
        <div className="absolute left-[10px] top-[52px]">
          <div className="text-white text-[12px] font-semibold tracking-[0.12px] mb-2">
            Order Book
          </div>
          <div className="flex items-center gap-4 text-[10px] text-white font-semibold mb-1">
            <div className="text-[10px]">Price, $</div>
            <div className="text-[11px] tracking-[0.11px]">Quantity</div>
            <div className="text-[10px]">Total, $</div>
          </div>
          {/* Color indicators */}
          <div className="flex items-center gap-2">
            <div className="w-[14px] h-[4px] bg-[#FF0909]"></div>
            <div className="w-[14px] h-[4px] bg-[#FF0909]"></div>
            <div className="w-[14px] h-[4px] bg-[#49526C]"></div>
            <div className="w-[14px] h-[4px] bg-[#15FF09]"></div>
            <div className="w-[14px] h-[4px] bg-[#15FF09]"></div>
            <div className="w-[14px] h-[4px] bg-[#49526C]"></div>
          </div>
        </div>

        {/* Sell Orders (Red) with gradient backgrounds */}
        <div className="absolute inset-0 overflow-hidden">
          {sellOrders.map((order, idx) => (
            <div
              key={idx}
              className="absolute left-[8px] px-2 py-0.5 hover:bg-gray-900/30 cursor-pointer"
              style={{
                top: `${94 + idx * 17}px`,
                width: '233px',
                height: idx === 0 ? '49px' : '17px',
                background: idx === 0 
                  ? "linear-gradient(0deg, rgba(255, 0, 0, 0.20) 0%, rgba(153, 0, 0, 0.01) 100%)"
                  : `rgba(255, 0, 0, ${0.20 - idx * 0.02})`,
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

          {/* Current Price Separator - at top 231px */}
          <div className="absolute left-0 top-[231px] w-[240px] h-[23px] bg-[#131622] flex items-center justify-between px-3 border-y border-gray-800">
            <div className="text-[#34CD26] text-[12px] font-semibold tracking-[1.08px]">
              {formatPrice(currentPrice)}
            </div>
            <div className="text-[#B7B7B7] text-[12px] font-semibold tracking-[0.12px]">12</div>
          </div>

          {/* Buy Orders (Green) with gradient backgrounds */}
          {buyOrders.map((order, idx) => (
            <div
              key={idx}
              className="absolute left-[8px] px-2 py-0.5 hover:bg-gray-900/30 cursor-pointer"
              style={{
                top: `${254 + idx * 17}px`,
                width: idx < 6 ? `${233 - idx * 5}px` : '73px',
                height: '22px',
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

      {/* Buy/Sell Ratio Bar - at top 256px */}
      <div className="absolute left-[1197px] top-[256px] w-[240px] h-[166px] bg-[#131622] rounded-[2px]">
        <div className="absolute left-[7px] top-[144px] flex h-[1px] rounded-[2px] overflow-hidden mb-1 w-[221px]">
          <div className="bg-[#00FF09] h-full" style={{ width: "40%" }}></div>
          <div className="bg-[#FF0000] h-full" style={{ width: "60%" }}></div>
        </div>
        <div className="absolute left-[7px] top-[149px] flex justify-between text-[10px] w-[221px]">
          <div className="text-[#00FF08] font-semibold">Buy: 40%</div>
          <div className="text-[#F90B0B] font-semibold">Sell: 60%</div>
        </div>
      </div>

      {/* Last Trades Section - at top 426px */}
      <div className="absolute left-[1197px] top-[426px] w-[240px] h-[157px] bg-[#131622] rounded-[2px]">
        <div className="absolute left-[10px] top-[10px] text-white text-[12px] font-semibold">
          Last Trades
        </div>
        <div className="absolute left-[12px] top-[36px] flex items-center justify-between w-[216px] text-[10px] text-white font-semibold mb-2 pb-1 border-b border-gray-800">
          <div className="tracking-[0.30px]">Price, $</div>
          <div className="tracking-[0.30px]">Quantity</div>
          <div className="tracking-[0.30px]">Time</div>
        </div>
        <div className="absolute left-[12px] top-[56px]">
          {lastTrades.map((trade, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1 text-[11px] hover:bg-gray-900/30 cursor-pointer w-[216px]"
              style={{ height: idx === 0 ? '11.42px' : '12.37px' }}
            >
              <div
                className={
                  trade.type === "buy"
                    ? "text-[#34CD26] font-semibold tracking-[0.30px] text-[10px]"
                    : "text-[#D50000] font-semibold text-[11px]"
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
  )
}
