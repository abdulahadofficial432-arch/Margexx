"use client"

import { Button } from "@/components/ui/button"
import { Apple, Play } from "lucide-react"

export function CopyTradingSection() {
  return (
    <section className="section bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Copy Trading: Let Top Traders Work for You
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Copy experienced traders and earn profits effortlessly.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <p className="text-muted-foreground text-sm">Pro Traders</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">500k+</div>
                <p className="text-muted-foreground text-sm">Copied Investors</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">1 click</div>
                <p className="text-muted-foreground text-sm">To Start</p>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg mb-8">
              Start Copy Trading
            </Button>

            {/* App Download Icons */}
            <div className="flex gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Apple className="w-8 h-8" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Play className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Right - Mobile Frame with Video */}
          <div className="relative">
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
                      <source src="/media/4th section video.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

