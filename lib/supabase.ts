import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const databaseUrl = process.env.DATABASE_URL || ''

// Create Supabase client for client-side usage
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database connection string (for server-side direct PostgreSQL connections)
export const getDatabaseUrl = () => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return databaseUrl
}

// Helper function to create a Supabase client with custom credentials
export const createSupabaseClient = (url: string, key: string) => {
  return createClient(url, key)
}

