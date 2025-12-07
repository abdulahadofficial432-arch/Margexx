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
    { title: "Buy Crypto", href: "/buy-crypto" },
    { title: "Markets", href: "/markets" },
    { title: "Trade", href: "/trade" },
    { title: "Copy Trading", href: "/copy-trading" },
    { title: "Earn", href: "/earn" },
    { title: "More", href: "#" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[#0a1428] backdrop-blur supports-[backdrop-filter]:bg-[#0a1428]/95">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center relative">
            <span className="text-white font-bold text-xs">M</span>
            <svg className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg hidden sm:inline">MARGEX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-primary transition-colors px-3 py-2 text-sm"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Auth Buttons */}
          <Link href="/login" className="text-white hover:text-primary transition-colors text-sm">
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-[#0066ff] to-[#0052cc] hover:opacity-90 text-white text-sm px-4 py-1.5 font-semibold">Sign Up</Button>
          </Link>

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
