// 'use client'
import React from 'react'
import { toast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import StoryCanvasCard from '../cardBackground/StoryCanvasCard'
import { DownloadIcon, SendIcon, Loader } from "lucide-react"
import { useAuthContext } from '@/auth/useAuthContext'
import { UserSessionCard } from '@/app/my_components/AuthCard'
import { ProtectedActionDrawer } from '@/components/auth/ProtectedActionDrawer'
import ToggleCanvasButton from '../cardBackground/ToggleCanvasButton'
import { useDownloadImage } from '@/_hooks/useDownloadImage'
import { useRef } from "react"


const SubmitDrawer = ({artCanvasRef}: {artCanvasRef: React.RefObject<HTMLDivElement | null>}) => {

    const { user } = useAuthContext();
    const storyCardRef = useRef<HTMLDivElement>(null)
    const { downloadImage, loading } = useDownloadImage({ downloadRef: storyCardRef })

    
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
            <UserSessionCard 
                description={
                    <>All good! <strong>{user?.email || user?.phone}</strong> is now verified. Thanks for joining!</>
                }
            >
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
                            disabled={loading}
                            onClick={downloadImage}
                        >
                            {loading ? <><Loader className='animate-spin' /> Downloading... </>: <><DownloadIcon className="h-4 w-4" />Download</>}
                        </button>
                        <button
                            className='flex-1 flex items-center justify-center gap-2 button-style'
                            onClick={() => {
                                toast({
                                    variant: "destructive",
                                    title: "Work in Progress",
                                    description: "This feature is coming soon!",
                                })
                            }}
                        >
                            <SendIcon className="h-4 w-4"/>Submit
                        </button>
                    </div>
                </div>
            </UserSessionCard>
        </ProtectedActionDrawer>
  )
}

export default SubmitDrawer
