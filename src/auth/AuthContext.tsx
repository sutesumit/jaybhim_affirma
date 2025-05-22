'use client';
import React, { createContext, useState } from 'react';
import { AuthContextType } from './types';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const userName = 'Sumit';

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName }}>
            {children}
        </AuthContext.Provider>
    );
};
