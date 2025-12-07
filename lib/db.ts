/**
 * Database utility functions
 * 
 * This file provides utilities for connecting to the Supabase PostgreSQL database.
 * You can use either the Supabase client library or direct PostgreSQL connections.
 */

import { getDatabaseUrl } from './supabase'

/**
 * Get the database connection URL
 * Make sure to set DATABASE_URL in your .env.local file
 */
export function getDbConnectionString(): string {
  return getDatabaseUrl()
}

/**
 * Parse database connection string into components
 */
export function parseConnectionString(connectionString: string) {
  const url = new URL(connectionString.replace('postgresql://', 'http://'))
  
  return {
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    database: url.pathname.slice(1), // Remove leading '/'
    user: url.username,
    password: url.password,
  }
}

/**
 * Example: Get database connection info
 * This can be used with libraries like 'pg' for direct PostgreSQL connections
 */
export function getDbConfig() {
  const connectionString = getDbConnectionString()
  return parseConnectionString(connectionString)
}

