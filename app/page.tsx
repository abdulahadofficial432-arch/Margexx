import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TickerSection } from "@/components/ticker-section"
import { FeaturesSection } from "@/components/features-section"
import { TradingOpportunitiesSection } from "@/components/trading-opportunities-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TickerSection />
      <FeaturesSection />
      <TradingOpportunitiesSection />
      <Footer />
    </main>
  )
}
