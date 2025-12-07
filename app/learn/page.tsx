"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Video, FileText } from "lucide-react"
import { useState } from "react"

export default function LearnPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const guides = [
    {
      icon: BookOpen,
      title: "Quick Start Guide",
      description: "Get started with Margex in 5 minutes. Learn the basics of trading.",
      href: "/learn/quickstart",
      difficulty: "Beginner",
    },
    {
      icon: Video,
      title: "How to Buy Bitcoin",
      description: "Step-by-step guide to purchasing your first Bitcoin on Margex.",
      href: "/learn/buy-bitcoin",
      difficulty: "Beginner",
    },
    {
      icon: FileText,
      title: "Margin Trading Guide",
      description: "Learn how to use leverage and maximize your trading potential.",
      href: "/learn/margin-trading",
      difficulty: "Intermediate",
    },
    {
      icon: BookOpen,
      title: "Technical Analysis 101",
      description: "Understand charts, patterns, and indicators for better trading decisions.",
      href: "/learn/technical-analysis",
      difficulty: "Intermediate",
    },
    {
      icon: Video,
      title: "Copy Trading Explained",
      description: "Discover how to copy trades from professional traders.",
      href: "/learn/copy-trading",
      difficulty: "Beginner",
    },
    {
      icon: FileText,
      title: "Risk Management",
      description: "Protect your capital with proven risk management strategies.",
      href: "/learn/risk-management",
      difficulty: "Advanced",
    },
  ]

  const faqs = [
    {
      question: "What is Margex?",
      answer:
        "Margex is a crypto trading platform offering spot trading, margin trading, and copy trading with access to 55+ assets including Bitcoin, Ethereum, and altcoins.",
    },
    {
      question: "How do I create an account?",
      answer:
        "Visit our signup page, enter your email and password, verify your email, and complete the KYC process. You can start trading within minutes.",
    },
    {
      question: "What fees does Margex charge?",
      answer:
        "Margex charges competitive trading fees starting from 0.1% for makers and 0.1% for takers. Additional fees may apply for withdrawals and other services.",
    },
    {
      question: "Is Margex safe?",
      answer:
        "Yes, Margex implements industry-leading security measures including cold storage for assets, 2FA, encryption, and regular security audits.",
    },
    {
      question: "Can I use copy trading?",
      answer:
        "Yes, copy trading is available to all verified users. You can follow top traders and automatically copy their positions with customizable position sizing.",
    },
    {
      question: "What is the minimum deposit?",
      answer:
        "The minimum deposit on Margex is $10 USD equivalent. You can deposit using various cryptocurrencies and fiat payment methods.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Learn to Trade</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master crypto trading with our comprehensive guides, video tutorials, and educational resources
          </p>
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "For Beginners",
                description: "Start your crypto journey",
                items: ["Account Setup", "First Trade", "Safety Basics"],
                color: "from-blue-500",
              },
              {
                title: "Intermediate",
                description: "Develop trading strategies",
                items: ["Technical Analysis", "Risk Management", "Portfolio Building"],
                color: "from-purple-500",
              },
              {
                title: "Advanced",
                description: "Master advanced techniques",
                items: ["Derivatives Trading", "Algorithmic Trading", "Portfolio Optimization"],
                color: "from-pink-500",
              },
            ].map((path, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${path.color} to-transparent bg-opacity-10 border border-border rounded-lg p-6`}
              >
                <h3 className="text-white font-bold text-lg mb-2">{path.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
                <ul className="space-y-2 mb-4">
                  {path.items.map((item) => (
                    <li key={item} className="text-foreground text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-semibold transition-colors">
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Popular Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, idx) => {
              const Icon = guide.icon
              return (
                <Link
                  key={idx}
                  href={guide.href}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                      {guide.difficulty}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{guide.description}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <h3 className="text-white font-semibold text-left">{faq.question}</h3>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 border-t border-border bg-background/50">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Help Center CTA */}
        <div className="bg-secondary/30 border border-border rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions
          </p>
          <Link href="/help">
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
