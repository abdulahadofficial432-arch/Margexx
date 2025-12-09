"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useTradingStore } from "@/lib/store/tradingStore"
import { placeOrder } from "@/lib/api/tradeApi"
import { toast } from "sonner"

interface OrderEntryPanelProps {
  pair: string
  price: number
  change24h: number
  volume24h: number
}

export function OrderEntryPanel({ pair, price, change24h, volume24h }: OrderEntryPanelProps) {
  const { currentPrice } = useTradingStore()
  const [orderType, setOrderType] = useState("Limit")
  const [marginMode, setMarginMode] = useState("Isolated")
  const [leverage, setLeverage] = useState(60)
  const [orderSize, setOrderSize] = useState("0")
  const [limitPrice, setLimitPrice] = useState("")
  const [sliderValue, setSliderValue] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get API credentials from environment or user input
  const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY || ''
  const apiSecret = process.env.NEXT_PUBLIC_BINANCE_SECRET || ''

  // Update limit price when current price changes
  useEffect(() => {
    if (currentPrice > 0 && !limitPrice) {
      setLimitPrice(currentPrice.toFixed(1))
    }
  }, [currentPrice, limitPrice])

  const displayPrice = currentPrice || price
  const buyPrice = displayPrice
  const sellPrice = displayPrice - 0.5

  const handleBuy = async () => {
    if (!orderSize || parseFloat(orderSize) <= 0) {
      toast.error("Please enter a valid order size")
      return
    }

    if (orderType === "Limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      toast.error("Please enter a valid limit price")
      return
    }

    if (!apiKey || !apiSecret) {
      toast.error("API credentials not configured. Please set BINANCE_API_KEY and BINANCE_SECRET")
      return
    }

    setIsSubmitting(true)
    try {
      const orderParams = {
        symbol: pair.replace('/', '').replace('USD', 'USDT'),
        side: 'BUY' as const,
        type: orderType === "Limit" ? 'LIMIT' as const : orderType === "Market" ? 'MARKET' as const : 'STOP_MARKET' as const,
        quantity: orderSize,
        price: orderType === "Limit" ? limitPrice : undefined,
        timeInForce: orderType === "Limit" ? 'GTC' as const : undefined,
        positionSide: 'LONG' as const,
        apiKey,
        secret: apiSecret,
      }

      const result = await placeOrder(orderParams)
      toast.success(`Buy order placed successfully! Order ID: ${result.order.orderId}`)
      
      // Reset form
      setOrderSize("0")
      setSliderValue(0)
    } catch (error: any) {
      toast.error(error.message || "Failed to place buy order")
      console.error("Buy order error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSell = async () => {
    if (!orderSize || parseFloat(orderSize) <= 0) {
      toast.error("Please enter a valid order size")
      return
    }

    if (orderType === "Limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      toast.error("Please enter a valid limit price")
      return
    }

    if (!apiKey || !apiSecret) {
      toast.error("API credentials not configured. Please set BINANCE_API_KEY and BINANCE_SECRET")
      return
    }

    setIsSubmitting(true)
    try {
      const orderParams = {
        symbol: pair.replace('/', '').replace('USD', 'USDT'),
        side: 'SELL' as const,
        type: orderType === "Limit" ? 'LIMIT' as const : orderType === "Market" ? 'MARKET' as const : 'STOP_MARKET' as const,
        quantity: orderSize,
        price: orderType === "Limit" ? limitPrice : undefined,
        timeInForce: orderType === "Limit" ? 'GTC' as const : undefined,
        positionSide: 'SHORT' as const,
        apiKey,
        secret: apiSecret,
      }

      const result = await placeOrder(orderParams)
      toast.success(`Sell order placed successfully! Order ID: ${result.order.orderId}`)
      
      // Reset form
      setOrderSize("0")
      setSliderValue(0)
    } catch (error: any) {
      toast.error(error.message || "Failed to place sell order")
      console.error("Sell order error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num)
  }

  return (
    <div className="relative w-full h-full bg-[#131622] overflow-hidden">
      {/* Header Section */}
      <div className="w-full h-[42px] bg-[#1E2333] rounded-t-[3px] relative px-4 py-2">
        <div className="absolute left-[19px] top-[12px] w-[19px] h-[19px] rounded-full bg-gray-600"></div>
        <div className="absolute left-[43px] top-[5px] text-[#949597] text-[10px] font-normal">
          Main Trade
        </div>
        <div className="absolute left-[43px] top-[19px] text-[#E5E5E5] text-[13px] font-semibold">
          0.0 USDT
        </div>
        <div className="absolute right-4 top-[9px] w-6 h-6">
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Order Type Tabs */}
      <div className="relative px-4 pt-3 pb-2">
        <div className="flex items-center gap-6">
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
        </div>
        {/* Underline for selected tab */}
        {orderType === "Limit" && (
          <div className="absolute left-4 top-[29px] w-[63px] h-[2px] bg-[#4179FF]"></div>
        )}
        {orderType === "Market" && (
          <div className="absolute left-[88px] top-[29px] w-[51px] h-[2px] bg-[#4179FF]"></div>
        )}
        {orderType === "Stop Market" && (
          <div className="absolute left-[139px] top-[29px] w-[75px] h-[2px] bg-[#4179FF]"></div>
        )}
      </div>

      {/* Margin Mode and Leverage */}
      <div className="px-4 pt-2 pb-3 flex gap-2">
        <div className="relative flex-1">
          <button className="w-full h-[30px] bg-[#1E2333] border border-[#353C51] rounded-[2px] flex items-center justify-between px-3">
            <span className="text-[#E0E0E0] text-[11px] font-semibold">{marginMode}</span>
            <ChevronDown className="w-3 h-3 text-[#B7B7B7]" />
          </button>
        </div>
        <div className="relative flex-1">
          <button className="w-full h-[30px] bg-[#1E2333] border border-[#353C51] rounded-[2px] flex items-center justify-between px-3">
            <span className="text-[#E0E0E0] text-[12px] font-semibold">{leverage}x</span>
            <ChevronDown className="w-3 h-3 text-[#B7B7B7]" />
          </button>
        </div>
      </div>

      {/* Order Size */}
      <div className="px-4 pb-3">
        <div className="text-[#B7B7B7] text-[11px] font-semibold mb-2">
          Order Size (Leveraged)
        </div>
        <div className="relative">
          <input
            type="text"
            value={orderSize}
            onChange={(e) => setOrderSize(e.target.value)}
            className="w-full h-[30px] bg-[#1E2333] border border-[#353C51] rounded-[2px] px-3 text-[#E0E0E0] text-[12px] font-semibold outline-none"
            placeholder="0"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E0E0E0] text-[12px] font-semibold">
            USD
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="px-4 pb-3 relative">
        <div className="text-[#B7B7B7] text-[10px] font-semibold mb-2">0.0 USDT</div>
        <div className="relative mx-2">
          {/* Custom Slider */}
          <div className="relative h-[3px] bg-[#262C3F] rounded-[2px]">
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
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[13px] h-[13px] bg-[#205CF0] rounded-full cursor-pointer hover:scale-110 transition-transform"
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
        <div className="flex justify-between text-[#B7B7B7] text-[10px] font-semibold mt-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Limit Price (only shown when Limit is selected) */}
      {orderType === "Limit" && (
        <div className="px-4 pb-3">
          <div className="text-[#B7B7B7] text-[10px] font-semibold mb-2 tracking-[0.1px]">
            Limit Price
          </div>
          <div className="relative">
            <input
              type="text"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="w-full h-[30px] bg-[#1E2333] border border-[#353C51] rounded-[2px] px-3 text-[#E0E0E0] text-[12px] font-semibold outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E0E0E0] text-[12px] font-semibold">
              USD
            </div>
          </div>
        </div>
      )}

      {/* Buy and Sell Buttons */}
      <div className="px-4 pb-3 flex gap-2">
        <button 
          onClick={handleBuy}
          disabled={isSubmitting}
          className="flex-1 h-[43px] bg-[#43C71F] rounded-[1px] relative flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3ab01a] transition-colors"
        >
          <div className="text-white text-[10px] font-semibold tracking-[0.1px]">
            {isSubmitting ? "Placing..." : "Buy/Long"}
          </div>
          <div className="text-white text-[10px] font-semibold">
            ${formatPrice(buyPrice)}
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[10px] h-[10px]">
            <div className="w-[8.33px] h-[8.33px] bg-white m-auto mt-[0.83px]"></div>
          </div>
        </button>
        <button 
          onClick={handleSell}
          disabled={isSubmitting}
          className="flex-1 h-[43px] bg-[#E43714] rounded-[1px] relative flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d02f0f] transition-colors"
        >
          <div className="text-white text-[10px] font-semibold tracking-[0.1px]">
            {isSubmitting ? "Placing..." : "Sell/Short"}
          </div>
          <div className="text-white text-[11px] font-semibold">
            ${formatPrice(sellPrice)}
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[10px] h-[10px]">
            <div className="w-[8.33px] h-[8.33px] bg-white m-auto mt-[0.83px]"></div>
          </div>
        </button>
      </div>

      {/* Order Cost */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <div className="text-[#B7B7B7] text-[10px] font-semibold">Order cost (Margin)</div>
        <div className="text-[#B7B7B7] text-[10px] font-semibold">0.0000 USDT</div>
      </div>
    </div>
  )
}
