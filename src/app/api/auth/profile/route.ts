
import { AuthManager } from "@/lib/auth/auth-manager";
import { getServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    try {
        const user = await AuthManager.getAuthenticatedUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { displayName } = body;

        if (!displayName || displayName.trim().length < 2) {
             return NextResponse.json({ error: "Display name too short" }, { status: 400 });
        }

        const supabase = await getServerSupabase();
        
        // Update profile in DB
        const { error } = await supabase
            .from('profiles')
            .upsert({ id: user.id, display_name: displayName.trim() });

        if (error) throw error;

        // Update Auth Cookie with new name
        const updatedUser = { ...user, display_name: displayName.trim() };
        const response = NextResponse.json({ success: true, user: updatedUser });
        AuthManager.setAuthCookie(response, updatedUser);
        
        return response;

    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
