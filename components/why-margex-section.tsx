"use client"

import { Shield, Zap, DollarSign, Headphones } from "lucide-react"

export function WhyMargexSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Secure",
      description: "Your funds are protected with industry-leading security",
    },
    {
      icon: DollarSign,
      title: "Low Fees",
      description: "Trade with the lowest fees in the market",
    },
    {
      icon: Zap,
      title: "Fast Execution",
      description: "Lightning-fast order execution",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here for you",
    },
  ]

  return (
    <section className="section bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Why Margex?</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Trading Interface Visual */}
          <div className="bg-card border border-border rounded-lg p-8 min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            
            {/* Trading Interface Mockup */}
            <div className="relative z-10">
              <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Buy/Sell</p>
                    <div className="flex gap-2 mt-2">
                      <button className="px-4 py-2 bg-[#22c55e] text-white rounded text-sm font-semibold">Buy</button>
                      <button className="px-4 py-2 bg-card border border-border text-white rounded text-sm font-semibold">Sell</button>
                    </div>
                  </div>
                </div>
                
                {/* Order Form */}
                <div className="space-y-3">
                  <div>
                    <label className="text-muted-foreground text-xs">Amount</label>
                    <input
                      type="text"
                      placeholder="0.00"
                      className="w-full bg-background border border-border rounded px-3 py-2 text-white text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs">Price</label>
                    <input
                      type="text"
                      placeholder="0.00"
                      className="w-full bg-background border border-border rounded px-3 py-2 text-white text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Open Positions */}
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-white font-semibold text-sm mb-3">Open Positions</p>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-background/50 rounded">
                      <div>
                        <p className="text-white text-xs font-medium">BTC/USDT</p>
                        <p className="text-muted-foreground text-xs">Long</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#22c55e] text-xs font-medium">+2.5%</p>
                        <p className="text-muted-foreground text-xs">$1,250</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Benefits Grid */}
          <div className="grid grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

