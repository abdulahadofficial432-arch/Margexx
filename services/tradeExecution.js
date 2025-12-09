/**
 * Binance Futures Trade Execution Service
 * Handles REST API calls for placing orders
 */

const BINANCE_FUTURES_API = 'https://fapi.binance.com'

/**
 * Generate signature for Binance API request
 * Note: This function should only be used on the backend server
 * Frontend should call the backend API instead of using this directly
 * @param {string} queryString - Query string parameters
 * @param {string} secret - API secret key
 * @returns {string} - HMAC SHA256 signature
 */
function generateSignature(queryString, secret) {
  // This function is for backend use only
  // Frontend should use the API client in lib/api/tradeApi.ts
  throw new Error('generateSignature should only be called on the backend server')
}

/**
 * Create signed request parameters
 * @param {Object} params - Request parameters
 * @param {string} secret - API secret key
 * @returns {string} - Query string with signature
 */
function createSignedParams(params, secret) {
  const queryString = new URLSearchParams(params).toString()
  const signature = generateSignature(queryString, secret)
  return `${queryString}&signature=${signature}`
}

/**
 * Place a new order
 * @param {Object} orderData - Order parameters
 * @param {string} orderData.symbol - Trading pair (e.g., 'BTCUSDT')
 * @param {string} orderData.side - 'BUY' or 'SELL'
 * @param {string} orderData.type - 'LIMIT', 'MARKET', 'STOP_MARKET', etc.
 * @param {string} orderData.quantity - Order quantity
 * @param {string} orderData.price - Limit price (required for LIMIT orders)
 * @param {string} orderData.timeInForce - 'GTC', 'IOC', 'FOK' (for LIMIT orders)
 * @param {string} orderData.positionSide - 'LONG' or 'SHORT' (for hedge mode)
 * @param {string} apiKey - Binance API key
 * @param {string} secret - Binance API secret
 * @returns {Promise<Object>} - Order response
 */
export async function placeOrder(orderData, apiKey, secret) {
  try {
    const params = {
      symbol: orderData.symbol.toUpperCase(),
      side: orderData.side,
      type: orderData.type,
      quantity: orderData.quantity,
      timestamp: Date.now(),
    }

    // Add optional parameters
    if (orderData.price) params.price = orderData.price
    if (orderData.timeInForce) params.timeInForce = orderData.timeInForce
    if (orderData.positionSide) params.positionSide = orderData.positionSide
    if (orderData.stopPrice) params.stopPrice = orderData.stopPrice
    if (orderData.reduceOnly) params.reduceOnly = orderData.reduceOnly
    if (orderData.closePosition) params.closePosition = orderData.closePosition

    const queryString = createSignedParams(params, secret)
    const url = `${BINANCE_FUTURES_API}/fapi/v1/order?${queryString}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.msg || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[TradeExecution] Error placing order:', error)
    throw error
  }
}

/**
 * Cancel an order
 * @param {string} symbol - Trading pair
 * @param {number} orderId - Order ID to cancel
 * @param {string} apiKey - Binance API key
 * @param {string} secret - Binance API secret
 * @returns {Promise<Object>} - Cancellation response
 */
export async function cancelOrder(symbol, orderId, apiKey, secret) {
  try {
    const params = {
      symbol: symbol.toUpperCase(),
      orderId: orderId,
      timestamp: Date.now(),
    }

    const queryString = createSignedParams(params, secret)
    const url = `${BINANCE_FUTURES_API}/fapi/v1/order?${queryString}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.msg || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[TradeExecution] Error canceling order:', error)
    throw error
  }
}

/**
 * Get account information
 * @param {string} apiKey - Binance API key
 * @param {string} secret - Binance API secret
 * @returns {Promise<Object>} - Account information
 */
export async function getAccountInfo(apiKey, secret) {
  try {
    const params = {
      timestamp: Date.now(),
    }

    const queryString = createSignedParams(params, secret)
    const url = `${BINANCE_FUTURES_API}/fapi/v2/account?${queryString}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.msg || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[TradeExecution] Error getting account info:', error)
    throw error
  }
}

/**
 * Get open orders
 * @param {string} symbol - Trading pair (optional)
 * @param {string} apiKey - Binance API key
 * @param {string} secret - Binance API secret
 * @returns {Promise<Array>} - List of open orders
 */
export async function getOpenOrders(symbol, apiKey, secret) {
  try {
    const params = {
      timestamp: Date.now(),
    }

    if (symbol) {
      params.symbol = symbol.toUpperCase()
    }

    const queryString = createSignedParams(params, secret)
    const url = `${BINANCE_FUTURES_API}/fapi/v1/openOrders?${queryString}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.msg || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[TradeExecution] Error getting open orders:', error)
    throw error
  }
}

