"use client"

export function TradingTicker() {
  const tickers = [
    { symbol: "ASTER/USD", change: -3.08, price: 0.955 },
    { symbol: "HYPE/USD", change: -6.21, price: 29.502 },
    { symbol: "BTC/USD", change: 1.90, price: 91583.5 },
    { symbol: "ETH/USD", change: 0.16, price: 3053.25 },
    { symbol: "SOL/USD", change: 2.45, price: 133.75 },
    { symbol: "ADA/USD", change: -1.23, price: 0.4285 },
    { symbol: "BNB/USD", change: 0.01, price: 613.9 },
    { symbol: "LTC/USD", change: 0.02, price: 160.41 },
    { symbol: "UNI/USD", change: 1.15, price: 5.42 },
    { symbol: "DOT/USD", change: -0.85, price: 6.23 },
  ]

  const formatPrice = (price: number) => {
    if (price < 1) {
      return price.toFixed(4)
    }
    if (price < 100) {
      return price.toFixed(2)
    }
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return (
    <div className="bg-[#0a0e27] border-t border-gray-800 py-2 px-4">
      <div className="flex items-center gap-6 text-xs">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
          <span className="text-gray-400">Connected</span>
        </div>

        {/* New Listings */}
        <div className="text-gray-400">
          <span className="text-[#22c55e]">NEW:</span> ASTER, HYPE
        </div>

        {/* Ticker Items */}
        <div className="flex items-center gap-6 overflow-x-auto flex-1">
          {tickers.map((ticker, idx) => (
            <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-gray-300 font-medium">{ticker.symbol}</span>
              <span
                className={`font-semibold ${
                  ticker.change >= 0 ? "text-[#22c55e]" : "text-red-500"
                }`}
              >
                {ticker.change >= 0 ? "+" : ""}
                {ticker.change.toFixed(2)}%
              </span>
              <span className="text-gray-400">${formatPrice(ticker.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

