import React from 'react'
import AuthMethodInput from './inputs/AuthMethodInput'
import { AuthMethod, AuthStep } from '@/lib/auth/auth-types'
import PhoneInput from './inputs/PhoneInput'
import EmailInput from './inputs/EmailInput'
import OtpInput from './inputs/OtpInput'

interface AuthMethodRendererProps {
    onAuthMethodChange: (value: AuthMethod)=> void
    authStep: AuthStep
    authMethod: AuthMethod
    phone: string
    email: string,
    otp: string,
    loading: boolean
    error: string
    onPhoneChange: (phone: string) => void
    onPhoneSubmit: (phone: string) => Promise<void>
    onEmailChange: (email: string) => void
    onEmailSubmit: (email: string) => Promise<void>
    onOtpChange: (otp: string) => void
    onOtpSubmit: (otp: string) => Promise<void>
    onResendOtp: () => Promise<void>
    onEditContact: () => void
}

const AuthMethodRenderer: React.FC<AuthMethodRendererProps> = ({
    onAuthMethodChange,
    authStep,
    authMethod,
    phone,
    email,
    otp,
    loading,
    error,
    onPhoneChange,
    onPhoneSubmit,
    onEmailChange,
    onEmailSubmit,
    onOtpChange,
    onOtpSubmit,
    onResendOtp,
    onEditContact
}) => {

    switch(authStep){
        case 'input':
            return(
            <>
                <AuthMethodInput 
                    value={authMethod} 
                    onAuthMethodChange={onAuthMethodChange}
                />
                { authMethod === 'phone' ? 
                (
                    <PhoneInput 
                        phone={phone}
                        loading={loading}
                        error={error}
                        onChange={onPhoneChange}
                        onSubmit={onPhoneSubmit}
                    />

                ) : (
                    <EmailInput 
                        email={email}
                        loading={loading}
                        error={error}
                        onChange={onEmailChange}
                        onSubmit={onEmailSubmit}
                    />
                )}
            </>
            )
            
        case 'otp':
            return(
                <OtpInput 
                    otp={otp}
                    onChange={onOtpChange}
                    loading={loading}
                    onSubmit={onOtpSubmit}
                    error={error}
                    onResendOtp={onResendOtp}
                    onEditContact={onEditContact}
                />
            )
        case 'verified':
            return(
                <div>Verified now</div>
            )
        default:
            return <div>Default</div>
    }
}

export default AuthMethodRenderer
