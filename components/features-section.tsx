"use client"

import { Apple, Play, Download } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="section bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-white text-center mb-4">We made crypto trading easy</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Simple interface, liquidity, fast execution, and 24/7 support.
        </p>

        {/* Video Section */}
        <div className="flex justify-center mb-12">
          {/* Mobile Phone Frame */}
          <div className="relative mx-auto" style={{ width: '320px', height: '640px' }}>
            {/* Phone Frame */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
              {/* Screen Bezel */}
              <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                
                {/* Video Content */}
                <div className="w-full h-full relative">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/media/3rd section video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { number: "500k+", label: "Registered users" },
            { number: "180k+", label: "Daily active users" },
            { number: "0", label: "Client funds lost" },
            { number: "153", label: "Countries served" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-colors">
            Continue trading
          </button>
          <button className="px-8 py-3 bg-card border border-border hover:bg-secondary text-white font-semibold rounded-md transition-colors">
            Further Overview
          </button>
        </div>

        {/* Download Apps */}
        <div className="flex justify-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Apple className="w-8 h-8" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Play className="w-8 h-8" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Download className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
