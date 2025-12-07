"use client"

import { useState } from "react"
import Image from "next/image"

interface OrderEntryPanelProps {
  pair: string
  price: number
  change24h: number
  volume24h: number
}

export function OrderEntryPanel({ pair, price, change24h, volume24h }: OrderEntryPanelProps) {
  const [orderType, setOrderType] = useState("Limit")
  const [marginMode, setMarginMode] = useState("Isolated")
  const [leverage, setLeverage] = useState(60)
  const [orderSize, setOrderSize] = useState("0")
  const [limitPrice, setLimitPrice] = useState("111035.5")
  const [sliderValue, setSliderValue] = useState(0)

  const buyPrice = price
  const sellPrice = price - 0.5

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num)
  }

  return (
    <div className="relative w-full h-full bg-[#131622] overflow-hidden" style={{ fontFamily: 'Inter' }}>
      {/* Header Section */}
      <div className="absolute left-[7px] top-[46px] w-[234px] h-[42px] bg-[#131622] rounded-[3px] relative">
        <div className="absolute left-[25px] top-[12px] w-[19px] h-[19px] rounded-full bg-gray-600"></div>
        <div className="absolute left-[51px] top-[5px] text-[#949597] text-[10px] font-normal">
          Main Trade
        </div>
        <div className="absolute left-[49px] top-[19px] text-[#E5E5E5] text-[13px] font-semibold">
          0.0 USDT
        </div>
        <Image
          src="/Assets/Drop Arrow.png"
          alt="Dropdown"
          width={8}
          height={5}
          className="absolute right-[10px] top-[24px]"
        />
      </div>

      {/* Order Type Tabs */}
      <div className="absolute left-[17px] top-[99px] flex items-center gap-6">
        <button
          onClick={() => setOrderType("Limit")}
          className={`text-[11px] font-semibold ${
            orderType === "Limit" ? "text-[#4179FF]" : "text-[#E0E0E0]"
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderType("Market")}
          className={`text-[11px] font-semibold ${
            orderType === "Market" ? "text-[#4179FF]" : "text-[#E0E0E0]"
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setOrderType("Stop Market")}
          className={`text-[11px] font-semibold ${
            orderType === "Stop Market" ? "text-[#4179FF]" : "text-[#E0E0E0]"
          }`}
        >
          Stop Market
        </button>
        {/* Checkbox */}
        <div className="absolute left-[215px] top-[98px] w-[15px] h-[15px] border border-[#D7D7D7] rounded-[1px] bg-transparent"></div>
      </div>
      {/* Underline for selected tab */}
      {orderType === "Limit" && (
        <div className="absolute left-[17px] top-[119px] w-[63px] h-[2px] bg-[#4179FF]"></div>
      )}

      {/* Margin Mode and Leverage */}
      <div className="absolute left-[17px] top-[128px] flex gap-2">
        <div className="relative w-[104px] h-[30px] bg-[#1E2333] border border-[#353C51] rounded-[2px] flex items-center justify-between px-3">
          <span className="text-[#E0E0E0] text-[11px] font-semibold">{marginMode}</span>
          <Image
            src="/Assets/Drop Arrow.png"
            alt="Dropdown"
            width={8}
            height={5}
            className="transform rotate-180"
          />
        </div>
        <div className="relative w-[104px] h-[30px] bg-[#1E2333] border border-[#353C51] rounded-[2px] flex items-center justify-between px-3">
          <span className="text-[#E0E0E0] text-[12px] font-semibold">{leverage}x</span>
          <Image
            src="/Assets/Drop Arrow.png"
            alt="Dropdown"
            width={8}
            height={5}
            className="transform rotate-180"
          />
        </div>
      </div>

      {/* Order Size */}
      <div className="absolute left-[17px] top-[166px]">
        <div className="text-[#B7B7B7] text-[11px] font-semibold mb-2">Order Size (Leveraged)</div>
        <div className="relative w-[215px] h-[30px] bg-[#1E2333] border border-[#B63219] rounded-[2px] flex items-center">
          <input
            type="text"
            value={orderSize}
            onChange={(e) => setOrderSize(e.target.value)}
            className="absolute left-[23px] text-[#E0E0E0] text-[12px] font-semibold bg-transparent border-none outline-none w-[150px]"
            placeholder="0"
          />
          <div className="absolute right-[15px] text-[#E0E0E0] text-[12px] font-semibold">
            USD
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="absolute left-[17px] top-[221px]">
        <div className="text-[#B7B7B7] text-[10px] font-semibold mb-2">0.0 USDT</div>
        <div className="relative">
          <div className="relative h-[3px] bg-[#262C3F] rounded-[2px] w-[194px] left-[10px]">
            {/* Percentage Markers */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-[#6B7284] rounded-full"></div>
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-[#6B7284] rounded-full"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-[#6B7284] rounded-full"></div>
            <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-[#6B7284] rounded-full"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-[#6B7284] rounded-full"></div>
            
            {/* Slider Track Fill */}
            <div
              className="absolute left-0 top-0 h-full bg-[#205CF0] rounded-[2px]"
              style={{ width: `${sliderValue}%` }}
            ></div>
            
            {/* Slider Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[13px] h-[13px] bg-[#205CF0] rounded-full cursor-pointer"
              style={{ left: `${sliderValue}%` }}
              onMouseDown={(e) => {
                const slider = e.currentTarget.parentElement
                if (!slider) return
                
                const handleMove = (moveEvent: MouseEvent) => {
                  const rect = slider.getBoundingClientRect()
                  const x = moveEvent.clientX - rect.left
                  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                  setSliderValue(percentage)
                }
                
                const handleUp = () => {
                  document.removeEventListener('mousemove', handleMove)
                  document.removeEventListener('mouseup', handleUp)
                }
                
                document.addEventListener('mousemove', handleMove)
                document.addEventListener('mouseup', handleUp)
                handleMove(e.nativeEvent)
              }}
            ></div>
          </div>
        </div>
        {/* Percentage Labels */}
        <div className="flex justify-between text-[#B7B7B7] text-[10px] font-semibold mt-1 w-[194px] left-[10px] relative">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Limit Price */}
      {orderType === "Limit" && (
        <div className="absolute left-[17px] top-[283px]">
          <div className="text-[#B7B7B7] text-[10px] font-semibold mb-2 tracking-[0.10px]">
            Limit Price
          </div>
          <div className="relative w-[215px] h-[30px] bg-[#1E2333] border border-[#353C51] rounded-[2px] flex items-center">
            <input
              type="text"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="absolute left-[24px] text-[#E0E0E0] text-[12px] font-semibold bg-transparent border-none outline-none w-[150px]"
            />
            <div className="absolute right-[14px] text-[#E0E0E0] text-[12px] font-semibold">
              USD
            </div>
          </div>
        </div>
      )}

      {/* Buy and Sell Buttons */}
      <div className="absolute left-[17px] top-[346px] flex gap-2">
        <button className="w-[104px] h-[43px] bg-[#43C71F] rounded-[1px] relative flex flex-col items-center justify-center">
          <div className="text-white text-[10px] font-semibold tracking-[0.10px]">
            Buy/Long
          </div>
          <div className="text-white text-[10px] font-semibold">
            ${formatPrice(buyPrice)}
          </div>
          <div className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[10px] h-[10px]">
            <div className="w-[8.33px] h-[8.33px] bg-white m-auto mt-[0.83px]"></div>
          </div>
        </button>
        <button className="w-[104px] h-[43px] bg-[#E43714] rounded-[1px] relative flex flex-col items-center justify-center">
          <div className="text-white text-[10px] font-semibold tracking-[0.10px]">
            Sell/Short
          </div>
          <div className="text-white text-[11px] font-semibold">
            ${formatPrice(sellPrice)}
          </div>
          <div className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[10px] h-[10px]">
            <div className="w-[8.33px] h-[8.33px] bg-white m-auto mt-[0.83px]"></div>
          </div>
        </button>
      </div>

      {/* Scrollbar indicator */}
      <div className="absolute right-[14px] top-[370.95px] w-[14px] h-[26px] bg-[#2E3549] rounded-[10px]">
        <Image
          src="/Assets/Drop Arrow.png"
          alt="Scroll"
          width={6}
          height={8}
          className="absolute left-[10px] top-[31px] transform rotate-180"
        />
      </div>

      {/* Order Cost */}
      <div className="absolute left-[17px] top-[396px] flex justify-between w-[215px]">
        <div className="text-[#B7B7B7] text-[10px] font-semibold">Order cost (Margin)</div>
        <div className="text-[#B7B7B7] text-[10px] font-semibold">0.0000 USDT</div>
      </div>
    </div>
  )
}
