"use client"

import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="section bg-[#0a1428]">
      <div className="container">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Trade at Ease. Start Your Crypto Journey Now!
          </h2>
          <Button className="bg-gradient-to-r from-[#0066ff] to-[#0052cc] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg">
            Start Now
          </Button>
        </div>
      </div>
    </section>
  )
}

