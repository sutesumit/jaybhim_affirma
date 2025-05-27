import { AuthManager } from "@/lib/auth/auth-manager"
import { NextResponse } from "next/server"


export async function POST(){
    try {

        const response = NextResponse.json({ success: true })
        AuthManager.clearAuthCookie(response)
        return response
        
    } catch (error) {
        console.error('[logout]-server error.', error)
        return NextResponse.json(
            { error: 'Error in logging out.' },
            { status: 500}
        )
    }
}