import { useContext }from 'react';
import { AuthContextType } from './types';
import { AuthContext } from './AuthContext';

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};