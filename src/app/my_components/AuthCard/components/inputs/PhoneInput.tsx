import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { ForwardIcon, Loader } from 'lucide-react';
import { PhoneInputProps } from '@/lib/auth/auth-types';


const PhoneInput: React.FC<PhoneInputProps> = ({ 
    phone, 
    loading,
    error,
    onChange,
    onSubmit
}) => {
    
    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onSubmit(phone)
    }

    // TODO: remove this once the phone input auth flow is implemented
    error = 'We can’t afford SMS yet. Email it is.'
    
  return (
    <>
    <form 
        className="flex font-mono justify-center items-center space-y-1.5 relative"
        onSubmit={handlePhoneSubmit}
    >
        <Label className="sr-only" htmlFor="name">Phone Number:</Label>
        <Input 
            type="tel"
            value={phone}
            onChange={(e)=>onChange(e.target.value) }
            id="name" 
            placeholder="+919876543210" 
            disabled={true}
            className= {error ? `border-red-400 focus:border-red-400 pr-9` : `pr-9`}
        />
        <button 
            type='submit' 
            className='absolute disabled:cursor-not-allowed disabled:opacity-30 right-1 p-1 rounded-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
            disabled={true}
        >
            {loading ? <Loader className='p-1 animate-spin'/> : <ForwardIcon/>}
        </button>
    </form>
    {error &&
        <div className="text-xs font-mono p-1 text-red-400">{error}</div>
    }
    </>

  )
}

export default PhoneInput
