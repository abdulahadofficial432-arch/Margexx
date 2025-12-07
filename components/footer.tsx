import Link from "next/link"
import { Apple, Play, Download } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Margex Platform",
      links: [
        { label: "Margin Trading", href: "/margin-trading" },
        { label: "Copy Trading", href: "/copy-trading" },
        { label: "Markets", href: "/markets" },
        { label: "Price Alerts", href: "/price-alerts" },
        { label: "Buy Crypto", href: "/buy-crypto" },
        { label: "Staking", href: "/staking" },
        { label: "Referral Program", href: "/referral" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "About Margex", href: "/about" },
        { label: "All Trading Assets", href: "/assets" },
        { label: "Security", href: "/security" },
        { label: "Career", href: "/career" },
        { label: "Contact Us", href: "/contact" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Trading Guide",
      links: [
        { label: "Quick Start Guide", href: "/guide/quickstart" },
        { label: "How to Buy Bitcoin", href: "/guide/buy-bitcoin" },
        { label: "How to Make a Deposit", href: "/guide/deposit" },
        { label: "Leverage Trading and Margin", href: "/guide/leverage" },
        { label: "Trading on Margex", href: "/guide/trading" },
        { label: "Order Types", href: "/guide/orders" },
        { label: "Video Tutorials", href: "/guide/videos" },
      ],
    },
    {
      title: "Blog",
      links: [
        { label: "For Beginners", href: "/blog/beginners" },
        { label: "News", href: "/blog/news" },
        { label: "Price Predictions", href: "/blog/predictions" },
        { label: "Technical Analysis", href: "/blog/analysis" },
        { label: "Trading", href: "/blog/trading" },
        { label: "Our Best Articles", href: "/blog/best" },
      ],
    },
    {
      title: "Other",
      links: [
        { label: "Cross Margin vs Isolated Margin", href: "/other/cross-margin" },
        { label: "Crypto Futures Trading", href: "/other/futures" },
        { label: "How to Short Crypto", href: "/other/short" },
      ],
    },
  ]

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container py-16">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Community Section */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Community</h4>
              <div className="flex gap-3">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Telegram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Discord">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="App Store">
                  <Apple className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Google Play">
                  <Play className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Desktop App">
                  <Download className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy policy
              </Link>
              <Link href="/staking-terms" className="hover:text-foreground transition-colors">
                Staking terms
              </Link>
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of service
              </Link>
              <Link href="/copy-trading-terms" className="hover:text-foreground transition-colors">
                Copy trading terms
              </Link>
              <Link href="/referral-terms" className="hover:text-foreground transition-colors">
                Referral program terms
              </Link>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="bg-secondary/30 rounded-md p-4 text-xs text-muted-foreground border border-border/50">
            <h4 className="text-white font-semibold mb-2">Risk Warning</h4>
            <p>
              These website products and services are provided by Margex Trading Solutions Ltd. Margin does not provide
              services to residents of certain jurisdictions including the United States of America, the Republic of
              Seychelles, Bermuda, Cuba, Crimea, Sevastopol, Iran, North Korea, Sudan and Afghanistan. Please note that
              cryptocurrencies, cryptocurrency leveraged products, and other financial products are subject to high
              volatility and you are responsible for complying with all applicable laws related to your trading
              activities without limitation any reporting obligations and payment of all applicable taxes in a
              jurisdiction in which you may be liable to pay tax.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
