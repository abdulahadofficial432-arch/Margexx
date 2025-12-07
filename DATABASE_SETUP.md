# Database Setup Instructions

## Step 1: Install Dependencies

Run the following command to install the Supabase client library:

```bash
npm install @supabase/supabase-js
```

or if you're using pnpm:

```bash
pnpm add @supabase/supabase-js
```

## Step 2: Create Environment Variables File

Create a `.env.local` file in the root of your project with the following content:

```env
# Supabase Database Configuration
# Replace [YOUR-PASSWORD] with your actual database password

# Connection String (Session Pooler)
DATABASE_URL=postgresql://postgres.xiershzpuqcbjqqxtgvy:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres

# Supabase Project URL (optional - if you have it)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase Anon Key (optional - if you have it)
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Important:** Replace `[YOUR-PASSWORD]` with your actual database password from your Supabase project settings.

## Step 3: Using the Database Connection

### Option 1: Using Supabase Client (Recommended)

If you have your Supabase project URL and anon key, you can use the Supabase client:

```typescript
import { supabase } from '@/lib/supabase'

// Example: Query data
const { data, error } = await supabase
  .from('your_table')
  .select('*')
```

### Option 2: Direct PostgreSQL Connection

For direct PostgreSQL connections, you can use the connection string:

```typescript
import { getDbConnectionString, getDbConfig } from '@/lib/db'

// Get connection string
const connectionString = getDbConnectionString()

// Or get parsed config
const config = getDbConfig()
```

If you want to use direct PostgreSQL connections, you'll also need to install `pg`:

```bash
npm install pg
npm install --save-dev @types/pg
```

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Keep your database password secure
- Use environment variables for all sensitive data

## Next Steps

1. Install the Supabase package: `npm install @supabase/supabase-js`
2. Create `.env.local` file with your database password
3. Start using the database connection in your application

