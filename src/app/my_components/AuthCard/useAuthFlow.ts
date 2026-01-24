import { useAuthContext } from "@/auth/useAuthContext";
import { AuthService } from "@/lib/auth/auth-service";
import { AuthMethod, AuthStep } from "@/lib/auth/auth-types";
import { AuthValidator } from "@/lib/auth/auth-validator";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface AuthStateProps  {
    phone: string;
    email: string;
    otp: string;
    error: string;
    authStep: AuthStep;
    authMethod: AuthMethod;
    loading: boolean;
    }

interface AuthActionProps{
    setPhone: (phone: string) => void
    setEmail: (email: string) => void
    setOtp: (otp: string) => void
    setAuthMethod: (authMethod: AuthMethod) => void
    handleSendOtp: (contact: string) => Promise<void>
    handleVerifyOtp: (otp: string) => Promise<void>
    handleResendOtp: () => Promise<void>
    handleChangeContact: () => void
}

const useAuthFlow = (
        onAuthError?: (error: string) => void,
        onAuthSuccess?: (user: any) => void
    ): AuthStateProps & AuthActionProps  => {

    const [ state, setState ] = useState<AuthStateProps>({
        phone: '',
        email: '',
        otp: '',
        error: '',
        authStep: 'input',
        authMethod: 'email',
        loading: false
    })

    const { setUser } = useAuthContext()
    const router = useRouter()

    const updateState = (newState: Partial<AuthStateProps>) => {
        setState(prev => ({...prev, ...newState}))
    }

    const handleSendOtp = useCallback(async (contact: string) => {
        updateState({loading: true, error: ''})

        const contactValidation = state.authMethod === 'phone'
            ? AuthValidator.validatePhone(contact)
            : AuthValidator.validateEmail(contact)

        if(!contactValidation.isValid){
        const error = contactValidation.error || 'Invalid contact'
        updateState({error, loading: false })
        onAuthError?.(error)
        return
        }

        try {
        const result = await AuthService.sendOtp(contact, state.authMethod)

        if(result.success){
            updateState({
            authStep: 'otp',
            [state.authMethod]: contact,
            loading: false,
            })
            toast({
              variant: "success",
              title: "OTP Sent",
              description: `It's bettween you and ${state.authMethod === 'phone' ? 'phone' : 'email'} inbox now.`,
            })
        } else {
            const error = result.error || 'Failed to send OTP'
            updateState({error, loading: false})
            onAuthError?.(error)
        }          
        } catch (error) {
        const errorMessage = 'OTP Service Error, try again!'
        updateState({error: errorMessage, loading: false})
        onAuthError?.(errorMessage)
        }
    },[state.authMethod, onAuthError])

    const handleVerifyOtp = useCallback(async(submittedOtp: string)=>{
        updateState({loading: true, error: ''})
        const contactValidation = state.authMethod === 'phone'
        ? AuthValidator.validatePhone(state.phone)
        : AuthValidator.validateEmail(state.email)
        const otpValidation = AuthValidator.validateOtp(submittedOtp)

        if(!contactValidation.isValid || !otpValidation.isValid){
            const error = contactValidation.error || otpValidation.error || 'Invalid Credentials'
            updateState({ error, loading: false })
            onAuthError?.(error)
            return
        }

        try {
            const phone = AuthValidator.sanitizePhone(state.phone)
            const email = AuthValidator.sanitizeEmail(state.email)

            // This part is not working for phones
            const result = await AuthService.verifyOtp(
                state.authMethod,
                submittedOtp,
                phone,
                email
            )
            console.log(`My results: ${result.success} for ${submittedOtp} and ${phone}`)

            if(result.success && result.user){
                setUser(result.user)
                updateState({loading: false, authStep: 'verified'})
                toast({
                  variant: "success",
                  title: "Jai bhim, mate!",
                  description: `Logged in as ${result.user.display_name || result.user.email || 'User'}. Act Natural.`,
                })
                onAuthSuccess?.(result.user)
                router.refresh()
            } else {
                const errorMessage = result.error || 'OTP Verification failed!'
                updateState({error: errorMessage, loading: false})
                onAuthError?.(errorMessage)
            }
        
        } catch (error) {
            const errorMessage = 'Error in verifying OTP, try again!'
            updateState({ error: errorMessage, loading: false })
            onAuthError?.(errorMessage)
        }

    }, [state.authMethod, state.otp, state.phone, state.email, onAuthError])

    const handleResendOtp = useCallback(async()=>{
        updateState({ loading: true, error:'', otp: '', authStep: 'otp' })
        const contact = state.authMethod === 'phone' ? state.phone : state.email
        await handleSendOtp(contact)
    },[handleSendOtp, state.authMethod, state.phone, state.email])

    const handleChangeContact = useCallback(()=> {
        updateState({authStep: 'input', error: '', otp: '', loading: false})
    }, [])

    return {
        ...state,
        setPhone: (phone: string) => updateState({phone}),
        setEmail: (email: string) => updateState({email}),
        setOtp: (otp: string)=> updateState({otp}),
        setAuthMethod: (authMethod: AuthMethod) => updateState({authMethod}),
        handleSendOtp,
        handleVerifyOtp,
        handleResendOtp,
        handleChangeContact,
    }
}

export default useAuthFlow