import { AuthManager } from "@/lib/auth/auth-manager"
import { NextResponse } from "next/server"
import { telegramNotifier } from "@/lib/notifications/telegram-notifier"
import { extractRequestContext } from "@/lib/notifications/helpers"


export async function POST(request: Request){
    try {
        const user = await AuthManager.getAuthenticatedUser();
        const { ip, contact, userName } = extractRequestContext(request, user);

        const response = NextResponse.json({ success: true })
        AuthManager.clearAuthCookie(response)

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