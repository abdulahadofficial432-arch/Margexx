"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Margex?",
      answer: "",
    },
    {
      question: "How do I buy Bitcoin or other cryptocurrency on Margex?",
      answer: "",
    },
    {
      question: "How do you protect users' funds?",
      answer: "",
    },
    {
      question: "I need help and want to chat with a real person.",
      answer: "",
    },
  ]

  return (
    <section className="section bg-[#0a1428]">
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

