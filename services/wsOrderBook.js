/**
 * Binance Futures WebSocket Order Book Service
 * Subscribes to depth stream for real-time order book updates
 */

class WSOrderBookService {
  constructor() {
    this.ws = null
    this.symbol = 'BTCUSDT'
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
    this.listeners = new Set()
    this.isConnected = false
    this.orderBook = {
      bids: [], // Buy orders (sorted descending by price)
      asks: [], // Sell orders (sorted ascending by price)
      lastUpdateId: null,
    }
  }

  /**
   * Subscribe to depth stream
   * @param {string} symbol - Trading pair symbol (e.g., 'BTCUSDT')
   * @param {number} levels - Depth levels (5, 10, or 20)
   */
  subscribe(symbol = 'BTCUSDT', levels = 20) {
    this.symbol = symbol.toLowerCase()
    this.connect(levels)
  }

  connect(levels = 20) {
    try {
      // Binance Futures WebSocket Stream URL for depth
      const streamName = `${this.symbol}@depth${levels}@100ms`
      const wsUrl = `wss://fstream.binance.com/ws/${streamName}`
      
      console.log(`[WSOrderBook] Connecting to ${wsUrl}`)
      
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('[WSOrderBook] WebSocket connected')
        this.isConnected = true
        this.reconnectAttempts = 0
        this.notifyListeners({ type: 'connected', status: true })
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.e === 'depthUpdate') {
            this.updateOrderBook(data)
          } else if (data.lastUpdateId) {
            // Initial snapshot
            this.orderBook = {
              bids: this.parseDepthLevels(data.bids),
              asks: this.parseDepthLevels(data.asks),
              lastUpdateId: data.lastUpdateId,
            }
            this.notifyListeners({
              type: 'snapshot',
              orderBook: this.orderBook,
            })
          }
        } catch (error) {
          console.error('[WSOrderBook] Error parsing message:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('[WSOrderBook] WebSocket error:', error)
        this.notifyListeners({ type: 'error', error })
      }

      this.ws.onclose = () => {
        console.log('[WSOrderBook] WebSocket closed')
        this.isConnected = false
        this.notifyListeners({ type: 'connected', status: false })
        this.handleReconnect(levels)
      }
    } catch (error) {
      console.error('[WSOrderBook] Connection error:', error)
      this.handleReconnect(levels)
    }
  }

  parseDepthLevels(levels) {
    return levels.map(([price, quantity]) => ({
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      total: parseFloat(price) * parseFloat(quantity),
    })).sort((a, b) => b.price - a.price) // Sort descending for bids
  }

  updateOrderBook(data) {
    // Update bids (buy orders)
    if (data.b) {
      data.b.forEach(([price, quantity]) => {
        const priceNum = parseFloat(price)
        const qtyNum = parseFloat(quantity)
        
        if (qtyNum === 0) {
          // Remove level
          this.orderBook.bids = this.orderBook.bids.filter(bid => bid.price !== priceNum)
        } else {
          // Update or add level
          const existingIndex = this.orderBook.bids.findIndex(bid => bid.price === priceNum)
          if (existingIndex >= 0) {
            this.orderBook.bids[existingIndex] = {
              price: priceNum,
              quantity: qtyNum,
              total: priceNum * qtyNum,
            }
          } else {
            this.orderBook.bids.push({
              price: priceNum,
              quantity: qtyNum,
              total: priceNum * qtyNum,
            })
          }
        }
      })
      
      // Sort bids descending
      this.orderBook.bids.sort((a, b) => b.price - a.price)
    }

    // Update asks (sell orders)
    if (data.a) {
      data.a.forEach(([price, quantity]) => {
        const priceNum = parseFloat(price)
        const qtyNum = parseFloat(quantity)
        
        if (qtyNum === 0) {
          // Remove level
          this.orderBook.asks = this.orderBook.asks.filter(ask => ask.price !== priceNum)
        } else {
          // Update or add level
          const existingIndex = this.orderBook.asks.findIndex(ask => ask.price === priceNum)
          if (existingIndex >= 0) {
            this.orderBook.asks[existingIndex] = {
              price: priceNum,
              quantity: qtyNum,
              total: priceNum * qtyNum,
            }
          } else {
            this.orderBook.asks.push({
              price: priceNum,
              quantity: qtyNum,
              total: priceNum * qtyNum,
            })
          }
        }
      })
      
      // Sort asks ascending
      this.orderBook.asks.sort((a, b) => a.price - b.price)
    }

    this.orderBook.lastUpdateId = data.u

    // Notify listeners
    this.notifyListeners({
      type: 'update',
      orderBook: { ...this.orderBook },
    })
  }

  handleReconnect(levels) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      
      console.log(`[WSOrderBook] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`)
      
      setTimeout(() => {
        this.connect(levels)
      }, delay)
    } else {
      console.error('[WSOrderBook] Max reconnection attempts reached')
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
        console.error('[WSOrderBook] Listener error:', error)
      }
    })
  }

  /**
   * Get current order book snapshot
   */
  getOrderBook() {
    return { ...this.orderBook }
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
    this.orderBook = { bids: [], asks: [], lastUpdateId: null }
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
export const wsOrderBookService = new WSOrderBookService()

