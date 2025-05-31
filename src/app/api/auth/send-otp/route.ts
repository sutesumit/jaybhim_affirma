import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { AuthValidator } from "@/lib/auth/auth-validator"

export async function POST(request: Request) {
    try {
        const { phone, email } = await request.json()

        if (!phone && !email){
            return NextResponse.json(
                { error: '[send-otp route] Need either phone or email'},
                { status: 400}
            )
        }
        if (phone && email) {
            return NextResponse.json(
                { error: '[send-otp route] Provide either phone or email '},
                { status: 400}
            )
        }

        let payLoad: 
            | { phone: string, options?: { channel?: 'sms' | 'whatsapp' }}
            | { email: string}

        if(phone){
            const phoneValidation = AuthValidator.validatePhone(phone)
            if (!phoneValidation.isValid){
                return NextResponse.json(
                    { error: phoneValidation.error || 'Invalid Phone'},
                    { status: 422}
                )
            }
            const sanitizedPhone = AuthValidator.sanitizePhone(phone)
            payLoad = {
                'phone': sanitizedPhone,
                options: { channel: 'sms'}
            }
        } else {
            const emailValidation = AuthValidator.validateEmail(email)
            if (!emailValidation.isValid){
                return NextResponse.json(
                    { error: emailValidation.error || 'Invalid Email'},
                    { status: 422}
                )
            }
            const sanitizedEmail = AuthValidator.sanitizeEmail(email)
            payLoad = {
                'email': sanitizedEmail,
            }
        }

        const { error } = await supabase.auth.signInWithOtp(payLoad)

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