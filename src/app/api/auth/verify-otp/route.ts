import { AuthManager } from "@/lib/auth/auth-manager"
import { AuthValidator } from "@/lib/auth/auth-validator"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { stringify } from "querystring"


export async function POST(request: Request){
    try {
        const { phone, email, token } = await request.json()

        if (!phone && !email){
            return NextResponse.json(
                { error: '[verify-otp route] Need either phone or email'},
                { status: 400}
            )
        }
        if (phone && email) {
            return NextResponse.json(
                { error: '[verify-otp route] Provide either phone or email '},
                { status: 400}
            )
        }

        const otpValidation = AuthValidator.validateOtp(token)
        if (!otpValidation.isValid){
            return NextResponse.json(
                { error: otpValidation.error || 'Invalid OTP'},
                { status: 422 }
            )
        }
        const sanitizedOpt = AuthValidator.sanitizeOtp(token)

        let payLoad :
        | { phone: string, token: string, type: 'sms'}
        | { email: string, token: string, type: 'email' };
        
        if(phone){
            const phoneValidation = AuthValidator.validatePhone(phone)
            if(!phoneValidation.isValid){
                return NextResponse.json(
                    { error: phoneValidation.error || 'Invalid Phone.'},
                    { status: 422 }
                )
            }
            const sanitizedPhone = AuthValidator.sanitizePhone(phone)

            payLoad = {
                phone: sanitizedPhone,
                token: sanitizedOpt,
                type: 'sms'
            }
        } else {
            const emailValidation = AuthValidator.validateEmail(email)
            if(!emailValidation.isValid){
                return NextResponse.json(
                    { error: emailValidation.error || 'Invalid Email'},
                    { status: 422 } 
                )
            }
            const sanitizedEmail = AuthValidator.sanitizeEmail(email)
            payLoad = {
                email: sanitizedEmail,
                token: sanitizedOpt,
                type: 'email'
            }
        }
        console.log(`Payload: ${stringify(payLoad)}`)
        const { data, error } = await supabase.auth.verifyOtp(payLoad)

        if(error){
            throw error
        }

        if (!data.user){
            return NextResponse.json(
                {error: 'No user data recieved, authentication failed.'}
            )
        }

        
        if (!data.user.id || (!data.user.phone && !data.user.email)) {
        console.error('[Auth Error] User object is incomplete:', data.user)

        return NextResponse.json(
            {
            error: 'Incomplete user data received from Supabase.',
            requiredFields: ['id', 'phone or email'],
            received: data.user,
            },
            { status: 400 }
        )
        }

        const userData = {
            id: data.user.id,
            phone: data.user.phone ?? null,
            email: data.user.email ?? null,
            created_at: data.user.created_at
        }

        const response = NextResponse.json({ success: true, user: userData})
        AuthManager.setAuthCookie(response, userData)
        return response

    } catch (error: any){
        console.error('[verify-otp]', error)
        return NextResponse.json({error: error.message || 'Server Error'}, { status: 500})
    }
}