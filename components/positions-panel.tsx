"use client"

import { useState } from "react"

export function PositionsPanel() {
  const [activeTab, setActiveTab] = useState<
    "positions" | "orders" | "history" | "orderHistory"
  >("positions")
  const [hideOtherAssets, setHideOtherAssets] = useState(false)

  const tabs = [
    { id: "positions", label: "Open positions (0)" },
    { id: "orders", label: "Active orders (0)" },
    { id: "history", label: "Position history (0)" },
    { id: "orderHistory", label: "Orders history (0)" },
  ]

  return (
    <div className="flex flex-col h-full bg-[#131622]">
      {/* Tabs */}
      <div className="flex items-center px-4 py-2 border-b border-gray-800 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 text-[10px] font-semibold tracking-[0.10px] transition-colors ${
              activeTab === tab.id
                ? "text-[#3179FF]"
                : "text-[#E1E2E3] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
        {/* Active tab underline */}
        {activeTab === "positions" && (
          <div className="absolute left-4 bottom-0 w-[111px] h-[2px] bg-[#3179FF]"></div>
        )}
        
        {/* Hide other assets checkbox */}
        <div className="ml-auto flex items-center gap-2">
          <input
            type="checkbox"
            checked={hideOtherAssets}
            onChange={(e) => setHideOtherAssets(e.target.checked)}
            className="w-[14px] h-[14px] rounded-[2px] border border-[#3179FF] bg-transparent checked:bg-[#3179FF]"
          />
          <span className="text-[#E1E2E3] text-[11px] font-semibold tracking-[0.33px]">
            Hide other assets
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-[#B7B7B7] text-[16px] font-medium tracking-[0.48px]">
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
