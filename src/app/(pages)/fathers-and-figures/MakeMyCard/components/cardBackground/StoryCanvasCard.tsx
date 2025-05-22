import React from 'react'
import { useMyCardContext } from '../../context/MyCardContext'
import { useRandomRotation } from '@/_hooks/useRandomRotation'
import CardCanvas from './CardCanvas'
import WriteMyCard from '../inputStory/WriteMyCard'

const StoryCanvasCard = () => {
    const {url, myStory, myName, setUrl, setMyStory, setMyName} = useMyCardContext()
    const { rotation, setRotation, randomRotation } = useRandomRotation()
    
    return (
    <div 
        className="relative flex-1 w-full rounded-sm card-bg card-border card-shadow"
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 1s ease-in-out' }}
        onMouseEnter={() => setRotation(0)}
        onMouseLeave={() => randomRotation()}
    >
        <div
            className='relative flex flex-col font-handwriting text-xl h-[22rem] overflow-hidden submission-card rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
        >
            <CardCanvas url={url} rotation={rotation}/>
            <WriteMyCard myStory={myStory} myName={myName} setMyStory={setMyStory} setMyName={setMyName}/>
        </div>
    </div>
    )   
}
export default StoryCanvasCard
