"use client"

import Link from "next/link"
import Image from "next/image"
import { Apple, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen bg-background relative overflow-hidden pt-20 pb-12 md:pb-0">
      {/* Diagonal Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-block lg:block">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Your <span className="text-[#22c55e]">Crypto</span> trading boutique
            </h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            The best way to trade crypto with the lowest fees and highest liquidity.
          </p>

          {/* CTA Button */}
          <div className="mb-8 max-w-md mx-auto lg:mx-0">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg">
              Start Now
            </Button>
          </div>
        </div>

        {/* Right - Mobile Frame with Video */}
        <div className="hidden lg:block relative">
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
                    <source src="/media/Hero section video in mobile frame.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code - Positioned below mobile frame */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-4 backdrop-blur-sm">
            <div className="w-32 h-32 relative">
              <Image
                src="/media/qr for hero section.png"
                alt="QR Code"
                fill
                className="object-contain rounded-md"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">Scan to Download</p>
          </div>
        </div>
      </div>
    </section>
  )
}
