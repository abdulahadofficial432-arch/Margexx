"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessageCircle, Mail, HelpCircle, Phone } from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState("general")

  const categories = {
    general: {
      label: "General",
      articles: [
        { id: 1, title: "Getting Started with Margex", url: "#" },
        { id: 2, title: "Account Types and Features", url: "#" },
        { id: 3, title: "Supported Cryptocurrencies", url: "#" },
      ],
    },
    account: {
      label: "Account",
      articles: [
        { id: 1, title: "How to Verify Your Account", url: "#" },
        { id: 2, title: "Managing Your Password", url: "#" },
        { id: 3, title: "Two-Factor Authentication", url: "#" },
      ],
    },
    trading: {
      label: "Trading",
      articles: [
        { id: 1, title: "Placing Your First Trade", url: "#" },
        { id: 2, title: "Understanding Order Types", url: "#" },
        { id: 3, title: "Margin Trading Explained", url: "#" },
      ],
    },
    security: {
      label: "Security",
      articles: [
        { id: 1, title: "Security Best Practices", url: "#" },
        { id: 2, title: "Reporting Suspicious Activity", url: "#" },
        { id: 3, title: "Wallet Security", url: "#" },
      ],
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground">Get answers to your questions and resolve issues quickly</p>
        </div>

        {/* Search */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full px-6 py-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: MessageCircle, label: "Live Chat", desc: "Chat with support team" },
            { icon: Mail, label: "Email", desc: "support@margex.com" },
            { icon: Phone, label: "Phone", desc: "24/7 support available" },
            { icon: HelpCircle, label: "FAQ", desc: "Browse common questions" },
          ].map((option, idx) => {
            const Icon = option.icon
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-1">{option.label}</h3>
                <p className="text-muted-foreground text-sm">{option.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Knowledge Base */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {Object.entries(categories).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === key
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">
              {categories[selectedCategory as keyof typeof categories].label} Articles
            </h3>
            <div className="space-y-3">
              {categories[selectedCategory as keyof typeof categories].articles.map((article) => (
                <Link
                  key={article.id}
                  href={article.url}
                  className="block p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors group"
                >
                  <h4 className="text-white font-semibold group-hover:text-primary transition-colors flex items-center justify-between">
                    {article.title}
                    <span className="text-muted-foreground">→</span>
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Submit a Ticket</h2>
          <p className="text-muted-foreground mb-6">Can't find the answer? Our support team will help you.</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2 font-semibold">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2 font-semibold">Category</label>
              <select className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>General</option>
                <option>Account</option>
                <option>Trading</option>
                <option>Security</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2 font-semibold">Message</label>
              <textarea
                placeholder="Describe your issue..."
                rows={5}
                className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-colors"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
