import Link from "next/link"

export function TradingOpportunitiesSection() {
  return (
    <section className="section bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-white mb-4">Get Your Trading Opportunity</h2>
        <p className="text-muted-foreground mb-8">
          Trade the most popular markets with over 55+ assets available.
          <Link href="/markets" className="text-primary hover:underline ml-2">
            See All Assets →
          </Link>
        </p>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button className="px-4 py-3 text-white border-b-2 border-primary font-semibold">Most popular</button>
          <button className="px-4 py-3 text-muted-foreground hover:text-foreground">New Listings</button>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Bitcoin", symbol: "BTC", price: "$97,692", change: "-0.54%", color: "bg-orange-500/20" },
            { name: "Ethereum", symbol: "ETH", price: "$3,035.94", change: "-0.12%", color: "bg-purple-500/20" },
            { name: "BNB", symbol: "BNB", price: "$888.22", change: "+0.47%", color: "bg-yellow-500/20" },
            { name: "Solana", symbol: "SOL", price: "$132.42", change: "-0.59%", color: "bg-green-500/20" },
          ].map((asset) => (
            <div
              key={asset.symbol}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${asset.color}`}></div>
                <div>
                  <p className="text-white font-semibold">{asset.name}</p>
                  <p className="text-muted-foreground text-xs">{asset.symbol}</p>
                </div>
              </div>
              <p className="text-white text-lg font-bold mb-1">{asset.price}</p>
              <p className={asset.change.startsWith("+") ? "text-success text-sm" : "text-destructive text-sm"}>
                {asset.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
