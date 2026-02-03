import React, { forwardRef, useImperativeHandle, useRef} from 'react'
import { useMyCardContext } from '../../context/MyCardContext'
import { useRandomRotation } from '@/_hooks/useRandomRotation'
import CardCanvas from './CardCanvas'
import WriteMyCard from '../inputStory/WriteMyCard'
import Gradient1 from '@/app/my_components/gradients/Gradient1'

const StoryCanvasCard = forwardRef((props, ref) => {

    const {url, myStory, myName, setUrl, setMyStory, setMyName} = useMyCardContext()
    const { rotation, setRotation, randomRotation } = useRandomRotation()
    const storyCardRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, ()=> storyCardRef.current)
    
    return (
    <div 
        className="rounded-sm glass-hover transition-all duration-300 w-full h-full"
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 1s ease-in-out' }}
        onMouseEnter={() => setRotation(0)}
        onMouseLeave={() => randomRotation()}
        ref={storyCardRef}
    >
        <Gradient1 hoverOn={true} className='relative w-full h-full'>
            <div
                className='relative card-shadow z-10 h-[360px] sm:min-w-[84ch] flex flex-col font-handwriting text-xl overflow-hidden submission-card rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
            >
                <CardCanvas url={url} rotation={rotation}/>
                <WriteMyCard myStory={myStory} myName={myName} setMyStory={setMyStory} setMyName={setMyName}/>
            </div>
        </Gradient1>
    </div>
    )   
})
export default StoryCanvasCard
