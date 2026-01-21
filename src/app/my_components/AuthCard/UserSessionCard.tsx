'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { useAuthContext } from '@/auth/useAuthContext'
import { AuthService } from '@/lib/auth/auth-service'
import { Pencil, Check, X, Loader2 } from 'lucide-react'

interface UserSessionCardProps {
    description?: React.ReactNode,
    children?: React.ReactNode,
    className?: string,
}

export const UserSessionCard: React.FC<UserSessionCardProps> = ({
    description,
    children,
    className,
}) => {
    const { user, setUser } = useAuthContext();
    const [newName, setNewName] = React.useState('');
    const [isEditing, setIsEditing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    // Initialize newName when entering edit mode or when user changes
    React.useEffect(() => {
        if (isEditing && user?.display_name) {
            setNewName(user.display_name);
        }
    }, [isEditing, user?.display_name]);

    const handleUpdateName = async () => {
        if (!newName.trim()) return;
        setIsLoading(true);
        try {
            const result = await AuthService.updateProfile(newName);
            if (result.success && result.user) {
                setUser(result.user);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Update profile error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewName(user?.display_name || '');
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            window.location.reload();
        } catch (error) {
            console.log("Logout Error", error);
        }
    }

    return (
        <Card className={`w-full min-w-[22rem] card-border card-bg card-shadow ${className}`}>
            <CardHeader>
                <CardDescription className='text-xs text-center min-h-[4.5rem] flex flex-col items-center justify-center'>
                    {description ? description : (
                        <>
                            Jai Bhim, <br />
                            {isEditing ? (
                                <div className="flex items-center justify-center gap-2 mt-1">
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="inline-flex checkbox w-30 items-baseline gap-2 glass-hover rounded px-2 py-1 my-1 text-sm text-center focus:outline-none focus:border-white/40"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleUpdateName();
                                            if (e.key === 'Escape') handleCancel();
                                        }}
                                    />
                                    <button 
                                        onClick={handleUpdateName} 
                                        disabled={isLoading}
                                        className="h-7 w-7 glass-hover rounded-sm inline-flex items-center justify-center focus:outline-none focus:border-white transition-colors text-green-400"
                                    >
                                        {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                    </button>
                                    <button 
                                        onClick={handleCancel}
                                        disabled={isLoading} 
                                        className="h-7 w-7 glass-hover rounded-sm inline-flex items-center justify-center transition-colors text-red-400"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex w-30 checkbox items-center relative justify-center gap-2 group cursor-pointer" 
                                    onClick={() => setIsEditing(true)}
                                >
                                    <span className="h-7 inline-flex items-center justify-center glass-hover rounded px-2 text-sm text-center">
                                        {user?.display_name || "Digital Bro"}
                                    </span>
                                    <span className="h-7 w-7 absolute -right-8 top-1/2 -translate-y-1/2 inline-flex items-center justify-center glass-hover rounded opacity-20 group-hover:opacity-100 transition-opacity">
                                        <Pencil size={14} />
                                    </span>
                                </div>
                            )}
                            <span className="mt-1 block">You are logged in.</span>
                        </>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {children}
                <div
                    onClick={handleLogout}
                    className='w-full text-center text-xs cursor-pointer button-style py-2'
                >
                    Logout
                </div>
            </CardContent>
        </Card>
    )
}