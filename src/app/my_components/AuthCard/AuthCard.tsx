import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import { AuthCardProps, User } from "@/lib/auth/auth-types"
import AuthMethodRenderer from "./AuthMethodRenderer"
import useAuthFlow from "./useAuthFlow"




const AuthCard: React.FC<AuthCardProps> = ({
  onAuthError,
  onAuthSuccess,
  title = "Verify to share your thoughts or leave a mark:",
  className = "w-[350px]"
}) => {

  const { 
    authMethod,
    authStep, 
    setAuthMethod, 
    phone,
    email,
    otp,
    loading, 
    error, 
    handleSendOtp, 
    setPhone,
    setEmail,
    setOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleChangeContact
  } = useAuthFlow(onAuthError, onAuthSuccess)

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardDescription 
            className="text-center"
        >
            {title}
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center">
            <AuthMethodRenderer 
                authMethod={authMethod}
                authStep={authStep}
                onAuthMethodChange={setAuthMethod}
                phone={phone}
                email={email}
                otp={otp}
                loading={loading}
                error={error}
                onPhoneChange={setPhone}
                onPhoneSubmit={handleSendOtp}
                onEmailChange={setEmail}
                onEmailSubmit={handleSendOtp}
                onOtpChange={setOtp}
                onOtpSubmit={handleVerifyOtp}
                onResendOtp={handleResendOtp}
                onEditContact={handleChangeContact}
            />
          </div>
      </CardContent>
    </Card>
  )
}

export default AuthCard
