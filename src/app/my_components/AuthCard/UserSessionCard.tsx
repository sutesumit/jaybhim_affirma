'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { useAuthContext } from '@/auth/useAuthContext'
import { AuthService } from '@/lib/auth/auth-service'
import { toast } from '@/hooks/use-toast'
import { notifyProfileUpdate } from '@/auth/AuthContext'
import { Pencil, Check, X, Loader2 } from 'lucide-react'
import ContributionSummary from './components/ContributionSummary'

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
    // No longer need internal hook here as ContributionSummary handles it

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
                notifyProfileUpdate();
                setIsEditing(false);
                toast({
                    variant: "success",
                    title: "Nice New Name",
                    description: "Your badge just got a tiny upgrade.",
                });
            }
        } catch (error) {
            console.error("Update profile error", error);
            toast({
                variant: "destructive",
                title: "Oops. Update Failed",
                description: "That didn’t quite work. Mind trying again?",
            });
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
            toast({
                variant: "info",
                title: "Logged Out ✌️",
                description: "You’ve escaped. For now.",
            });
            window.location.reload();
        } catch (error) {
            console.log("Logout Error", error);
            toast({
                variant: "destructive",
                title: "Logout Failed",
                description: "The logout door was jammed. Retry?",
            });
        }
    }

    return (
        <Card className={`w-full min-w-[22rem] card-bg card-shadow ${className}`}>
            <CardHeader className='pb-2'>
                <CardDescription className='text-center min-h-[4.5rem] flex flex-col items-center justify-center'>
                    {description ? description : (
                        <>
                            Jai Bhim, <br />
                            <div
                                className="relative inline-flex items-center justify-center group min-h-[30px] my-1 cursor-text"
                                onClick={() => !isEditing && setIsEditing(true)}
                            >
                                {/* Ghost Span: Drives width, always rendered */}
                                <span className={`px-2 py-1 font-semibold text-center glass-hover rounded min-w-[3rem] whitespace-pre select-none ${isEditing ? 'opacity-0' : 'opacity-100'}`}>
                                    {(isEditing ? newName : (user?.display_name || "Digital Bro")).replace(/ /g, "\u00a0") || "\u00a0"}
                                </span>

                                {/* Overlay Input: Matches span dimensions exactly */}
                                {isEditing && (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="absolute inset-0 w-full h-full bg-transparent border-none font-semibold text-center text-sm px-2 py-1 focus:outline-none focus:ring-0"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleUpdateName();
                                            if (e.key === 'Escape') handleCancel();
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}

                                {/* Controls: Absolutely positioned outside flow */}
                                <div className="absolute left-full pl-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleUpdateName(); }}
                                                disabled={isLoading}
                                                className="h-7 w-7 glass-hover rounded-sm inline-flex items-center justify-center focus:outline-none transition-colors text-green-400"
                                            >
                                                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCancel(); }}
                                                disabled={isLoading}
                                                className="h-7 w-7 glass-hover rounded-sm inline-flex items-center justify-center transition-colors text-red-400"
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <span className="h-7 w-7 inline-flex items-center justify-center glass-hover rounded opacity-20 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Pencil size={14} />
                                        </span>
                                    )}
                                </div>
                            </div>
                            <ContributionSummary />
                        </>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {children}
                <div
                    onClick={handleLogout}
                    className='w-full text-center text-xs cursor-pointer destructive-button-style py-1'
                >
                    Logout
                </div>
            </CardContent>
        </Card>
    )
}