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
import { ProtectedAuthWrapper } from '@/app/my_components/AuthCard'
import { X } from 'lucide-react'
import { AuthService } from '@/lib/auth/auth-service'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"

const AccountBadge: React.FC = () => {
    const { user, isAuthenticated } = useAuthContext();
    const userName = user?.email?.split('@')[0] || user?.phone || '';
    const authCardTriggerText = `${isAuthenticated ? `Jai Bhim, ${userName}` : 'Log in'}`;

    const handleLogout = async () => {
        try {
            await AuthService.logout()
            window.location.reload()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <span className='router-tab cursor-pointer'>
                    {authCardTriggerText}
                </span>
            </DrawerTrigger>
            <DrawerContent className='backdrop-blur-sm min-h-[50vh] w-full p-2 items-center justify-center'>
                <DrawerTitle className="hidden">Authentication</DrawerTitle>
                <ProtectedAuthWrapper>
                    <Card className="w-full max-w-[22rem] card-border card-bg card-shadow">
                        <CardHeader>
                            <CardDescription className="text-xs text-center">
                                Jai Bhim, <br /> <strong>{user?.email || user?.phone}</strong>. <br /> You are logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center">
                                <div 
                                    // variant="outline" 
                                    onClick={handleLogout}
                                    className="w-full text-center text-xs cursor-pointer button-style"
                                >
                                    Logout
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </ProtectedAuthWrapper>
                <DrawerClose asChild>
                    <X className='absolute top-2 right-2 cursor-pointer backdrop-blur-lg card-border hover:text-white hover:bg-primary rounded-full p-1 transition-colors duration-300' />
                </DrawerClose>
            </DrawerContent>
        </Drawer>
    );
};

export default AccountBadge;
