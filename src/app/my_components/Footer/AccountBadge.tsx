'use client'
import React from 'react';
import { useAuthContext } from '@/auth/useAuthContext';

const AccountBadge: React.FC = () => {
    const { user } = useAuthContext();
    const userName = user?.email?.split('@')[0] || '';

    return (
        <span className='router-tab'>
            Jai Bhim {userName}
        </span>
    );
};

export default AccountBadge;
