import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"


export async function POST(request: Request){
    try {
        const { phone, token } = await request.json()

        if(!phone){
            return NextResponse.json({error: 'Invalid or missing phone'}, {status: 422 })
        }
        if(!token){
            return NextResponse.json({error: 'Invalid or missing OTP'}, { status: 422 })
        }

        const { data, error } = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms'
        })

        if(error) throw error

        return NextResponse.json({ success: true, user: data.user})

    } catch (error: any){
        console.error('[verify-otp]', error)
        return NextResponse.json({error: error.message || 'Server Error'}, { status: 500})
    }
}