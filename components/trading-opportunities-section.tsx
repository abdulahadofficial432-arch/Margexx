"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function TradingOpportunitiesSection() {
  const [activeTab, setActiveTab] = useState("spot")

  const tradingPairs = [
    { pair: "BTC/USDT", price: "27,000.00", change: "+1.2%", isPositive: true },
    { pair: "ETH/USDT", price: "1,800.00", change: "+0.8%", isPositive: true },
    { pair: "XRP/USDT", price: "0.50", change: "+2.5%", isPositive: true },
    { pair: "LTC/USDT", price: "70.00", change: "+1.5%", isPositive: true },
    { pair: "DOGE/USDT", price: "0.07", change: "+3.0%", isPositive: true },
    { pair: "SOL/USDT", price: "20.00", change: "+1.0%", isPositive: true },
    { pair: "ADA/USDT", price: "0.30", change: "+2.0%", isPositive: true },
  ]

  const topGainers = [
    { pair: "HBAR/USDT", change: "+5.2%", isPositive: true },
    { pair: "LINK/USDT", change: "+4.8%", isPositive: true },
    { pair: "COMP/USDT", change: "+3.5%", isPositive: true },
  ]

  const topLosers = [
    { pair: "ALGO/USDT", change: "-2.3%", isPositive: false },
    { pair: "BLUR/USDT", change: "-1.8%", isPositive: false },
    { pair: "WLD/USDT", change: "-1.5%", isPositive: false },
  ]

  return (
    <section className="section bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-white mb-4">Get Your Trading Opportunity</h2>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("spot")}
            className={`px-4 py-3 font-semibold transition-colors ${
              activeTab === "spot"
                ? "text-white border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Spot Trading
          </button>
          <button
            onClick={() => setActiveTab("futures")}
            className={`px-4 py-3 font-semibold transition-colors ${
              activeTab === "futures"
                ? "text-white border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Futures Trading
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Trading Table */}
          <div className="lg:col-span-3 bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Trading Pair</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Last Price</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">24h Change</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tradingPairs.map((pair, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-4 text-white font-medium">{pair.pair}</td>
                      <td className="px-4 py-4 text-right text-white">{pair.price}</td>
                      <td
                        className={`px-4 py-4 text-right font-medium ${
                          pair.isPositive ? "text-[#22c55e]" : "text-destructive"
                        }`}
                      >
                        {pair.change}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button className="bg-primary hover:bg-primary/90 text-white text-xs px-4 py-1.5">
                          Buy
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Gainers and Losers */}
          <div className="space-y-6">
            {/* Top Gainers */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Top Gainers</h3>
              <div className="space-y-3">
                {topGainers.map((gainer, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-white text-sm">{gainer.pair}</span>
                    <span className="text-[#22c55e] font-medium text-sm">{gainer.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Top Losers</h3>
              <div className="space-y-3">
                {topLosers.map((loser, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-white text-sm">{loser.pair}</span>
                    <span className="text-destructive font-medium text-sm">{loser.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
