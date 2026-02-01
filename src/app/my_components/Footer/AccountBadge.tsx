'use client'
import React from 'react';
import { useAuthContext } from '@/auth/useAuthContext';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { UserSessionCard } from '@/app/my_components/AuthCard'
import { ProtectedActionDrawer } from '@/components/auth/ProtectedActionDrawer'
import { X } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"

const AccountBadge: React.FC = () => {
    const { user, isAuthenticated } = useAuthContext();
    const userName = user?.display_name || user?.email?.split('@')[0] || user?.phone || '';
    const authCardTriggerText = `${isAuthenticated ? `Jai Bhim, ${userName}` : 'Log in'}`;


    return (
        <ProtectedActionDrawer
            mode="view"
            description="Verify to leave love (or fair criticism)"
            trigger={
                <span className='router-tab cursor-pointer'>
                    {authCardTriggerText}
                </span>
            }
        >
            <UserSessionCard />
        </ProtectedActionDrawer>
    );
};

export default AccountBadge;
