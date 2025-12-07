"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3, Users, Gift } from "lucide-react"

export function PlatformOverviewSection() {
  const [activeFeature, setActiveFeature] = useState("copy-trading")

  const features = [
    { id: "copy-trading", icon: TrendingUp, label: "Copy Trading" },
    { id: "trading", icon: BarChart3, label: "Trading" },
    { id: "margin", icon: BarChart3, label: "Margin Trading" },
    { id: "promotions", icon: Gift, label: "Promotions" },
  ]

  return (
    <section className="section bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Margex is More than Just a Crypto Trading Platform
        </h2>

        {/* Feature Tabs */}
        <div className="flex justify-center gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-colors ${
                  activeFeature === feature.id
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-card border-2 border-transparent hover:border-border"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    activeFeature === feature.id ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-white text-sm font-medium">{feature.label}</span>
              </button>
            )
          })}
        </div>

        {/* Copy Trading Details */}
        {activeFeature === "copy-trading" && (
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Copy trading: Top 5 Traders by ROI</h3>
            
            {/* Chart Placeholder */}
            <div className="bg-secondary/30 rounded-lg p-6 mb-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Trading Performance Chart</p>
                <div className="flex items-end justify-center gap-2 h-48">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 bg-primary/60 rounded-t"
                      style={{
                        height: `${Math.random() * 100 + 50}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-muted-foreground text-sm mb-1">ROI</p>
                <p className="text-white text-xl font-bold">+45.3%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Followers</p>
                <p className="text-white text-xl font-bold">1,234</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Profit</p>
                <p className="text-white text-xl font-bold">$2.5M</p>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
              View More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

