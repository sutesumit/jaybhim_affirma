import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from '@radix-ui/react-label'
import { Check, Loader, ReplyAll } from 'lucide-react'
import { OtpInputProps } from '@/lib/auth/auth-types'

const OtpInput: React.FC<OtpInputProps> = ({
    otp,
    onChange,
    loading,
    onSubmit,
    error,
    onResend
}) => {

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!loading && otp.length === 6) {
            await onSubmit(otp)
        }
    }

    const handleResend = async (e: React.MouseEvent) => {
      // alert('clicked')
      e.preventDefault()
      if (!loading && onResend){
        await onResend()
      }
    }

    return (
      <>
        <form 
            className="flex relative items-center space-y-1.5"
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
            <div className='absolute flex right-0 gap-1'>
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
              { onResend &&
              <>
              <Label className="sr-only" htmlFor="resend-otp">Resend OTP</Label>
              <button
                id='resend-otp'
                onClick={handleResend}
                className='disabled:cursor-not-allowed disabled:opacity-30 right-1 p-1 rounded-sm border-[1px] border-[var(--primary-blue)] hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
                disabled={loading}
              >
                {loading ?
                <Loader className='p-1 animate-spin'/> 
                :
                <ReplyAll className='-scale-x-100' />
                }
              </button>
              </>
              }
            </div>            
        </form>
        {error &&
          <div className="text-xs font-mono p-1 text-red-400">{error}</div>
        }
    </>
    )
}

export default OtpInput