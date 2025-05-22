import React, { use } from 'react'
import EmailInput from './EmailInput'
import OTPInput from './OTPInput'
import GetOTP from './GetOTP'
import VerifyButton from './VerifyButton'
import { useAuthContext } from '../useAuthContext'

const AuthInputs = () => {
    const { email, OTP } = useAuthContext()
  return (
    <div className='flex flex-col items-center justify-center p-3 gap-4'>
        <p className="text-sm text-muted-foreground">Keep the trolls at bay — verify to stay:</p>
        <p className="text-sm text-muted-foreground">{email} : {OTP}</p>
      <div className='email-input w-full flex flex-col items-center justify-center gap-4'>
          <EmailInput />
          <GetOTP />
      </div>
      <div className='otp-input w-full flex flex-col items-center justify-center gap-4'>
          <OTPInput />
          <VerifyButton />
      </div>   
    </div>
  )
}

export default AuthInputs
