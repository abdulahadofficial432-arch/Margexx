"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DropdownMenuProps {
  title: string
  items: { label: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
}

function DropdownMenu({ title, items, isOpen, onToggle }: DropdownMenuProps) {
  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-white hover:text-primary transition-colors py-2"
      >
        {title}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-md shadow-lg z-50 py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navItems = [
    {
      title: "Buy Crypto",
      href: "/buy-crypto",
      dropdown: [
        { label: "BTC", href: "/buy-crypto/btc" },
        { label: "ETH", href: "/buy-crypto/eth" },
        { label: "View All", href: "/buy-crypto" },
      ],
    },
    { title: "Markets", href: "/markets" },
    {
      title: "Trade",
      href: "/trade",
      dropdown: [
        { label: "Spot Trading", href: "/trade/spot" },
        { label: "Margin Trading", href: "/trade/margin" },
        { label: "Futures", href: "/trade/futures" },
      ],
    },
    { title: "Price Alerts", href: "/price-alerts" },
    {
      title: "Copy Trading",
      href: "/copy-trading",
      dropdown: [
        { label: "Top Traders", href: "/copy-trading/traders" },
        { label: "Leaderboard", href: "/copy-trading/leaderboard" },
      ],
    },
    { title: "Earn", href: "/earn" },
    {
      title: "Learn",
      href: "/learn",
      dropdown: [
        { label: "Trading Guide", href: "/learn/trading-guide" },
        { label: "Blog", href: "/learn/blog" },
      ],
    },
    { title: "More", href: "#" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-2">
        <div className="container flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Register. You'll be done in 1 min.{" "}
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
      
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <span className="text-white font-bold text-lg hidden sm:inline">MARGEX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.dropdown ? (
              <DropdownMenu
                key={item.title}
                title={item.title}
                items={item.dropdown}
                isOpen={openDropdown === item.title}
                onToggle={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-primary transition-colors px-3 py-2 text-sm"
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Auth Buttons */}
          <Link href="/login" className="text-white hover:text-primary transition-colors text-sm">
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-1.5">Sign up</Button>
          </Link>

          {/* Theme Toggle (placeholder) */}
          <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <circle cx="12" cy="2" r="1.5" />
              <circle cx="12" cy="22" r="1.5" />
              <circle cx="2" cy="12" r="1.5" />
              <circle cx="22" cy="12" r="1.5" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/50">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-primary transition-colors px-3 py-2 text-sm rounded hover:bg-secondary"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
