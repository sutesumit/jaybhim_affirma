import React, { forwardRef, useImperativeHandle, useRef} from 'react'
import { useMyCardContext } from '../../context/MyCardContext'
import { useRandomRotation } from '@/_hooks/useRandomRotation'
import CardCanvas from './CardCanvas'
import WriteMyCard from '../inputStory/WriteMyCard'

const StoryCanvasCard = forwardRef((props, ref) => {

    const {url, myStory, myName, setUrl, setMyStory, setMyName} = useMyCardContext()
    const { rotation, setRotation, randomRotation } = useRandomRotation()
    const storyCardRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, ()=> storyCardRef.current)
    
    return (
    <div 
        className="relative rounded-sm card-bg card-border card-shadow"
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 1s ease-in-out' }}
        onMouseEnter={() => setRotation(0)}
        onMouseLeave={() => randomRotation()}
        ref={storyCardRef}
    >
        <div
            className='relative h-[360px] sm:w-[560px] w-full flex flex-col font-handwriting text-xl overflow-hidden submission-card rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
        >
            <CardCanvas url={url} rotation={rotation}/>
            <WriteMyCard myStory={myStory} myName={myName} setMyStory={setMyStory} setMyName={setMyName}/>
        </div>
    </div>
    )   
})
export default StoryCanvasCard
