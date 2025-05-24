import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { ForwardIcon, Loader } from 'lucide-react';

interface PhoneInputProps {
    phone: string,
    loading: boolean;
    onChange: (value: string) => void;
    onSubmit: (phone: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ 
    phone, 
    loading, 
    onChange,
    onSubmit
}) => {
    
    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(phone)
    }
  return (
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
            placeholder="+919034567890" 
            disabled={loading}
        />
        <button 
            type='submit' 
            className='absolute disabled:cursor-not-allowed disabled:opacity-30 right-1 p-1 rounded-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
            disabled={loading || !phone.trim()}
        >
            {loading ? <Loader className='p-1 animate-spin'/> : <ForwardIcon/>}
        </button>
    </form>
  )
}

export default PhoneInput
