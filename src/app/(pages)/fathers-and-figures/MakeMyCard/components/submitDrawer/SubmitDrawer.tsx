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
import { DownloadIcon, SendIcon, ArrowLeftIcon } from "lucide-react"
import { useAuthContext } from '@/auth/useAuthContext'
import { ProtectedAuthWrapper } from '@/app/my_components/AuthCard'



const SubmitDrawer = () => {

    const { isAuthenticated } = useAuthContext();
    
  return (
        <Drawer>
                <DrawerTrigger asChild>
                    <div className='cursor-pointer w-full h-full flex items-center justify-center'>
                        Submit my card
                    </div>
                </DrawerTrigger>
                <DrawerContent className='text-container min-h-screen w-full items-center justify-center'>
                    <DrawerTitle></DrawerTitle>
                        <ProtectedAuthWrapper>
                            <DrawerHeader className='w-full'>
                                <div
                                    className='text-container w-full h-full items-center justify-center'
                                >
                                    <StoryCanvasCard/>
                                </div>
                                <DrawerDescription></DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter className='flex flex-col gap-2 justify-center items-center w-full text-container'>
                                    <div className='flex flex-row gap-2 justify-between w-full'>
                                        <Button className='flex-1' variant="myStyle" disabled><ArrowLeftIcon/>Backdrop</Button>
                                        <Button className='flex-1' variant="myStyle" disabled><DownloadIcon/>Download</Button>
                                        { isAuthenticated ?
                                            <Button
                                                className='flex-1'
                                                variant="myStyle"
                                                onClick={() => {
                                                    // setIsAuthenticated?.(false)
                                                }}
                                            >
                                                <SendIcon/>Submit
                                            </Button>
                                            :
                                            <Button className='flex-1' variant="myStyle">
                                                {/* <AuthDialog /> */}
                                            </Button>
                                        }
                                    </div>
                                <DrawerClose asChild>
                                    <Button className='' variant="destructive">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </ProtectedAuthWrapper>
                    </DrawerContent>
        </Drawer>
  )
}

export default SubmitDrawer
