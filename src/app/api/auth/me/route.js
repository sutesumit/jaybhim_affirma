import { NextResponse } from "next/server"
import { AuthManager } from "@/lib/auth/auth-manager"

export async function GET(){
    try {

        const user = await AuthManager.getAuthenticatedUser()

        if (!user){
            return NextResponse.json(
                { error: 'User not Authenticated'},
                { status: 401}
            )
        }

        return NextResponse.json(
            user
        )
    } catch (error) {
        console.error('[me]: Error in getting currennt user',  error)
        return NextResponse.json({ success: false, error: 'Failed to Authenticate, try again!'})
    }
}