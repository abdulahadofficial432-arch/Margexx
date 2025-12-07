"use client"

export function TickerSection() {
  const tickers = [
    { symbol: "BTC/USD", price: "$97,692.00 (0.01%)", volume: "BTC Volume" },
    { symbol: "ETH/USD", price: "$3,053.25 (0.16%)", volume: "ETH Volume" },
    { symbol: "LTC/USD", price: "$160.41 (0.02%)", volume: "LTC Volume" },
    { symbol: "ADA/USD", price: "$0.4285 (0.0%)", volume: "ADA Volume" },
    { symbol: "SOL/USD", price: "$133.75 (0.0%)", volume: "SOL Volume" },
    { symbol: "UNI/USD", price: "$5.420 (0.0%)", volume: "UNI Volume" },
    { symbol: "BNB/USD", price: "$613.9 (0.01%)", volume: "BNB Volume" },
    { symbol: "POL/USD", price: "$0.1203 (0.0%)", volume: "POL Volume" },
  ]

  return (
    <section className="w-full bg-primary/90 py-3 overflow-hidden border-t border-primary/50">
      <div className="flex animate-scroll whitespace-nowrap gap-8 px-4">
        {tickers.map((ticker, idx) => (
          <div key={idx} className="flex-shrink-0 flex items-center gap-4">
            <div className="text-white text-sm font-semibold">{ticker.symbol}</div>
            <div className="text-white/90 text-xs">{ticker.price}</div>
          </div>
        ))}
        {tickers.map((ticker, idx) => (
          <div key={`repeat-${idx}`} className="flex-shrink-0 flex items-center gap-4">
            <div className="text-white text-sm font-semibold">{ticker.symbol}</div>
            <div className="text-white/90 text-xs">{ticker.price}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
