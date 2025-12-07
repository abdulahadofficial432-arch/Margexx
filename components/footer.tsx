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
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Community</h4>
              <div className="flex gap-3">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Apple className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Play className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
