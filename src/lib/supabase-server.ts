import { createClient } from "@supabase/supabase-js";
import { AuthManager } from "./auth/auth-manager";

/**
 * Creates a per-request Supabase client that propagates the user's JWT.
 * This allows Row Level Security (RLS) to function correctly in server-side API routes.
 */
export async function getServerSupabase() {
    const user = await AuthManager.getAuthenticatedUser();
    
    // We utilize the same environment variables as the standard client
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

    // If a JWT is present in the auth cookie, we inject it into the Authorization header
    if (user?.accessToken) {
        return createClient(supabaseUrl, supabaseKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            },
        });
    }

    // Fallback to anonymous client if no token is found
    return createClient(supabaseUrl, supabaseKey);
}
