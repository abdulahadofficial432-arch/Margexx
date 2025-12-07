"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrendingUp, Shield, Users } from "lucide-react"

export default function CopyTradingPage() {
  const topTraders = [
    {
      rank: 1,
      name: "Pro Trader",
      followers: "1,234",
      roi: "+45.3%",
      volume: "$2.5M",
      winRate: "72%",
      avatar: "PT",
    },
    {
      rank: 2,
      name: "Elite Trader",
      followers: "987",
      roi: "+38.2%",
      volume: "$1.8M",
      winRate: "68%",
      avatar: "ET",
    },
    {
      rank: 3,
      name: "Master Trader",
      followers: "756",
      roi: "+32.1%",
      volume: "$1.5M",
      winRate: "65%",
      avatar: "MT",
    },
    {
      rank: 4,
      name: "Gold Trader",
      followers: "654",
      roi: "+28.7%",
      volume: "$1.2M",
      winRate: "61%",
      avatar: "GT",
    },
    {
      rank: 5,
      name: "Silver Trader",
      followers: "543",
      roi: "+24.3%",
      volume: "$980K",
      winRate: "58%",
      avatar: "ST",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Copy Trading</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Copy the trades of professional traders and follow their strategies. Automated replication of top traders'
            positions in real-time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: TrendingUp,
              title: "Follow Top Traders",
              description: "Automatically copy the trades of verified and profitable traders on Margex",
            },
            {
              icon: Shield,
              title: "Risk Management",
              description: "Set custom position sizing and stop losses to manage your risk exposure effectively",
            },
            {
              icon: Users,
              title: "Community Stats",
              description: "View detailed performance metrics, win rates, and trader rankings in real-time",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Leaderboard */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-12">
          <div className="border-b border-border p-6">
            <h2 className="text-2xl font-bold text-white">Top Traders Leaderboard</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Follow the most profitable traders on Margex Copy Trading
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-border p-4 flex gap-4">
            <button className="text-foreground font-semibold text-sm border-b-2 border-primary pb-2">
              Top Traders
            </button>
            <button className="text-muted-foreground hover:text-foreground text-sm pb-2">Leaderboard</button>
            <button className="text-muted-foreground hover:text-foreground text-sm pb-2">My Portfolio</button>
          </div>

          {/* Traders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-background/50">
                <tr>
                  <th className="px-6 py-4 text-left text-muted-foreground font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-muted-foreground font-semibold">Trader</th>
                  <th className="px-6 py-4 text-left text-muted-foreground font-semibold">Followers</th>
                  <th className="px-6 py-4 text-left text-muted-foreground font-semibold">ROI</th>
                  <th className="px-6 py-4 text-left text-muted-foreground font-semibold">Volume</th>
                  <th className="px-6 py-4 text-left text-muted-foreground font-semibold">Win Rate</th>
                  <th className="px-6 py-4 text-right text-muted-foreground font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {topTraders.map((trader, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                        {trader.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold text-sm">
                          {trader.avatar}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{trader.name}</p>
                          <p className="text-muted-foreground text-xs">ID: #{1000 + idx}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{trader.followers}</td>
                    <td className="px-6 py-4">
                      <span className="text-success font-semibold">{trader.roi}</span>
                    </td>
                    <td className="px-6 py-4 text-foreground">{trader.volume}</td>
                    <td className="px-6 py-4 text-foreground">{trader.winRate}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-xs font-semibold transition-colors">
                        Copy Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-secondary/30 border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8">How Copy Trading Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Select Trader",
                description: "Browse and select a profitable trader from our leaderboard",
              },
              {
                step: "2",
                title: "Set Budget",
                description: "Determine the amount you want to allocate to copy this trader",
              },
              {
                step: "3",
                title: "Auto Copy",
                description: "Trades are automatically copied in real-time at the same ratio",
              },
              {
                step: "4",
                title: "Monitor",
                description: "Track performance and earnings in your copy trading portfolio",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-white mb-4">Start Copy Trading Today</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders who are earning passive income by copying the strategies of top traders on Margex
          </p>
          <Link href="/signup">
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-colors">
              Create Account
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
