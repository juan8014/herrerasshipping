import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/lib/database.types"

/**
 * Browser Supabase client (anon/publishable key). Safe for client components.
 * Used for auth (sign in) and the public package-tracking RPC.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
