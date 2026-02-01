import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { ForwardIcon, Loader } from 'lucide-react';
import { EmailInputProps } from '@/lib/auth/auth-types';


const EmailInput: React.FC<EmailInputProps> = ({ 
    email, 
    loading,
    error,
    onChange,
    onSubmit
}) => {
    
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onSubmit(email)
    }
  return (
    <>
    <form 
        className="flex font-mono justify-center items-center space-y-1.5 relative"
        onSubmit={handleEmailSubmit}
    >
        <Label className="sr-only" htmlFor="name">Email ID:</Label>
        <Input 
            type="email"
            value={email}
            onChange={(e)=>onChange(e.target.value) }
            id="name" 
            placeholder="yourname@example.com" 
            disabled={loading}
            className= {error ? `border-red-400 focus:border-red-400 pr-9` : `pr-9`}
        />
        <button 
            type='submit' 
            className='absolute disabled:cursor-not-allowed disabled:opacity-30 right-1 p-1 rounded-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]'
            disabled={loading || !email.trim()}
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

export default EmailInput
