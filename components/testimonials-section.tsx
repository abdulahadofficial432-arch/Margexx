"use client"

import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "John D.",
      rating: 5,
      text: "Margex has the best trading platform I've ever used. The interface is clean and execution is lightning fast.",
    },
    {
      name: "Sarah M.",
      rating: 5,
      text: "Copy trading feature is amazing! I've been able to follow top traders and see consistent profits.",
    },
    {
      name: "Mike T.",
      rating: 5,
      text: "Low fees and great liquidity. This is my go-to platform for crypto trading.",
    },
    {
      name: "Emma L.",
      rating: 5,
      text: "Customer support is excellent. They're always available when I need help.",
    },
  ]

  return (
    <section className="section bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-4">{testimonial.text}</p>
              <p className="text-white font-semibold text-sm">{testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* App Ratings */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white font-semibold mb-1">4.8</p>
            <p className="text-muted-foreground text-sm">App Store</p>
          </div>
          <div className="text-center">
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white font-semibold mb-1">4.3</p>
            <p className="text-muted-foreground text-sm">Google Play</p>
          </div>
        </div>

        {/* Media Mentions */}
        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground text-center text-sm mb-6">As featured in:</p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="text-white font-semibold">MarketWatch</div>
            <div className="text-white font-semibold">Business Insider</div>
            <div className="text-white font-semibold">Investing.com</div>
          </div>
        </div>
      </div>
    </section>
  )
}

