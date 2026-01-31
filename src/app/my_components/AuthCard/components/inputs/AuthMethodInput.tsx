import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AuthMethod } from '@/lib/auth/auth-types'

type AuthMethodInputProps = {
    value: AuthMethod
    onAuthMethodChange: (value: AuthMethod) => void
}


const AuthMethodInput: React.FC<AuthMethodInputProps> = ({ value, onAuthMethodChange }) => {
  return (
    <RadioGroup 
        defaultValue="email"
        value={value}
        className='m-auto flex mb-2 font-mono'
        onValueChange={onAuthMethodChange}
    >
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone">Phone</Label>
        </div>
    </RadioGroup>

  )
}

export default AuthMethodInput
