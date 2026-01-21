// 'use client'
import React from 'react'
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
import StoryCanvasCard from '../cardBackground/StoryCanvasCard'
import { DownloadIcon, SendIcon, Loader } from "lucide-react"
import { useAuthContext } from '@/auth/useAuthContext'
import { ProtectedActionDrawer, UserSessionCard } from '@/app/my_components/AuthCard'
import { X } from 'lucide-react'
import ToggleCanvasButton from '../cardBackground/ToggleCanvasButton'
import { useDownloadImage } from '@/_hooks/useDownloadImage'
import { useRef } from "react"
import { AuthService } from '@/lib/auth/auth-service'


const SubmitDrawer = ({artCanvasRef}: {artCanvasRef: React.RefObject<HTMLDivElement | null>}) => {

    const { user } = useAuthContext();
    const storyCardRef = useRef<HTMLDivElement>(null)
    const { downloadImage, loading } = useDownloadImage({ downloadRef: storyCardRef })

    
  return (
        <ProtectedActionDrawer
            mode="view"
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
                        <Button 
                            className='flex-1' 
                            variant="myStyle" 
                            disabled={loading}
                            onClick={downloadImage}
                        >
                            {loading ? <><Loader className='animate-spin' /> Downloading... </>: <><DownloadIcon/>Download</>}
                        </Button>
                        <Button
                            className='flex-1'
                            variant="myStyle"
                            onClick={() => {
                                alert('Sumit is Still working on this feature.')
                            }}
                        >
                            <SendIcon/>Submit
                        </Button>
                    </div>
                </div>
            </UserSessionCard>
        </ProtectedActionDrawer>
  )
}

export default SubmitDrawer
