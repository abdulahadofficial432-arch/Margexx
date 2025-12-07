"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function TradingOpportunitiesSection() {

  const tradingPairs = [
    { pair: "BTC/USD", price: "97,692.00", change: "+0.01%", isPositive: true },
    { pair: "ETH/USD", price: "3,053.25", change: "+0.16%", isPositive: true },
    { pair: "XRP/USD", price: "0.50", change: "+2.5%", isPositive: true },
    { pair: "LTC/USD", price: "160.41", change: "+0.02%", isPositive: true },
  ]

  const topPairs = [
    { pair: "ARB/USD", price: "1.25", change: "+2.3%", isPositive: true },
    { pair: "APT/USD", price: "8.50", change: "+1.8%", isPositive: true },
    { pair: "OP/USD", price: "2.10", change: "+1.5%", isPositive: true },
    { pair: "LTC/USD", price: "160.41", change: "+0.02%", isPositive: true },
  ]

  return (
    <section className="section bg-[#0a1428]">
      <div className="container">
        <h2 className="text-4xl font-bold text-white mb-8">Get Your Trading Opportunity</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Trading Table */}
          <div className="lg:col-span-3 bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Trading Pairs</th>
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
                        <Button className="bg-gradient-to-r from-[#0066ff] to-[#0052cc] hover:opacity-90 text-white text-xs px-4 py-1.5">
                          Buy
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Pairs */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-white font-semibold mb-4">Top Pairs</h3>
            <div className="space-y-3">
              {topPairs.map((pair, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-white text-sm">{pair.pair}</span>
                  <div className="text-right">
                    <div className="text-white text-sm">{pair.price}</div>
                    <div className={`text-sm font-medium ${pair.isPositive ? "text-[#22c55e]" : "text-destructive"}`}>
                      {pair.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
