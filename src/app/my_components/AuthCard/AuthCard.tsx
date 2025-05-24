import React, { useState} from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import OTPInput from "./OTPInput"
import PhoneInput from "./PhoneInput"


const AuthCard: React.FC = () => {
    const [phone, setPhone] = React.useState('')
    const [otp, setOtp] = React.useState('')
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<'phone' | 'otp' >('phone')

    const handlePhoneSubmit = (submittedPhone: string) => {
      setLoading(true)
      console.log(`Phone submitted: ${submittedPhone}`)
      setTimeout(()=> {
        setLoading(false)
        setStep('otp')
      }, 1000)
    }

    const handleOtpSubmit = (submittedOtp: string) => {
      setLoading(true)
      console.log(`OTP Submitted: ${submittedOtp}`)
      setTimeout(()=> {
        setLoading(false)
        console.log(`OTP Verification simulated. No actual verification yet!`)
      }, 1000)
    }


  return (
    <Card className="w-[350px]">
      <CardHeader>
        {/* <CardTitle>Create project</CardTitle> */}
        <CardDescription 
            className="text-xs text-center"
        >
            Keep the trolls at bay — verify to stay:
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <PhoneInput 
                phone={phone} 
                loading={loading}
                onChange={setPhone}
                onSubmit={handlePhoneSubmit}
            />
            <OTPInput 
                otp={otp} 
                onChange={setOtp}
                loading={loading}
                maxLength={6}
                onSubmit={handleOtpSubmit}
            />
          </div>
      </CardContent>
    </Card>
  )
}

export default AuthCard