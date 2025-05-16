'use client'
import React from 'react'
import { getCanvasUrl } from '@/_utils/html2CanvasUtils'
import Seperator from '@/app/my_components/shared/Seperator'
import InstructionReel from './InstructionReel'
import { useMyCardLocalStorage } from './useMyCardLocalStorage'
import { useRandomRotation } from '@/_hooks/useRandomRotation'
import WriteMyCard from './WriteMyCard'
import CardCanvas from './CardCanvas'
import Buttons from './Buttons'

interface MakeMyCardProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}


const MakeMyCard = ({ artCanvasRef }: MakeMyCardProps) => {

    const {url, myStory, myName, canvasOn, setUrl, setMyStory, setMyName, setCanvasOn} = useMyCardLocalStorage()
    const [pendingUrl, setPendingUrl] = React.useState(false)

    const { rotation, setRotation, randomRotation } = useRandomRotation()

    const handleCanvasUrl = async () => {
        setCanvasOn((prev) => {
            const nextVal = !prev
            if(!nextVal){
                setUrl(null)
            }
            
            if (!artCanvasRef.current){
                return nextVal
            }
            (async () => {
                setPendingUrl(true)
                const canvasUrl = await getCanvasUrl(artCanvasRef.current!)
                setUrl(nextVal ? canvasUrl : null)
                setPendingUrl(false)
            })()
            return nextVal
        })
    }

    

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
            <Buttons handleCanvasUrl={handleCanvasUrl} pendingUrl={pendingUrl} canvasOn={canvasOn}/>
        </div>
        <div className='relative'>
            <Seperator />
        </div>
    </div>
  )
}

export default MakeMyCard
