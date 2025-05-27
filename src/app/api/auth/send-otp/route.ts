import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { AuthValidator } from "@/lib/auth/auth-validator"

export async function POST(request: Request) {
    try {
        const { phone } = await request.json()

        const phoneValidation = AuthValidator.validatePhone(phone)
        if (!phoneValidation.isValid){
            return NextResponse.json(
                { error: phoneValidation.error || 'Invalid Phone'},
                { status: 422}
            )
        }

        const sanitizedPhone = AuthValidator.sanitizePhone(phone)

        const { error } = await supabase.auth.signInWithOtp({
            phone: sanitizedPhone,
            options: { channel: 'sms'}
        })

        if (error){
            throw error
        }
        return NextResponse.json(
            {
                success: true,
                message: 'OTP Sent Successfully!'
            }
        )


    } catch (error: any) {
        console.error('[send-otp]', error)
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500})
    }
}