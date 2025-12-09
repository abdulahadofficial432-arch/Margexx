/**
 * Binance Futures WebSocket Price Service
 * Subscribes to kline stream (1m) for real-time price updates
 */

class WSPriceService {
  constructor() {
    this.ws = null
    this.symbol = 'BTCUSDT'
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
    this.listeners = new Set()
    this.isConnected = false
  }

  /**
   * Subscribe to kline stream
   * @param {string} symbol - Trading pair symbol (e.g., 'BTCUSDT')
   * @param {string} interval - Kline interval (default: '1m')
   */
  subscribe(symbol = 'BTCUSDT', interval = '1m') {
    this.symbol = symbol.toLowerCase()
    this.connect()
  }

  connect() {
    try {
      // Binance Futures WebSocket Stream URL
      const streamName = `${this.symbol}@kline_${interval}`
      const wsUrl = `wss://fstream.binance.com/ws/${streamName}`
      
      console.log(`[WSPrice] Connecting to ${wsUrl}`)
      
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('[WSPrice] WebSocket connected')
        this.isConnected = true
        this.reconnectAttempts = 0
        this.notifyListeners({ type: 'connected', status: true })
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.k) {
            // Kline data structure
            const kline = {
              symbol: data.k.s,
              open: parseFloat(data.k.o),
              high: parseFloat(data.k.h),
              low: parseFloat(data.k.l),
              close: parseFloat(data.k.c),
              volume: parseFloat(data.k.v),
              timestamp: data.k.t,
              isClosed: data.k.x, // Is this kline closed?
            }

            this.notifyListeners({
              type: 'kline',
              data: kline,
              price: kline.close,
            })
          }
        } catch (error) {
          console.error('[WSPrice] Error parsing message:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('[WSPrice] WebSocket error:', error)
        this.notifyListeners({ type: 'error', error })
      }

      this.ws.onclose = () => {
        console.log('[WSPrice] WebSocket closed')
        this.isConnected = false
        this.notifyListeners({ type: 'connected', status: false })
        this.handleReconnect()
      }
    } catch (error) {
      console.error('[WSPrice] Connection error:', error)
      this.handleReconnect()
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      
      console.log(`[WSPrice] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`)
      
      setTimeout(() => {
        this.connect()
      }, delay)
    } else {
      console.error('[WSPrice] Max reconnection attempts reached')
      this.notifyListeners({ type: 'error', error: 'Max reconnection attempts reached' })
    }
  }

  /**
   * Add event listener
   * @param {Function} callback - Callback function to receive updates
   */
  onUpdate(callback) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  notifyListeners(data) {
    this.listeners.forEach(callback => {
      try {
        callback(data)
      } catch (error) {
        console.error('[WSPrice] Listener error:', error)
      }
    })
  }

  /**
   * Unsubscribe and close connection
   */
  unsubscribe() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.listeners.clear()
    this.isConnected = false
  }

  /**
   * Change symbol
   */
  changeSymbol(symbol) {
    const wasConnected = this.isConnected
    this.unsubscribe()
    if (wasConnected) {
      setTimeout(() => {
        this.subscribe(symbol)
      }, 500)
    }
  }
}

// Export singleton instance
export const wsPriceService = new WSPriceService()

