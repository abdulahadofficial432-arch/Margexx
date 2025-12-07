"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewChartProps {
  symbol: string
}

export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [chartReady, setChartReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Check if TradingView is already available
    const checkTradingView = () => {
      if (window.TradingView) {
        setScriptLoaded(true)
        initializeWidget()
      } else {
        // Wait for script to load
        setTimeout(checkTradingView, 100)
      }
    }

    checkTradingView()

    return () => {
      if (widgetRef.current && widgetRef.current.remove) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }, [symbol])

  const initializeWidget = () => {
    if (!containerRef.current || !window.TradingView) return

    // Clear previous widget if exists
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }

    try {
      widgetRef.current = new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "1",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#131622",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: true,
        container_id: containerRef.current.id,
        studies: [
          "Volume@tv-basicstudies",
          "RSI@tv-basicstudies",
          "MACD@tv-basicstudies",
        ],
        drawings_access: {
          type: "black",
          tools: [
            { name: "Regression Trend" },
            { name: "Trend Angle" },
            { name: "Trend Line" },
            { name: "Horizontal Line" },
            { name: "Vertical Line" },
            { name: "Parallel Channel" },
            { name: "Rectangle" },
            { name: "Ellipse" },
            { name: "Arrow Up" },
            { name: "Arrow Down" },
            { name: "Text" },
            { name: "Fibonacci Retracement" },
            { name: "Fibonacci Extension" },
            { name: "Fibonacci Fan" },
            { name: "Fibonacci Arcs" },
            { name: "Fibonacci Time Zones" },
            { name: "Pitchfork" },
            { name: "Elliott Wave" },
            { name: "Gann Fan" },
            { name: "Gann Square" },
            { name: "Cycles" },
            { name: "Crosshair" },
            { name: "Measure" },
          ],
        },
        disabled_features: [
          "use_localstorage_for_settings",
          "volume_force_overlay",
          "create_volume_indicator_by_default",
        ],
        enabled_features: [
          "study_templates",
          "side_toolbar_in_fullscreen",
          "header_in_fullscreen",
          "header_widget",
          "header_symbol_search",
          "header_resolutions",
          "header_compare",
          "header_screenshot",
          "header_chart_type",
          "header_settings",
          "header_indicators",
          "header_undo_redo",
          "header_screenshot",
          "header_fullscreen_button",
          "display_market_status",
          "timeframes_toolbar",
          "go_to_date",
          "control_bar",
          "timeframes_toolbar",
          "border_around_the_chart",
          "header_saveload",
          "header_widget_dom_node",
        ],
        overrides: {
          "paneProperties.background": "#131622",
          "paneProperties.backgroundType": "solid",
          "mainSeriesProperties.candleStyle.upColor": "#34CD26",
          "mainSeriesProperties.candleStyle.downColor": "#D50000",
          "mainSeriesProperties.candleStyle.borderUpColor": "#34CD26",
          "mainSeriesProperties.candleStyle.borderDownColor": "#D50000",
          "mainSeriesProperties.candleStyle.wickUpColor": "#34CD26",
          "mainSeriesProperties.candleStyle.wickDownColor": "#D50000",
        },
        width: "100%",
        height: "100%",
      })
      
      // Set chart as ready after a short delay
      setTimeout(() => setChartReady(true), 1000)
    } catch (error) {
      console.error("Error initializing TradingView widget:", error)
    }
  }

  // Re-initialize when script loads
  useEffect(() => {
    if (scriptLoaded && containerRef.current) {
      initializeWidget()
    }
  }, [scriptLoaded, symbol])

  return (
    <div className="relative w-full h-full bg-[#131622]">
      {/* Placeholder text - shown until chart loads */}
      {!chartReady && (
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[48px] font-semibold tracking-[1.44px]"
          style={{ fontFamily: 'Inter' }}
        >
          TradingView Area
        </div>
      )}
      
      {/* Chart Container - Full TradingView */}
      <div
        id={`tradingview_${symbol}`}
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  )
}

// Extend Window interface for TradingView
declare global {
  interface Window {
    TradingView: any
  }
}
