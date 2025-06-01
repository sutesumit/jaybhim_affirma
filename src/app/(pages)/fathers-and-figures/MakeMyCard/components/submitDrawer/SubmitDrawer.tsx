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
import { ProtectedAuthWrapper } from '@/app/my_components/AuthCard'
import { X } from 'lucide-react'
import ToggleCanvasButton from '../cardBackground/ToggleCanvasButton'
import { useDownloadImage } from '@/_hooks/useDownloadImage'
import { useRef } from "react"
import { AuthService } from '@/lib/auth/auth-service'


const SubmitDrawer = ({artCanvasRef}: {artCanvasRef: React.RefObject<HTMLDivElement | null>}) => {

    const { user } = useAuthContext();
    const storyCardRef = useRef<HTMLDivElement>(null)
    const { downloadImage, loading } = useDownloadImage({ downloadRef: storyCardRef })

    const handleLogout = async () => {
        try {
            await AuthService.logout()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
        <Drawer>
                <DrawerTrigger className='w-full h-full m-auto'>
                    <>
                        Submit my card
                    </>
                </DrawerTrigger>
                <DrawerContent className='backdrop-blur-sm min-h-[70vh] w-full p-2 items-center justify-center'>
                    <DrawerTitle></DrawerTitle>
                        <ProtectedAuthWrapper>
                            <DrawerDescription className='text-xs mt-6 text-gray-500'>
                                All good! {user?.email || user?.phone} is now verified. Thanks for joining!
                                <button
                                    onClick={handleLogout} 
                                    className='px-1 mx-1 border-[1px] border-gray-500 rounded-sm cursor-pointer hover:bg-gray-500 hover:text-white transition-colors duration-300'
                                >
                                    Click to Logout
                                </button>
                            </DrawerDescription>
                            <DrawerHeader className=''>
                                <div
                                    className='text-container items-center justify-center'     
                                >
                                    <StoryCanvasCard ref={storyCardRef}/>
                                </div>
                            </DrawerHeader>
                            <DrawerFooter className='flex flex-col gap-2 justify-center items-center w-full text-container'>
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
                            </DrawerFooter>
                        </ProtectedAuthWrapper>
                        <DrawerClose asChild>
                            <X className='absolute top-2 right-2 cursor-pointer backdrop-blur-lg card-border hover:text-white hover:bg-primary rounded-full p-1 transition-colors duration-300' />
                        </DrawerClose>
                    </DrawerContent>
        </Drawer>
  )
}

export default SubmitDrawer
