import "server-only"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import type { UserRole } from "@/lib/database.types"

export type AuthContext = { user: User | null; role: UserRole | null }

/**
 * Resolves the logged-in user and their role from the `profiles` table.
 * Role-based access (admin | client) replaces any hardcoded email allowlist:
 * access decisions come from the database, so client self-service can be added
 * later without touching env config.
 *
 * Uses `getUser()` (validated against the auth server) — never `getSession()`
 * alone for authorization.
 */
export async function getAuthContext(): Promise<AuthContext> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { user: null, role: null }

  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  return { user, role: data?.role ?? null }
}
