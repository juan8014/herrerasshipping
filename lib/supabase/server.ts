import "server-only"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

/**
 * Cookie-based server client bound to the logged-in user's session.
 * Reads run under the authenticated user, so RLS applies normally. Use this in
 * Server Components and Server Actions (auth, dashboard data reads).
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component where cookies are read-only.
            // The middleware refreshes the session, so this is safe to ignore.
          }
        },
      },
    },
  )
}

/**
 * Server-only Supabase admin client.
 *
 * Uses the SERVICE ROLE key, which BYPASSES Row Level Security. This is the
 * pragmatic way to power an internal staff dashboard before a full auth layer
 * exists (RLS currently grants access only to the `authenticated` role).
 *
 * SECURITY — non-negotiable:
 *  - `import "server-only"` guarantees this never ships to the browser bundle.
 *  - The service role key must live ONLY in server env (never NEXT_PUBLIC_*).
 *  - The /dashboard route MUST be protected by authentication before this app
 *    goes to production. Until then, anyone who reaches the URL can read data.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env",
    )
  }

  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
