'use client';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { AuthContextType } from './types';
import { AuthState, User } from '@/lib/auth/auth-types';
import { AuthService } from '@/lib/auth/auth-service';

// Profile update subscribers
type ProfileUpdateCallback = () => void;
let profileUpdateSubscribers: ProfileUpdateCallback[] = [];

export const subscribeToProfileUpdates = (callback: ProfileUpdateCallback) => {
    profileUpdateSubscribers.push(callback);
    return () => {
        profileUpdateSubscribers = profileUpdateSubscribers.filter(cb => cb !== callback);
    };
};

export const notifyProfileUpdate = () => {
    profileUpdateSubscribers.forEach(cb => cb());
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        loading: true,
        error: null
    })


    const fetchUser = useCallback(async () => {
        setAuthState(prev => ({
            ...prev,
            loading: true,
            error: null
        }))
        
        try {
            const result = await AuthService.getCurrentUser()
            if (!result.success || !result.user){
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    error: 'User not found'
                })
            } else {
                setAuthState({
                    isAuthenticated: true,
                    user: result.user,
                    loading: false,
                    error: null
                })
            }
        } catch (error) {
            console.error('Failed to get the authenticated user', error)
            setAuthState({
                isAuthenticated: false,
                user: null,
                loading: false,
                error: 'Failed to connect. Try again!'
            })          
        }
    }, [])

    useEffect(()=>{
        fetchUser()
    }, [fetchUser])

    const setUser = useCallback((user: User | null) => {
        setAuthState({
            isAuthenticated: user !== null,
            user: user,
            loading: false,
            error: null
        })
    }, [])

    const logout = useCallback(async () => {
        setAuthState(prev => ({...prev, loading: true, error: null}))
        const result = await AuthService.logout()
        if (result.success){
            setAuthState({
                isAuthenticated: false,
                user: null,
                loading: false,
                error: null
            })
        } else {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: result.error || 'Failed to logout'
            }))
        }
    }, [])

    const contextValue = {
        ...authState,
        revalidate: fetchUser,
        setUser,
        logout
    }

    return (
        <AuthContext.Provider 
            value={contextValue}
        >
            {children}
        </AuthContext.Provider>
    );
};
