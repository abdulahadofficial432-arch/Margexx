/**
 * Trade API client for communicating with backend server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface PlaceOrderParams {
  symbol: string
  side: 'BUY' | 'SELL'
  type: 'LIMIT' | 'MARKET' | 'STOP_MARKET'
  quantity: string
  price?: string
  timeInForce?: 'GTC' | 'IOC' | 'FOK'
  positionSide?: 'LONG' | 'SHORT'
  stopPrice?: string
  reduceOnly?: boolean
  apiKey: string
  secret: string
}

interface CancelOrderParams {
  symbol: string
  orderId: number
  apiKey: string
  secret: string
}

/**
 * Place a new order through the backend
 */
export async function placeOrder(params: PlaceOrderParams) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trade/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': params.apiKey,
      },
      body: JSON.stringify({
        symbol: params.symbol,
        side: params.side,
        type: params.type,
        quantity: params.quantity,
        price: params.price,
        timeInForce: params.timeInForce,
        positionSide: params.positionSide,
        stopPrice: params.stopPrice,
        reduceOnly: params.reduceOnly,
        secret: params.secret,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to place order')
    }

    return data
  } catch (error) {
    console.error('[TradeAPI] Error placing order:', error)
    throw error
  }
}

/**
 * Cancel an order
 */
export async function cancelOrder(params: CancelOrderParams) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trade/order`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': params.apiKey,
      },
      body: JSON.stringify({
        symbol: params.symbol,
        orderId: params.orderId,
        secret: params.secret,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to cancel order')
    }

    return data
  } catch (error) {
    console.error('[TradeAPI] Error canceling order:', error)
    throw error
  }
}

/**
 * Get account information
 */
export async function getAccountInfo(apiKey: string, secret: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trade/account`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({ secret }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get account info')
    }

    return data
  } catch (error) {
    console.error('[TradeAPI] Error getting account info:', error)
    throw error
  }
}

/**
 * Get open orders
 */
export async function getOpenOrders(symbol: string | null, apiKey: string, secret: string) {
  try {
    const url = new URL(`${API_BASE_URL}/api/trade/open-orders`)
    if (symbol) {
      url.searchParams.append('symbol', symbol)
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({ secret }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get open orders')
    }

    return data
  } catch (error) {
    console.error('[TradeAPI] Error getting open orders:', error)
    throw error
  }
}

