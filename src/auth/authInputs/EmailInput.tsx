import React from 'react'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '../useAuthContext'


const EmailInput = () => {
    const { email, setEmail } = useAuthContext()
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail?.(e.target.value)
    }
  return (
    <Input 
        className='w-full text-xs border border-[var(--primary-blue)] rounded-sm' 
        type="email" 
        name='email'
        placeholder='Your Email' 
        value={email}
        onChange={handleEmailChange}
    />
  )
}

export default EmailInput
