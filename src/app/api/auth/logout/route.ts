import { AuthManager } from "@/lib/auth/auth-manager"
import { NextResponse } from "next/server"
import { telegramNotifier } from "@/lib/notifications/telegram-notifier"


export async function POST(request: Request){
    try {
        // Get user info before clearing cookie
        const user = await AuthManager.getAuthenticatedUser();
        const userName = user?.display_name ?? "Anonymous";
        const contact = user?.phone ?? user?.email ?? null;
        
        const serverIp = request.headers.get("x-forwarded-for") ?? undefined;
        const parsedIp = serverIp?.split(",")[0]?.trim();
        const isLocalhost = parsedIp?.startsWith("127.") || parsedIp === "::ffff:127.0.0.1" || parsedIp === "::1";
        const ip = isLocalhost ? null : (parsedIp ?? null);

        const response = NextResponse.json({ success: true })
        AuthManager.clearAuthCookie(response)

        // Fire-and-forget Telegram notification
        void telegramNotifier
          .notifyLogout({ userName, contact, ip })
          .catch((err: unknown) => {
            console.error("Logout notification error:", err);
          });

        return response
        
    } catch (error) {
        console.error('[logout]-server error.', error)
        return NextResponse.json(
            { error: 'Error in logging out.' },
            { status: 500}
        )
    }
}