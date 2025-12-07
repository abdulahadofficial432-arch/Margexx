"use client"

import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="section bg-background">
      <div className="container">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Trade at Ease, Start Your Crypto Journey Now!
          </h2>
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}

