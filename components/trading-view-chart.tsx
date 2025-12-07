"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewChartProps {
  symbol: string
}

export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const containerId = `tradingview_${Date.now()}`
    if (containerRef.current) {
      containerRef.current.id = containerId
    }

    const initTradingView = () => {
      // Check if TradingView is available
      if (typeof window !== "undefined" && window.TradingView) {
        try {
          // Clear container
          if (containerRef.current) {
            containerRef.current.innerHTML = ""
          }

          // Initialize widget
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
            container_id: containerId,
            studies: [
              "Volume@tv-basicstudies",
              "RSI@tv-basicstudies",
            ],
            drawings_access: {
              type: "all",
            },
            disabled_features: [
              "use_localstorage_for_settings",
              "volume_force_overlay",
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
              "header_fullscreen_button",
              "display_market_status",
              "timeframes_toolbar",
              "go_to_date",
              "control_bar",
              "border_around_the_chart",
              "header_saveload",
              "left_toolbar",
              "context_menus",
            ],
            overrides: {
              "paneProperties.background": "#131622",
              "paneProperties.backgroundType": "solid",
              "paneProperties.vertGridProperties.color": "#1E2333",
              "paneProperties.vertGridProperties.style": 0,
              "paneProperties.horzGridProperties.color": "#1E2333",
              "paneProperties.horzGridProperties.style": 0,
              "scalesProperties.textColor": "#B7B7B7",
              "scalesProperties.lineColor": "#1E2333",
              "mainSeriesProperties.candleStyle.upColor": "#34CD26",
              "mainSeriesProperties.candleStyle.downColor": "#D50000",
              "mainSeriesProperties.candleStyle.borderUpColor": "#34CD26",
              "mainSeriesProperties.candleStyle.borderDownColor": "#D50000",
              "mainSeriesProperties.candleStyle.wickUpColor": "#34CD26",
              "mainSeriesProperties.candleStyle.wickDownColor": "#D50000",
            },
            studies_overrides: {
              "volume.volume.color.0": "#D50000",
              "volume.volume.color.1": "#34CD26",
              "rsi.display": "line",
              "rsi.linecolor": "#B19CD9",
            },
            width: "100%",
            height: "100%",
          })

          setIsLoading(false)
          console.log("TradingView chart loaded successfully")
        } catch (error) {
          console.error("Error initializing TradingView:", error)
          setIsLoading(false)
        }
      } else {
        // Wait for script to load
        const checkInterval = setInterval(() => {
          if (typeof window !== "undefined" && window.TradingView) {
            clearInterval(checkInterval)
            initTradingView()
          }
        }, 100)

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkInterval)
          if (isLoading) {
            console.error("TradingView script failed to load")
            setIsLoading(false)
          }
        }, 10000)

        return () => clearInterval(checkInterval)
      }
    }

    // Wait a bit for DOM to be ready
    const timer = setTimeout(() => {
      initTradingView()
    }, 500)

    return () => {
      clearTimeout(timer)
      if (widgetRef.current && widgetRef.current.remove) {
        try {
          widgetRef.current.remove()
          widgetRef.current = null
        } catch (e) {
          console.error("Error removing widget:", e)
        }
      }
    }
  }, [symbol])

  return (
    <div className="flex flex-col h-full w-full bg-[#131622] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#131622] z-10">
          <div className="text-center">
            <div className="text-white text-sm mb-2">Loading TradingView Chart...</div>
            <div className="w-8 h-8 border-2 border-[#3179FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: "491px" }}
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
