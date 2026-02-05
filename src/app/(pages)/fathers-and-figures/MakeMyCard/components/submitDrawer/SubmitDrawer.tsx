// 'use client'
import React from 'react'
import { toast } from '@/hooks/use-toast'
import StoryCanvasCard from '../cardBackground/StoryCanvasCard'
import { DownloadIcon, SendIcon, Loader } from "lucide-react"
import { useAuthContext } from '@/auth/useAuthContext'
import { UserSessionCard } from '@/app/my_components/AuthCard'
import { ProtectedActionDrawer } from '@/components/auth/ProtectedActionDrawer'
import ToggleCanvasButton from '../cardBackground/ToggleCanvasButton'
import { useDownloadImage } from '@/_hooks/useDownloadImage'
import { useRef, useState } from "react"
import { useMyCardContext } from '../../context/MyCardContext'
import type { PostStoryResponse } from '@/types/stories'


const SubmitDrawer = ({artCanvasRef}: {artCanvasRef: React.RefObject<HTMLDivElement | null>}) => {

    const { user } = useAuthContext();
    const { url, myStory, myName } = useMyCardContext();
    const storyCardRef = useRef<HTMLDivElement>(null)
    const { downloadImage, loading: downloadLoading } = useDownloadImage({ downloadRef: storyCardRef })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (!myStory.trim()) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Description is required",
            });
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch('/api/stories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storyText: myStory,
                    signature: myName,
                    backgroundUrl: url,
                }),
            });

            const data: PostStoryResponse = await response.json();

            if (data.success) {
                toast({
                    title: "Success!",
                    description: "Your story has been submitted successfully.",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Submission failed",
                    description: data.error || "An unexpected error occurred.",
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to connect to the server.",
            });
        } finally {
            setSubmitting(false);
        }
    }

    
  return (
        <ProtectedActionDrawer
            mode="view"
            description='An small verify to keep stories human' 
            drawerClassName='backdrop-blur-sm min-h-[70vh] w-full p-2 items-center justify-center'
            trigger={
                <button className='w-full button-style h-full m-auto'>
                    Submit my card
                </button>
            }
        >
            <UserSessionCard>
                <div>
                    <div className='flex items-center justify-center'>
                        <StoryCanvasCard ref={storyCardRef}/>
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center w-full'>
                    <div className='flex flex-row gap-2 text-xs justify-between w-full'>
                        <ToggleCanvasButton artCanvasRef={artCanvasRef} />
                        <button 
                            className='flex-1 flex items-center justify-center gap-2 button-style' 
                            disabled={downloadLoading}
                            onClick={downloadImage}
                        >
                            {downloadLoading ? <><Loader className='animate-spin h-4 w-4' /> Downloading... </>: <><DownloadIcon className="h-4 w-4" />Download</>}
                        </button>
                        <button
                            className='flex-1 flex items-center justify-center gap-2 button-style'
                            disabled={submitting}
                            onClick={handleSubmit}
                        >
                            {submitting ? (
                                <><Loader className='animate-spin h-4 w-4' /> Submitting...</>
                            ) : (
                                <><SendIcon className="h-4 w-4"/>Submit</>
                            )}
                        </button>
                    </div>
                </div>
            </UserSessionCard>
        </ProtectedActionDrawer>
  )
}

export default SubmitDrawer
