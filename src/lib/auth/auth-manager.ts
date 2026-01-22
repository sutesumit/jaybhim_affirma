
import { NextResponse } from "next/server"
import { User } from "./auth-types"
import { cookies } from "next/headers"

export class AuthManager {
    private static readonly COOKIE_NAME = 'auth-token'
    private static readonly COOKIE_MAX_AGE = 60 * 60 * 24 * 10

    static setAuthCookie(response: NextResponse, user: User, accessToken?: string): void{
        const userData = JSON.stringify({
            id: user.id,
            phone: user.phone ?? null,
            email: user.email ?? null,
            display_name: user.display_name ?? null,
            created_at: user.created_at,
            accessToken: accessToken || user.accessToken
        })

        response.cookies.set(this.COOKIE_NAME, userData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: this.COOKIE_MAX_AGE,
            path: '/'
        })
    }

    private static isTokenExpired(token: string): boolean {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return true;
            
            const payloadBase64 = parts[1];
            if (!payloadBase64) return true;
            
            const normalized = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
            const buffer = Buffer.from(normalized, 'base64');
            const payloadJson = JSON.parse(buffer.toString());
            
            if (typeof payloadJson.exp === 'number') {
                const now = Math.floor(Date.now() / 1000);
                return payloadJson.exp < (now - 5); 
            }
            return false;
        } catch (e) {
            return true;
        }
    }

    static async getAuthenticatedUser(): Promise<User | null>{
        try {
            const cookieStore = cookies()
            const authCookie = (await cookieStore).get(this.COOKIE_NAME)
    
            if (!authCookie?.value){
                return null
            }
            const userData = JSON.parse(authCookie.value)

            if (userData.accessToken && this.isTokenExpired(userData.accessToken)) {
                return null;
            }


            if (!userData.id || (!userData.phone && !userData.email) ){
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