"use client"

export function CommunitySection() {
  return (
    <section className="section bg-[#0a1428]">
      <div className="container">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-12 relative overflow-hidden">
          {/* Background Pattern - Network/Chart visual */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Join the Margex Community of Traders
            </h2>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="text-white hover:text-primary transition-colors font-semibold"
              >
                Twitter X
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors font-semibold"
              >
                Telegram
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors font-semibold"
              >
                CoinMarketCap
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

