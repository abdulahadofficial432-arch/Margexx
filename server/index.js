/**
 * Express Backend Server for Binance Futures API
 * Handles protected API requests with HMAC SHA256 signing
 */

const express = require('express')
const cors = require('cors')
const crypto = require('crypto')

const app = express()
const PORT = process.env.PORT || 3001
const BINANCE_FUTURES_API = 'https://fapi.binance.com'

// Middleware
app.use(cors())
app.use(express.json())

/**
 * Generate signature for Binance API request
 */
function generateSignature(queryString, secret) {
  return crypto.createHmac('sha256', secret).update(queryString).digest('hex')
}

/**
 * Create signed request parameters
 */
function createSignedParams(params, secret) {
  const queryString = new URLSearchParams(params).toString()
  const signature = generateSignature(queryString, secret)
  return `${queryString}&signature=${signature}`
}

/**
 * Middleware to validate API credentials
 */
function validateCredentials(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.body.apiKey
  const secret = req.body.secret

  if (!apiKey || !secret) {
    return res.status(401).json({ 
      error: 'Missing API credentials',
      message: 'API key and secret are required' 
    })
  }

  req.apiKey = apiKey
  req.secret = secret
  next()
}

/**
 * POST /api/trade/order - Place a new order
 */
app.post('/api/trade/order', validateCredentials, async (req, res) => {
  try {
    const { symbol, side, type, quantity, price, timeInForce, positionSide, stopPrice, reduceOnly } = req.body
    const { apiKey, secret } = req

    if (!symbol || !side || !type || !quantity) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        message: 'symbol, side, type, and quantity are required' 
      })
    }

    const params = {
      symbol: symbol.toUpperCase(),
      side: side.toUpperCase(),
      type: type.toUpperCase(),
      quantity: quantity.toString(),
      timestamp: Date.now(),
    }

    // Add optional parameters
    if (price) params.price = price.toString()
    if (timeInForce) params.timeInForce = timeInForce.toUpperCase()
    if (positionSide) params.positionSide = positionSide.toUpperCase()
    if (stopPrice) params.stopPrice = stopPrice.toString()
    if (reduceOnly !== undefined) params.reduceOnly = reduceOnly.toString()

    const queryString = createSignedParams(params, secret)
    const url = `${BINANCE_FUTURES_API}/fapi/v1/order?${queryString}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Binance API error',
        message: data.msg || 'Failed to place order',
        code: data.code,
      })
    }

    res.json({
      success: true,
      order: data,
    })
  } catch (error) {
    console.error('[Server] Error placing order:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
})

/**
 * DELETE /api/trade/order - Cancel an order
 */
app.delete('/api/trade/order', validateCredentials, async (req, res) => {
  try {
    const { symbol, orderId } = req.body
    const { apiKey, secret } = req

    if (!symbol || !orderId) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        message: 'symbol and orderId are required' 
      })
    }

    const params = {
      symbol: symbol.toUpperCase(),
      orderId: orderId.toString(),
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

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Binance API error',
        message: data.msg || 'Failed to cancel order',
        code: data.code,
      })
    }

    res.json({
      success: true,
      order: data,
    })
  } catch (error) {
    console.error('[Server] Error canceling order:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
})

/**
 * GET /api/trade/account - Get account information
 */
app.get('/api/trade/account', validateCredentials, async (req, res) => {
  try {
    const { apiKey, secret } = req

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

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Binance API error',
        message: data.msg || 'Failed to get account info',
        code: data.code,
      })
    }

    res.json({
      success: true,
      account: data,
    })
  } catch (error) {
    console.error('[Server] Error getting account info:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
})

/**
 * GET /api/trade/open-orders - Get open orders
 */
app.get('/api/trade/open-orders', validateCredentials, async (req, res) => {
  try {
    const { symbol } = req.query
    const { apiKey, secret } = req

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

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Binance API error',
        message: data.msg || 'Failed to get open orders',
        code: data.code,
      })
    }

    res.json({
      success: true,
      orders: data,
    })
  } catch (error) {
    console.error('[Server] Error getting open orders:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
})

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`[Server] Express server running on port ${PORT}`)
  console.log(`[Server] Health check: http://localhost:${PORT}/health`)
})

module.exports = app

