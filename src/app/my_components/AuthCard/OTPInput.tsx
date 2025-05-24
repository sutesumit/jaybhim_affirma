import React from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from '@radix-ui/react-label'
import { Check, Loader } from 'lucide-react';



interface OTPInputProps {
  otp: string
  maxLength: number
  onChange: (otp: string) => void
  loading: boolean
  onSubmit: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  otp, 
  maxLength,
  onChange, 
  loading,
  onSubmit
}) => {

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loading && otp.length === 6){
      onSubmit(otp)
    }
  }

  return (
    <form 
      className="flex relative items-center space-y-1.5"
      onSubmit={handleOtpSubmit}
    >
      <Label className="sr-only" htmlFor="otp">OTP:</Label>
      <InputOTP maxLength={maxLength} value={otp} onChange={onChange}
      >
          <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
          </InputOTPGroup>
          {/* <InputOTPSeparator /> */}
          <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
          </InputOTPGroup>
      </InputOTP>
      <button 
            type='submit' 
            className='absolute disabled:cursor-not-allowed disabled:opacity-30 right-1 p-1 rounded-sm border-[1px] border-[var(--primary-blue)] hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
            disabled={loading || otp.length !== maxLength }
        >
            {loading ? <Loader className='p-1 animate-spin'/> : <Check />}
        </button>
    </form>
  )
}

export default OTPInput