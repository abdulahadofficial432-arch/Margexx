"use client"

import Link from "next/link"
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
              Your <span className="text-primary">Crypto</span> trading boutique
            </h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            The easiest entry point in crypto for beginners and advanced users
          </p>

          {/* Email Signup */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md mx-auto lg:mx-0">
            <input
              type="email"
              placeholder="Enter the email to start"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">Sign up</Button>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md mx-auto lg:mx-0">
            <button className="flex-1 px-4 py-2.5 bg-card border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-foreground">
              <Apple className="w-5 h-5" />
              <span className="text-sm">Apple</span>
            </button>
            <button className="flex-1 px-4 py-2.5 bg-card border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-foreground">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm">Google</span>
            </button>
          </div>

          {/* Download Apps */}
          <div className="flex gap-3 justify-center lg:justify-start">
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Apple className="w-5 h-5" />
              App Store
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Play className="w-5 h-5" />
              Google Play
            </Link>
          </div>
        </div>

        {/* Right - Dashboard Mock */}
        <div className="hidden lg:block relative">
          <div className="bg-gradient-to-br from-secondary/30 to-background/30 rounded-lg border border-border/30 p-6 backdrop-blur-sm">
            <div className="w-full h-96 bg-card/50 rounded-md flex items-center justify-center border border-border/50">
              <div className="text-center">
                <div className="text-muted-foreground text-sm mb-4">Trading Dashboard Preview</div>
                <div className="flex justify-center gap-2 mb-4">
                  <div className="w-2 h-8 bg-primary/60"></div>
                  <div className="w-2 h-10 bg-success/60"></div>
                  <div className="w-2 h-6 bg-primary/60"></div>
                  <div className="w-2 h-12 bg-primary/60"></div>
                  <div className="w-2 h-8 bg-destructive/60"></div>
                </div>
                <p className="text-muted-foreground text-xs">Live Charts & Trading Interface</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="absolute -bottom-8 -right-8 bg-card border border-border rounded-lg p-4 backdrop-blur-sm">
            <div className="w-24 h-24 bg-foreground/10 rounded-md flex items-center justify-center">
              <div className="text-xs text-muted-foreground text-center">
                <div className="mb-2 font-semibold">QR</div>
                <div>Scan</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">Scan to Download</p>
          </div>
        </div>
      </div>
    </section>
  )
}
