import React, { useCallback, useState} from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import PhoneInput from "./PhoneInput"
import OtpInput from "./OtpInput"
import { AuthCardProps, AuthStep, User } from "@/lib/auth/auth-types"
import { AuthValidator } from "@/lib/auth/auth-validator"


const AuthCard: React.FC<AuthCardProps> = ({
  onAuthError,
  onAuthSuccess,
  title = "Keep the trolls at bay — verify to stay:",
  className = "w-[350px]"
}) => {
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<AuthStep>('phone')

    const handleSendOtp = useCallback(async (submittedPhone: string) => {
      setLoading(true)
      setError('')

      const validation = AuthValidator.validatePhone(submittedPhone)
      if(!validation.isValid){
        setError(validation.error || 'Those digits didn’t dial right. Fix them please.')
        onAuthError?.(validation.error || 'Those digits didn’t dial right. Fix them please.' )
        setLoading(false)
        return
      }

      try {
        console.log(`Simulating sending OTP to: ${AuthValidator.sanitizePhone(submittedPhone)}`)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStep('otp')
        setPhone(submittedPhone)
        console.log('Simulated OTP sent successfully')
      } catch (error){
        const errorMessage = '(Simulated Step): OTP is playing hard to get. Try again!'
        setError(errorMessage)
        onAuthError?.(errorMessage)
        console.error(`(Simulated: Error in sending the OTP`, error)
      } finally {
        setLoading(false)
      }

    }, [onAuthError])

    const handleVerifyOtp = useCallback(async (submittedOtp: string) => {
      setLoading(true)
      setError('')

      const phoneValidation = AuthValidator.validatePhone(phone)
      if (!phoneValidation.isValid){
        setError(phoneValidation.error || 'That doesn’t look like a valid number.')
        onAuthError?.(phoneValidation.error || 'That doesn’t look like a valid number.')
        setLoading(false)
        return
      }

      const otpValidation = AuthValidator.validateOtp(submittedOtp)
      if (!otpValidation.isValid){
        setError(otpValidation.error || 'OTP’s wobbly, balance it with 6 digits.')
        onAuthError?.(otpValidation.error || 'OTP’s wobbly, balance it with 6 digits.')
        setLoading(false)
        return
      }

      try {
        console.log(`Simulatting the verification of otp: ${AuthValidator.sanitizeOpt(submittedOtp)} sent to ${AuthValidator.sanitizePhone(phone)}!`)
        await new Promise(resolve => (setTimeout(resolve, 1500)))

        const simulatedUser: User = {
          id: 'user-id',
          phone: AuthValidator.sanitizePhone(phone),
          created_at: new Date().toISOString()
        }
        setStep('verified')
        onAuthSuccess?.(simulatedUser)
        console.log(`Successful simulation of OTP Authentication of user ${simulatedUser}`)


      } catch (error) {
        const errorMessage='Simulated: OTP got distracted midway. Send it again!'
        setError(errorMessage)
        onAuthError?.(errorMessage)
        console.error('Simulated: Error in OTP Validation', error)        
      } finally {
        setLoading(false)
      }

      // console.log(`OTP Submitted: ${submittedOtp}`)
      // setTimeout(()=> {
      //   setLoading(false)
      //   console.log(`OTP Verification simulated. No actual verification yet!`)
      // }, 1000)
    }, [phone, onAuthSuccess, onAuthError])

    const handleResendOtp = useCallback(async()=>{
      setOtp('')
      setError('')
      await handleSendOtp(phone)
    },[phone, handleSendOtp])

    const handleChangePhone = useCallback(async()=>{
      setStep('phone')
      setOtp('')
      setError('')
    },[])

    const stepContent = () => {
      switch(step){
        case "phone":
          return (
            <PhoneInput 
              phone={phone} 
              error={error}
              loading={loading}
              onChange={setPhone}
              onSubmit={handleSendOtp}
            />
          )
        case "otp":
          return (
            <OtpInput
              otp={otp} 
              error={error}
              onChange={setOtp}
              loading={loading}
              onSubmit={handleVerifyOtp}
              onResend={handleResendOtp}
              onBack={handleChangePhone}
            />
          )
        case "verified":
          return (
            <div className="text-center text-xs p-1 card-border">
              Verified Now 🎉
            </div>
          )
        default:
          return null;
      }
      
    }


  return (
    <Card className={`${className}`}>
      <CardHeader>
        {/* <CardTitle>Create project</CardTitle> */}
        <CardDescription 
            className="text-xs text-center"
        >
            {title}
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center">
            {stepContent()}
          </div>
      </CardContent>
    </Card>
  )
}

export default AuthCard