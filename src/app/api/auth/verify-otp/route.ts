import { AuthManager } from "@/lib/auth/auth-manager"
import { AuthValidator } from "@/lib/auth/auth-validator"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"


export async function POST(request: Request){
    try {
        const { phone, token } = await request.json()

        const phoneValidation = AuthValidator.validatePhone(phone)
        if(!phoneValidation.isValid){
            return NextResponse.json(
                { error: phoneValidation.error || 'Invalid Phone.'},
                { status: 422 }
            )
        }

        const otpValidation = AuthValidator.validateOtp(token)
        if (!otpValidation.isValid){
            return NextResponse.json(
                { error: otpValidation.error || 'Invalid OTP'},
                { status: 422 }
            )
        }

        const sanitizedPhone = AuthValidator.sanitizePhone(phone)
        const sanitizeOpt = AuthValidator.sanitizeOpt(token)

        const { data, error } = await supabase.auth.verifyOtp({
            phone: sanitizedPhone,
            token: sanitizeOpt,
            type: 'sms'
        })

        if(error){
            throw error
        }

        if (!data.user){
            return NextResponse.json(
                {error: 'No user data recieved, authentication failed.'}
            )
        }

        
        if (!data.user.id || !data.user.phone) {
        console.error('[Auth Error] User object is incomplete:', data.user)

        return NextResponse.json(
            {
            error: 'Incomplete user data received from Supabase.',
            requiredFields: ['id', 'phone'],
            received: data.user,
            },
            { status: 400 }
        )
        }

        const userData = {
            id: data.user.id,
            phone: data.user.phone,
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