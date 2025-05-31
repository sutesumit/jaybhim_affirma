export class AuthValidator {
    private static readonly PHONE_REGEX = /^\+[1-9]\d{1,14}$/
    private static readonly OTP_REGEX = /^\d{6}$/
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    static validatePhone (phone: string): {isValid: boolean, error?: string}{
        if (!phone?.trim()){
            return {
                isValid: false, 
                error: 'Mate, drop your phone digits first!'
            }
        }
        if (!this.PHONE_REGEX.test(phone)){
            return {
                isValid: false, 
                error: 'Give those digits a quick fix and have a country code!'
            }
        }      
        return { isValid: true}
    }

    static validateOtp (submittedOtp: string): { isValid: boolean, error?: string }{
        if (!submittedOtp.trim()){
            return {
                isValid: false,
                error: 'Type your magic OTP'
            }
        }
        if (!this.OTP_REGEX.test(submittedOtp)){
            return {
                isValid: false,
                error: 'OTP’s wobbly, balance it with 6 digits.'
            }
        }
        return { isValid: true }
    }

    static validateEmail = (email: string): {isValid: boolean, error?: string } => {
        if(!email.trim()){
            return {
                isValid: false,
                error: 'Mate, drop your email first!'
            }
        }
        if(!this.EMAIL_REGEX.test(email)){
            return {
                isValid: false,
                error: 'Give that email address a quick fix!'
            }
        }
        return({isValid: true})
    }

    static sanitizePhone (phone: string): string {
        return phone.trim().replace(/\s+/g,'') || ''
    }

    static sanitizeOtp (submittedOtp: string): string {
        return submittedOtp.trim().replace(/\D/g, '') || ''
    }

    static sanitizeEmail (email: string): string {
        return email.trim().toLowerCase().replace(/[^\x20-\x7E]/g, '') || ''
    }
}