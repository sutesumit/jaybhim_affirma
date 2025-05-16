'use client'
import React from 'react'
import Seperator from '@/app/my_components/shared/Seperator'
import InstructionReel from './InstructionReel'
import { useMyCardLocalStorage } from './useMyCardLocalStorage'
import { useRandomRotation } from '@/_hooks/useRandomRotation'
import WriteMyCard from './WriteMyCard'
import CardCanvas from './CardCanvas'
import ToggleCanvasButton from './ToggleCanvasButton'
import { useCanvasOperations } from './useCanvasOperations'
import SubmitStoryButton from './SubmitStoryButton'

interface MakeMyCardProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}


const MakeMyCard = ({ artCanvasRef }: MakeMyCardProps) => {

    const {url, myStory, myName, canvasOn, setUrl, setMyStory, setMyName, setCanvasOn} = useMyCardLocalStorage()
    const {pendingUrl, setPendingUrl, handleCanvasUrl} = useCanvasOperations({artCanvasRef, setUrl, setCanvasOn})
    const { rotation, setRotation, randomRotation } = useRandomRotation()

    return (
    <div className='relative flex flex-col justify-center overflow-visible'>  
        <InstructionReel />
        <div className='relative w-full text-container h-[25rem] flex flex-col items-center justify-center overflow-visible'>
            <div 
                className={`relative flex-1 w-full rounded-sm card-bg card-border card-hover m-4`}
                style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 1s ease-in-out' }}
                onMouseEnter={() => setRotation(0)}
                onMouseLeave={() => randomRotation()}
            >
                <div
                    className='relative flex flex-col font-handwriting text-xl w-full h-full overflow-hidden submission-card rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
                >
                    <CardCanvas url={url} rotation={rotation}/>
                    <WriteMyCard myStory={myStory} myName={myName} setMyStory={setMyStory} setMyName={setMyName}/>
                </div>
            </div>
            <div className='flex bottom-0 w-full text-xs bg-white'>
                <ToggleCanvasButton handleCanvasUrl={handleCanvasUrl} pendingUrl={pendingUrl} canvasOn={canvasOn}/>
                <SubmitStoryButton url={url} myStory={myStory} myName={myName}/>
            </div>
        </div>
        <div className='relative'>
            <Seperator />
        </div>
    </div>
  )
}

export default MakeMyCard
