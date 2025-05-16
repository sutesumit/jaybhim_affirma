'use client'
import React, { useRef } from 'react'
import Seperator from '@/app/my_components/shared/Seperator'
import InstructionReel from './InstructionReel'
import SubmitStoryButton from './SubmitStoryButton'
import { MyCardProvider } from './MyCardContext'
import StoryCanvasCard from './StoryCanvasCard'
import ToggleCanvasButton from './ToggleCanvasButton'

interface MakeMyCardProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
    storyCanvasRef: React.RefObject<HTMLDivElement | null>
}

const MakeMyCard = ({ artCanvasRef, storyCanvasRef }: MakeMyCardProps) => {

    return (
    <div className='relative flex flex-col justify-center overflow-visible'>  
        <InstructionReel />
        <MyCardProvider>
            <div className='relative w-full text-container flex flex-col items-center justify-center overflow-visible'>
                <StoryCanvasCard ref={storyCanvasRef} />
                <div className='sm:flex bottom-0 w-full text-xs bg-white'>
                    <ToggleCanvasButton artCanvasRef={artCanvasRef}/>
                    <SubmitStoryButton/>
                </div>
            </div>
        </MyCardProvider>
        <div className='relative'>
            <Seperator />
        </div>
    </div>
  )
}

export default MakeMyCard
