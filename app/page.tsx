import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TradingOpportunitiesSection } from "@/components/trading-opportunities-section"
import { CopyTradingSection } from "@/components/copy-trading-section"
import { PlatformOverviewSection } from "@/components/platform-overview-section"
import { WhyMargexSection } from "@/components/why-margex-section"
import { CommunitySection } from "@/components/community-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1428]">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TradingOpportunitiesSection />
      <CopyTradingSection />
      <PlatformOverviewSection />
      <WhyMargexSection />
      <CommunitySection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  )
}
