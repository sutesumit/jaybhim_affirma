import React, { useEffect, useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from '@radix-ui/react-label'
import { Check, Loader } from 'lucide-react'
import { OtpInputProps } from '@/lib/auth/auth-types'

const OtpInput: React.FC<OtpInputProps> = ({
    otp,
    onChange,
    loading,
    onSubmit,
    error,
    onResendOtp,
    onEditContact,
}) => {

    const [countdown, setCountdown] = useState(30)

    useEffect(()=>{
      let timer: NodeJS.Timeout
      if(countdown > 0 ){
        timer = setTimeout(()=>{
          setCountdown((prev)=> (prev-1))
        }, 1000)
      }
      return () => clearTimeout(timer)
    }, [countdown])

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!loading && otp.length === 6) {
            await onSubmit(otp)
        }
    }

    const handleResend = async (e: React.MouseEvent) => {
      e.preventDefault()
      if (!loading && onResendOtp && countdown === 0){
        await onResendOtp()
      }
    }

    return (
      <>
        <form 
            className="flex justify-evenly items-center space-y-1.5 font-mono"
            onSubmit={handleOtpSubmit}
        >
            
            <Label className="sr-only" htmlFor="otp">OTP:</Label>
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={onChange}
              disabled={loading}
            >
                <InputOTPGroup>
                    <InputOTPSlot className={error ? 'border-red-400 border-[1px]' : ''} index={0} />
                    <InputOTPSlot className={error ? 'border-red-400 border-[1px]' : ''} index={1} />
                    <InputOTPSlot className={error ? 'border-red-400 border-[1px]' : ''} index={2} />
                </InputOTPGroup>
                {/* <InputOTPSeparator /> */}
                <InputOTPGroup>
                    <InputOTPSlot className={error ? 'border-red-400 border-[1px]' : ''} index={3} />
                    <InputOTPSlot className={error ? 'border-red-400 border-[1px]' : ''} index={4} />
                    <InputOTPSlot className={error ? 'border-red-400 border-[1px]' : ''} index={5} />
                </InputOTPGroup>
            </InputOTP>
            <>
              <Label className="sr-only" htmlFor="submit-otp">Submit OTP</Label>
              <button
                  id='submit-otp'
                  type='submit'
                  className=' disabled:cursor-not-allowed disabled:opacity-30 p-1 rounded-sm border-[1px] border-[var(--primary-blue)] hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
                  disabled={loading || otp.length !== 6}
              >
                {loading ?
                <Loader className='p-1 animate-spin'/> 
                :
                <Check/>
                }
              </button>
            </>            
        </form>
        {error &&
          <div className="text-xs font-mono p-1 text-red-400">{error}</div>
        }
        <div className='flex font-mono text-primary justify-between mt-4'>
          <button 
            className='p-1 text-xs rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
            id='resend-otp'
            onClick={onEditContact}
            disabled={loading}
          >
            Edit Contact
          </button>
          <button 
            className='p-1 text-xs rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
            id='resend-otp'
            onClick={handleResend}
            disabled={loading || countdown > 0 }
          >
            {countdown > 0 ? `Resend in ${countdown}` :"Resend OTP"}
          </button>
        </div>
    </>
    )
}

export default OtpInput