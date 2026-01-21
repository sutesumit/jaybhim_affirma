import { AuthManager } from "@/lib/auth/auth-manager"
import { AuthValidator } from "@/lib/auth/auth-validator"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"


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
        
        const { data: { user, session }, error } = await supabase.auth.verifyOtp(payLoad)

        if(error){
            throw error
        }

        if (!user){
            return NextResponse.json(
                {error: 'No user data recieved, authentication failed.'}
            )
        }

        
        if (!user.id || (!user.phone && !user.email)) {
        console.error('[Auth Error] User object is incomplete:', user)

        return NextResponse.json(
            {
            error: 'Incomplete user data received from Supabase.',
            requiredFields: ['id', 'phone or email'],
            received: user,
            },
            { status: 400 }
        )
        }


        // Generate default display name
        let defaultDisplayName = "Co-Traveller";
        if (user.email) {
            defaultDisplayName = user.email.split('@')[0];
        } else if (user.phone) {
            const p = user.phone;
            defaultDisplayName = p.length > 5 
                ? `${p.substring(0, 3)}****${p.substring(p.length - 2)}` 
                : p;
        }

        // Fetch existing profile or create new one
        const { data: profile } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', user.id)
            .single();

        let displayNameToUse = profile?.display_name || defaultDisplayName;

        if (!profile) {
            await supabase.from('profiles').insert({
                id: user.id,
                display_name: defaultDisplayName
            });
        }

        const userData = {
            id: user.id,
            phone: user.phone ?? null,
            email: user.email ?? null,
            display_name: displayNameToUse,
            created_at: user.created_at
        }

        const response = NextResponse.json({ success: true, user: userData})
        AuthManager.setAuthCookie(response, userData, session?.access_token)
        return response

    } catch (error: any){
        console.error('[verify-otp]', error)
        return NextResponse.json({error: error.message || 'Server Error'}, { status: 500})
    }
}