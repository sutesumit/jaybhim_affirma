import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
    try {
        const { phone } = await request.json()

        if (!phone){
            return NextResponse.json({ error: 'Invalid or missing phone number' }, { status: 400 })
        }

        const { error } = await supabase.auth.signInWithOtp({
            phone
        })

        if (error) throw error

        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 })


    } catch (error: any) {
        console.error('[send-otp]', error)
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500})
    }
}