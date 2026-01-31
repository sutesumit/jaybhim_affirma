import { getServerSupabase } from "@/lib/supabase-server";
import { AuthManager } from "@/lib/auth/auth-manager";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await getServerSupabase();
    
    // Auth is optional for global stats, but needed for user stats
    const user = await AuthManager.getAuthenticatedUser();
    const userId = user?.id ?? null;

    const { data, error } = await supabase.rpc(
      "get_interaction_analytics",
      { current_user_id: userId }
    );

    if (error) {
      console.error("[GET /api/interaction-analytics] RPC Error:", error);
      return NextResponse.json(
        { error: error.message }, 
        { status: 500 }
      );
    }

    return NextResponse.json({
        success: true,
        data
    });
  } catch (err) {
    console.error("[GET /api/interaction-analytics] Unexpected Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}