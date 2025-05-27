import { AuthValidator } from "@/lib/auth/auth-validator"
import { supabase } from "@/lib/supabase"
import { error } from "console"
import { data } from "jquery"
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

        const userData = {
            id: data.user.id,
            phone: data.user.phone,
            created_at: data.user.created_at
        }

        return NextResponse.json({ success: true, user: userData})

    } catch (error: any){
        console.error('[verify-otp]', error)
        return NextResponse.json({error: error.message || 'Server Error'}, { status: 500})
    }
}