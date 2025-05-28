
import { AuthResult, OtpResult, User } from "./auth-types"
import { AuthValidator } from "./auth-validator"



export class AuthService {
    private static readonly API_BASE = '/api/auth'

    static async sendOtp(phone: string): Promise<OtpResult>{
        try {
            const phoneValidation = AuthValidator.validatePhone(phone)
            if(!phoneValidation.isValid){
                return { success: false, error: phoneValidation.error}
            }
            const sanitizedPhone = AuthValidator.sanitizePhone(phone)
            console.log(`AuthService: Sending the otp to ${sanitizedPhone}`)

            const response = await fetch(`${this.API_BASE}/send-otp`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ phone: sanitizedPhone })
            })

            const data = await response.json()

            if(!response.ok){
                return ({success: false, error: data.error || 'Failed to fetch OTP'})
            }
            return {
                success: true,
                message: data.message || 'OTP Sent successfully'
            }
        } catch (error: any) {
            console.error('AuthSerive: SendOTP Error', error)
            return { success: false, error: 'Network error, please try again!'}
        }
    }

    static async verifyOtp(phone: string, otp: string): Promise<AuthResult>{
        try {
            const phoneValidation = AuthValidator.validatePhone(phone)
            if (!phoneValidation.isValid){
                return ({success: false, error: 'Invalid Phone format'})
            }
            const otpValidation = AuthValidator.validateOtp(otp)
            if(!otpValidation.isValid){
                return ({success: false, error: 'Invalid OTP Format'})
            }

            const sanitizedPhone = AuthValidator.sanitizePhone(phone)
            const sanitizedOtp = AuthValidator.sanitizeOpt(otp)

            console.log(`AuthService: Initiate OTP verification of OTP: ${sanitizedOtp} for phone: ${sanitizedPhone}`)


            const response = await fetch(`${this.API_BASE}/verify-otp`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    phone: sanitizedPhone,
                    token: sanitizedOtp
                })
            })

            const data = await response.json()

            if(!response.ok){
                return ({success: false, error: data.error || 'Invalid OTP'})
            }

            return ({
                success: true,
                user: data.user
            })

        } catch (error) {
            console.error('AuthSerive: VerifyOtp Error', error)
            return { success: false, error: 'Network Error, failed to verify OTP' }
        }
    }

    static async logout(): Promise<{success: boolean, error?: string}>{
        try {
            console.log(`AuthService: Logging you out!`)

            const response = await fetch(`${this.API_BASE}/logout`, {
                method: 'POST',
            })

            if (!response.ok){
                const data = await response.json()
                return ({success: false, error: data.error || 'Failed to logout.'})
            }
            
            return { success: true }

        } catch (error) {
            console.error('AuthService: Error in logging out.')
            return { success: false, error: 'Network error in logging out, try again'}
        }
    }

    static async getCurrentUser(): Promise<AuthResult>{
        try {
            console.log(`Getting the current user.`)
            // await new Promise (resolve=>setTimeout(resolve, 1500))
            const response = await fetch(`${this.API_BASE}/me`)

            const data = await response.json()

            if (!response.ok){
                
                return { success: false, error: data.error || 'Not Authenticated' }
            }
            
            return { success: true, user: data as User}

        } catch (error) {
            console.log('AuthService: Error in getting current user.', error)
            return { success: false, error: 'Network error, Try again!'}
        }

    }
}