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
                        className='text-container w-full h-full'
                    >
                        <StoryCanvasCard/>
                    </div>
                    <DrawerTitle></DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className='flex gap-2 justify-center items-center'>
                    <div className='flex gap-2 items-center'>
                        <Button variant="default">Submit Not Working</Button>
                        <Button variant="default">Download My Card</Button>
                    </div>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
    </Drawer>

  )
}

export default SubmitDrawer
