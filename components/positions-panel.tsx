"use client"

import { useState } from "react"

export function PositionsPanel() {
  const [activeTab, setActiveTab] = useState<
    "positions" | "orders" | "history" | "orderHistory"
  >("positions")

  const tabs = [
    { id: "positions", label: "Open positions (0)" },
    { id: "orders", label: "Active orders (0)" },
    { id: "history", label: "Position history (0)" },
    { id: "orderHistory", label: "Orders history (0)" },
  ]

  return (
    <div className="flex flex-col h-48">
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "text-white border-[#22c55e]"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-2">
            {activeTab === "positions" && "You have no Open Positions"}
            {activeTab === "orders" && "You have no Active Orders"}
            {activeTab === "history" && "You have no Position History"}
            {activeTab === "orderHistory" && "You have no Order History"}
          </div>
        </div>
      </div>
    </div>
  )
}

