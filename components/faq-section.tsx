"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Margex?",
      answer:
        "Margex is a leading cryptocurrency trading platform that offers spot trading, futures trading, margin trading, and copy trading features. We provide the best way to trade crypto with the lowest fees and highest liquidity.",
    },
    {
      question: "How do I buy Bitcoin or other cryptocurrency on Margex?",
      answer:
        "To buy cryptocurrency on Margex, first create an account and complete the verification process. Then, deposit funds using your preferred payment method. Once your account is funded, navigate to the Markets section, select the cryptocurrency you want to buy, and place your order.",
    },
    {
      question: "How do you protect users' funds?",
      answer:
        "We use industry-leading security measures including cold storage for the majority of funds, multi-signature wallets, two-factor authentication, and regular security audits. We have never lost any client funds and maintain a 100% security record.",
    },
    {
      question: "I need help and want to chat with a real person.",
      answer:
        "Our 24/7 customer support team is always available to help you. You can reach us through live chat on our platform, email support, or through our social media channels. We're committed to providing excellent customer service.",
    },
  ]

  return (
    <section className="section bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Got Questions?</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="text-white font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openIndex === idx ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4 border-t border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

