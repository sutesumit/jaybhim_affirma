import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { AuthManager } from "@/lib/auth/auth-manager";

export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const user = await AuthManager.getAuthenticatedUser();

    const { data, error } = await supabase.rpc(
      "get_top_user",
      { current_user_id: user?.id ?? null }
    );

    if (error) {
      console.error("[GET /api/top-user] RPC Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const top = data?.[0] ?? null;

    return NextResponse.json({
      success: true,
      data: top
    });

  } catch (err) {
    console.error("[GET /api/top-user] Unexpected Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
