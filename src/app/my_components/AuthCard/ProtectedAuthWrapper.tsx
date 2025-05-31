import React, { useEffect } from 'react'
import AuthCard from './AuthCard'
import { User } from '@/lib/auth/auth-types'
import { useAuthContext } from '@/auth/useAuthContext'

interface ProtectedAuthWrapperProps {
    children: React.ReactNode
    onAuthError?: (error: string) => void
    onAuthSuccess?: (user: User) => void
}

const ProtectedAuthWrapper = ({children, onAuthError, onAuthSuccess}: ProtectedAuthWrapperProps) => {
    const { isAuthenticated, user, loading, error } = useAuthContext()

    useEffect(()=>{
        if (error && onAuthError){
            onAuthError(error)
        }
        if (user && onAuthSuccess){
            onAuthSuccess(user)
        }

    }, [error, onAuthError, user, onAuthSuccess])

    if (loading) {
    return (
      <div className={`flex justify-center items-center`}>
        <p>Loading authentication status...</p> {/* Or a spinner */}
      </div>
    );
    }
    
    if(!user || !isAuthenticated){
        return (
        <AuthCard 
            onAuthError={onAuthError}
            onAuthSuccess={onAuthSuccess}
        />
    )
    }
  return (
    <>
     {children} 
    </>
  )
}

export default ProtectedAuthWrapper
