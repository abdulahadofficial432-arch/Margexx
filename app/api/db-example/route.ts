/**
 * Example API route demonstrating database connection
 * 
 * This is a server-side API route that shows how to use the database connection.
 * Access it at: /api/db-example
 */

import { NextResponse } from 'next/server'
import { getDbConnectionString, getDbConfig } from '@/lib/db'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Example 1: Get database connection string
    const connectionString = getDbConnectionString()
    
    // Example 2: Get parsed database config
    const dbConfig = getDbConfig()
    
    // Example 3: Use Supabase client (if configured)
    let supabaseData = null
    if (supabase) {
      // Example query - replace 'your_table' with an actual table name
      // const { data, error } = await supabase.from('your_table').select('*').limit(1)
      // supabaseData = data
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database connection configured successfully',
      connectionInfo: {
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        // Don't expose password in response
      },
      supabaseConfigured: supabase !== null,
      // supabaseData: supabaseData, // Uncomment when you have actual data
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Make sure DATABASE_URL is set in your .env.local file',
      },
      { status: 500 }
    )
  }
}

