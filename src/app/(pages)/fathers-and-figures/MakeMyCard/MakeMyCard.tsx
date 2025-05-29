'use client'
import React from 'react'
import Seperator from '@/app/my_components/shared/Seperator'
import InstructionReel from './components/InstructionReel'
import SubmitStoryButton from './components/inputStory/SubmitStoryButton'
import { MyCardProvider } from './context/MyCardContext'
import StoryCanvasCard from './components/cardBackground/StoryCanvasCard'
import ToggleCanvasButton from './components/cardBackground/ToggleCanvasButton'
import { AuthCard } from '@/app/my_components/AuthCard'

interface MakeMyCardProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}

const MakeMyCard = ({ artCanvasRef }: MakeMyCardProps) => {

    return (
    <div className='relative flex flex-col justify-center overflow-visible'>  
        <InstructionReel />
        <MyCardProvider>
            <div className='relative h-full my-10 w-full text-container flex gap-5 flex-col items-center justify-center overflow-visible'>
                <StoryCanvasCard />
                <div className='sm:flex bottom-0 w-full text-xs gap-2 bg-white'>
                    <ToggleCanvasButton artCanvasRef={artCanvasRef}/>
                    <SubmitStoryButton/>
                </div>
                {/* <AuthCard /> */}
            </div>
        </MyCardProvider>
        <div className='relative'>
            <Seperator />
        </div>
    </div>
  )
}

export default MakeMyCard
