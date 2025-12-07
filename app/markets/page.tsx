"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MarketSentiment } from "@/components/market-sentiment"
import { useState } from "react"
import { Star } from "lucide-react"

export default function MarketsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [favoriteAssets, setFavoriteAssets] = useState<string[]>([])

  const assets = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$89,147",
      change24h: "-0.54%",
      marketCap: "$1.78T",
      supply: "$19.96M",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,035.94",
      change24h: "-0.12%",
      marketCap: "$366.45B",
      supply: "$120.7M",
    },
    {
      name: "BNB",
      symbol: "BNB",
      price: "$888.22",
      change24h: "+0.47%",
      marketCap: "$122.32B",
      supply: "$137.74M",
    },
    {
      name: "USDC",
      symbol: "USDC",
      price: "$0.999801",
      change24h: "0%",
      marketCap: "$78.11B",
      supply: "$78.13B",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$132.42",
      change24h: "-0.59%",
      marketCap: "$74.23B",
      supply: "$560.63M",
    },
    {
      name: "TRON",
      symbol: "TRX",
      price: "$0.284767",
      change24h: "-1.69%",
      marketCap: "$26.96B",
      supply: "$96.68B",
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.13896",
      change24h: "-0.56%",
      marketCap: "$22.45B",
      supply: "$161.58B",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "$0.415053",
      change24h: "+0.2%",
      marketCap: "$15.21B",
      supply: "$36.64B",
    },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      price: "$579",
      change24h: "-2.03%",
      marketCap: "$11.55B",
      supply: "$19.96M",
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      price: "$89,073",
      change24h: "-0.56%",
      marketCap: "$11.13B",
      supply: "$124.96K",
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      price: "$13.79",
      change24h: "+0.27%",
      marketCap: "$9.61B",
      supply: "$696.85M",
    },
    {
      name: "Hyperliquid",
      symbol: "HYPE",
      price: "$29.68",
      change24h: "-3.73%",
      marketCap: "$8.04B",
      supply: "$270.77M",
    },
    {
      name: "Monero",
      symbol: "XMR",
      price: "$378.59",
      change24h: "-3.42%",
      marketCap: "$6.98B",
      supply: "$18.45M",
    },
  ]

  const filters = ["All", "SKY", "SPX6900", "Livepeer", "RAY", "Maple Finance", "NEAR", "FLOW"]

  const toggleFavorite = (symbol: string) => {
    setFavoriteAssets((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Markets</span>
        </div>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-white mb-2">Markets</h1>
            <p className="text-muted-foreground">
              The global crypto market cap is <span className="text-destructive">-0.28%</span> decrease over the last
              day
            </p>
          </div>
          <MarketSentiment />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Market Cap", value: "+3.08%", change: "$5.86B" },
            { label: "Trading Volume (24h)", value: "Up", change: "$565.82M" },
            { label: "Current ETH Gas Price", value: "", change: "0.42 Gwei" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-xs mb-2">{stat.label}</p>
              <p className="text-white text-2xl font-bold">{stat.value || stat.change}</p>
              {stat.change && <p className="text-success text-xs mt-1">{stat.change}</p>}
            </div>
          ))}
        </div>

        {/* Top Gainers/Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Gainers */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-white font-semibold text-sm mb-4">Top Margex Gainers</h3>
            <div className="space-y-3">
              {[
                { name: "SUI", price: "$1.57", change: "+3.04%" },
                { name: "AAVE", price: "$188.74", change: "+2.24%" },
                { name: "ARB", price: "$0.206463", change: "+2.1%" },
              ].map((asset) => (
                <div key={asset.name} className="flex justify-between items-center">
                  <div>
                    <p className="text-foreground text-sm font-semibold">{asset.name}</p>
                    <p className="text-muted-foreground text-xs">{asset.price}</p>
                  </div>
                  <p className="text-success text-xs">{asset.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-white font-semibold text-sm mb-4">Top Margex Losers</h3>
            <div className="space-y-3">
              {[
                { name: "FARTCOIN", price: "$0.359205", change: "-5.36%" },
                { name: "APE", price: "$0.23127", change: "-5.02%" },
                { name: "HYPE", price: "$29.68", change: "-3.73%" },
              ].map((asset) => (
                <div key={asset.name} className="flex justify-between items-center">
                  <div>
                    <p className="text-foreground text-sm font-semibold">{asset.name}</p>
                    <p className="text-muted-foreground text-xs">{asset.price}</p>
                  </div>
                  <p className="text-destructive text-xs">{asset.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Listings */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-white font-semibold text-sm mb-4">New Margex Listings</h3>
            <div className="space-y-3">
              {[
                { name: "HBAR", price: "$0.133459", change: "+0.27%" },
                { name: "HYPE", price: "$29.68", change: "-3.73%" },
                { name: "FARTCOIN", price: "$0.359205", change: "-5.36%" },
              ].map((asset) => (
                <div key={asset.name} className="flex justify-between items-center">
                  <div>
                    <p className="text-foreground text-sm font-semibold">{asset.name}</p>
                    <p className="text-muted-foreground text-xs">{asset.price}</p>
                  </div>
                  <p className={asset.change.startsWith("+") ? "text-success text-xs" : "text-destructive text-xs"}>
                    {asset.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Asset Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Tabs and Controls */}
          <div className="border-b border-border p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 border-b border-border pb-4 md:pb-0">
              <button className="text-sm text-foreground pb-2 border-b-2 border-primary font-semibold">Favorite</button>
              <button className="text-sm text-muted-foreground pb-2 hover:text-foreground transition-colors">
                All
              </button>
              <button className="text-sm text-muted-foreground pb-2 hover:text-foreground transition-colors">
                Listed
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground border border-border hover:border-primary"
                  }`}
                >
                  {filter}
                </button>
              ))}
              <button className="px-3 py-1 text-foreground hover:text-primary transition-colors">...</button>
            </div>
          </div>

          {/* Table Controls */}
          <div className="border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show rows</span>
              <select className="bg-background border border-border rounded px-2 py-1 text-sm text-foreground">
                <option>15</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-background/50">
                <tr>
                  <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Price</th>
                  <th className="px-4 py-3 text-left text-muted-foreground font-semibold">24H Change</th>
                  <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Market cap</th>
                  <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Supply</th>
                  <th className="px-4 py-3 text-right text-muted-foreground font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                    <td className="px-4 py-4 text-foreground">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleFavorite(asset.symbol)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Star
                            className="w-4 h-4"
                            fill={favoriteAssets.includes(asset.symbol) ? "currentColor" : "none"}
                          />
                        </button>
                        <div>
                          <p className="font-semibold text-white">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white font-semibold">{asset.price}</td>
                    <td className="px-4 py-4">
                      <span
                        className={
                          asset.change24h.startsWith("+") ? "text-success text-xs" : "text-destructive text-xs"
                        }
                      >
                        {asset.change24h}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-foreground">{asset.marketCap}</td>
                    <td className="px-4 py-4 text-foreground">{asset.supply}</td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/trade?symbol=${asset.symbol}`}
                        className="text-primary hover:text-primary/80 transition-colors text-xs font-semibold"
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
