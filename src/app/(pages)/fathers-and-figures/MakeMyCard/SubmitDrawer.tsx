'use client'
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
import StoryCanvasCard from './StoryCanvasCard'
import { DownloadIcon, SendIcon, ArrowLeftIcon } from "lucide-react"


const SubmitDrawer = () => {
    
  return (
    <Drawer>
        <DrawerTrigger asChild>
            <div className='cursor-pointer w-full h-full flex items-center justify-center'>
                Submit my card
            </div>
        </DrawerTrigger>
        <DrawerContent className=''>
                <DrawerHeader className=''>
                    <div 
                        className='text-container w-full h-full items-center justify-center'
                    >
                        <StoryCanvasCard/>
                    </div>
                    <DrawerTitle></DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className='flex justify-center items-center w-full text-container '>
                    <input className='w-full text-xs p-1 border border-[var(--primary-blue)] rounded-sm' type="email" placeholder='Verify your email' disabled />
                </div>
                <DrawerFooter className='flex flex-col gap-2 justify-center items-center w-full text-container'>
                        <div className='flex flex-row gap-2 justify-between w-full'>
                            <Button className='flex-1' variant="myStyle" disabled><ArrowLeftIcon/>Backdrop</Button>
                            <Button className='flex-1' variant="myStyle" disabled><DownloadIcon/>Download</Button>
                            <Button className='flex-1' variant="myStyle" disabled><SendIcon/>Submit</Button>
                        </div>
                    <DrawerClose asChild>
                        <Button className='' variant="destructive">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
    </Drawer>

  )
}

export default SubmitDrawer
