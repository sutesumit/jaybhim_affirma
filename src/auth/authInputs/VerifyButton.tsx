import React from 'react'
import { useAuthContext } from '@/auth/useAuthContext'


const GetOtp = () => {
    const { setIsAuthenticated } = useAuthContext();
  return (
    <div className='!button-style p-1 flex justify-center text-sm text-muted-foreground'
        onClick={() => setIsAuthenticated?.(true)}
    >
      It’s Me, OTP Promise!
    </div>
  )
}

export default GetOtp