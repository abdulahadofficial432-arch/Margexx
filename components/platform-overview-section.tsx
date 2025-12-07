"use client"

import { Button } from "@/components/ui/button"

export function PlatformOverviewSection() {
  const traders = [
    { name: "Trader 1", roe: "+45.3%", profit: "$2.5M", chart: [65, 70, 68, 72, 75, 73, 78] },
    { name: "Trader 2", roe: "+38.7%", profit: "$1.8M", chart: [60, 65, 63, 68, 70, 72, 75] },
    { name: "Trader 3", roe: "+42.1%", profit: "$2.1M", chart: [58, 62, 60, 65, 68, 70, 72] },
  ]

  return (
    <section className="section bg-[#0a1428]">
      <div className="container">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Margex is More than Just a Crypto Trading Platform
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <p className="text-muted-foreground text-sm">Pro Traders</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500k+</div>
            <p className="text-muted-foreground text-sm">Copy Traders</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1 click</div>
            <p className="text-muted-foreground text-sm">to start</p>
          </div>
        </div>

        {/* Copy Trading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {traders.map((trader, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">{trader.name}</h3>
              <div className="text-2xl font-bold text-[#22c55e] mb-2">{trader.roe}</div>
              <p className="text-muted-foreground text-sm mb-4">Total Profit: {trader.profit}</p>
              
              {/* Mini Chart */}
              <div className="h-16 mb-4 flex items-end gap-1">
                {trader.chart.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#0066ff] to-[#0052cc] rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-[#0066ff] to-[#0052cc] hover:opacity-90 text-white font-semibold">
                Copy Trader
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

