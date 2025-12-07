"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewChartProps {
  symbol: string
}

export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Function to load TradingView script if not already loaded
    const loadTradingViewScript = () => {
      if (window.TradingView) {
        setScriptLoaded(true)
        return
      }

      // Check if script tag already exists
      const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]')
      if (existingScript) {
        // Script exists, wait for it to load
        const checkInterval = setInterval(() => {
          if (window.TradingView) {
            clearInterval(checkInterval)
            setScriptLoaded(true)
          }
        }, 100)
        return () => clearInterval(checkInterval)
      }

      // Create and load script
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = () => {
        setScriptLoaded(true)
      }
      script.onerror = () => {
        console.error("Failed to load TradingView script")
      }
      document.body.appendChild(script)
    }

    loadTradingViewScript()

    return () => {
      if (widgetRef.current && widgetRef.current.remove) {
        try {
          widgetRef.current.remove()
          widgetRef.current = null
        } catch (e) {
          console.error("Error removing TradingView widget:", e)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || isInitialized) return

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
          // Studies/Indicators
          studies: [
            "Volume@tv-basicstudies",
            "RSI@tv-basicstudies",
          ],
          // Drawing tools access
          drawings_access: {
            type: "all",
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
          // Disabled features
          disabled_features: [
            "use_localstorage_for_settings",
            "volume_force_overlay",
            "create_volume_indicator_by_default",
            "header_widget_dom_node",
          ],
          // Enabled features
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
            "control_bar",
            "timeframes_toolbar",
            "edit_buttons_in_legend",
            "show_logo_on_all_charts",
            "charting_library_debug_mode",
          ],
          // Chart styling overrides
          overrides: {
            "paneProperties.background": "#131622",
            "paneProperties.backgroundType": "solid",
            "paneProperties.backgroundGradientStartColor": "#131622",
            "paneProperties.backgroundGradientEndColor": "#131622",
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
            "mainSeriesProperties.candleStyle.drawWick": true,
            "mainSeriesProperties.candleStyle.drawBorder": true,
            "volumePaneSize": "medium",
          },
          // Custom CSS
          custom_css_url: undefined,
          // Width and height
          width: "100%",
          height: "100%",
          // Loading screen
          loading_screen: {
            backgroundColor: "#131622",
            foregroundColor: "#131622",
          },
          // Library path (for advanced features)
          library_path: "/charting_library/",
          // Locale
          locale: "en",
          // Full feature set
          fullscreen: false,
          autosize: true,
          // Studies overrides
          studies_overrides: {
            "volume.volume.color.0": "#D50000",
            "volume.volume.color.1": "#34CD26",
            "rsi.display": "line",
            "rsi.linecolor": "#B19CD9",
            "rsi.levels": "60,40",
          },
        })

        setIsInitialized(true)
        console.log("TradingView widget initialized successfully")
      } catch (error) {
        console.error("Error initializing TradingView widget:", error)
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeWidget()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (widgetRef.current && widgetRef.current.remove) {
        try {
          widgetRef.current.remove()
          widgetRef.current = null
          setIsInitialized(false)
        } catch (e) {
          console.error("Error cleaning up TradingView widget:", e)
        }
      }
    }
  }, [scriptLoaded, symbol, isInitialized])

  return (
    <div className="flex flex-col h-full bg-[#131622] w-full">
      {/* Chart Container - Full TradingView */}
      <div className="flex-1 relative w-full min-h-[491px]" style={{ height: "100%" }}>
        {!isInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#131622]">
            <div className="text-center">
              <div className="text-white text-sm mb-2">Loading TradingView Chart...</div>
              <div className="w-8 h-8 border-2 border-[#3179FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}
        <div
          id={`tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, "_")}`}
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: "491px" }}
        />
      </div>
    </div>
  )
}

// Extend Window interface for TradingView
declare global {
  interface Window {
    TradingView: any
  }
}
