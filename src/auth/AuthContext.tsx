'use client';
import React, { createContext, useState } from 'react';
import { AuthContextType } from './types';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [OTP, setOTP] = useState<string>('');

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                userName, 
                email, 
                setEmail, 
                OTP,
                setOTP,
                setIsAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
