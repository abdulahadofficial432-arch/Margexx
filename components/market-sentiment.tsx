"use client"

export function MarketSentiment() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-sm mb-2">Market Sentiment</h3>
        <button className="text-xs px-3 py-1 bg-secondary hover:bg-secondary/80 text-foreground rounded border border-border transition-colors">
          View More
        </button>
      </div>

      {/* Fear/Greed Gauge */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-full border-8 border-border flex items-center justify-center">
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-destructive via-warning to-success opacity-30"></div>
          <div className="text-center z-10">
            <p className="text-white text-3xl font-bold">54.2</p>
            <p className="text-muted-foreground text-xs">Fear Greed</p>
          </div>
        </div>
        <p className="text-muted-foreground text-xs mt-4 text-center">54.2 Long | 45.8 Short</p>
      </div>
    </div>
  )
}
