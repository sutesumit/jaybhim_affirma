
import { NextResponse } from "next/server"
import { User } from "./auth-types"
import { cookies } from "next/headers"

export class AuthManager {
    private static readonly COOKIE_NAME = 'auth-token'
    private static readonly COOKIE_MAX_AGE = 60 * 60 * 24 * 10

    static setAuthCookie(response: NextResponse, user: User): void{
        const userData = JSON.stringify({
            id: user.id,
            phone: user.phone,
            created_at: user.created_at
        })

        response.cookies.set(this.COOKIE_NAME, userData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: this.COOKIE_MAX_AGE,
            path: '/'
        })
    }

    static async getAuthenticatedUser(): Promise<User | null>{
        try {
            const cookieStore = cookies()
            const authCookie = (await cookieStore).get(this.COOKIE_NAME)
    
            if (!authCookie?.value){
                return null
            }
            const userData = JSON.parse(authCookie.value)
            if (!userData.id || !userData.phone){
                console.warn('AuthManager: Invalid user data in auth cookie')
                return null
            }
            return userData as User
        } catch (error) {
            console.error('AuthManager: Error in parsing cookies', error)
            return null
        }
    }

    static async clearAuthCookie(response: NextResponse): Promise<void>{
        response.cookies.delete(this.COOKIE_NAME)
    }

    static async isAuthenticated():Promise<boolean>{
        const user = await this.getAuthenticatedUser()
        return user !== null
    }

}