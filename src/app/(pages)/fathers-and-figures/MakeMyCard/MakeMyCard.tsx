'use client'
import React from 'react'
import { getCanvasUrl } from '../YourStory/captureScreenshot'
import Seperator from '@/app/my_components/shared/Seperator'
import InstructionReel from '../YourStory/InstructionReel'

interface MakeMyCardProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}

const MakeMyCard = ({ artCanvasRef }: MakeMyCardProps) => {

    const [url, setUrl] = React.useState<string | null>(null)
    const [myStory, setMyStory] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')

    React.useEffect(() => {
        setMyStory(localStorage.getItem('myStory') || '')
        setName(localStorage.getItem('name') || '')
    }, [])

    const [rotation, setRotation] = React.useState(0)

    React.useEffect(() => {
        const rotation = Math.random() * 5 - 2.5
        setRotation(rotation)
    }, [])

    const handleCanvasUrl = async () => {
        if (!artCanvasRef.current){
          return
        }
        const url = await getCanvasUrl(artCanvasRef.current)
        setUrl(url)
      }

    // I want to run saveMyStory every one second but reset the timer if the user is typing
    React.useEffect(() => {
      const timer = setInterval(() => {
        saveMyStory()
      }, 1000)
      return () => clearInterval(timer)
    }, [myStory, name])

    const saveMyStory = () => {
      localStorage.setItem('myStory', myStory)
      localStorage.setItem('name', name)
    }

    return (
    <div className='relative flex flex-col justify-center'>  
        <InstructionReel />
        <div className='!p-0 m-5 relative w-full text-container overflow-hidden h-[25rem] flex flex-col items-center justify-center shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm'>
            <div 
                className='relative m-2 font-handwriting text-xl w-full h-full overflow-hidden submission-card border-[1px] border-[var(--primary-blue)] rounded-sm flex flex-col items-center justify-center'
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {url && <img src={url} alt="My card" className='z-[-1] isolate w-full h-full object-cover absolute opacity-50' />}
                <textarea
                    placeholder={'Tell the tale you created!'}
                    name='story'
                    value={myStory || ''}
                    className='flex-1 placeholder:font-body placeholder:text-sm text-justify bg-white/50 p-5 w-full focus:outline-none'
                    onChange={(e) => setMyStory(e.target.value)}
                ></textarea>
                <input
                    type='text'
                    placeholder={'Sign your name! (optional)'}
                    name='name'
                    value={name || ''}
                    className='text-end uppercase placeholder:font-body placeholder:text-sm placeholder:capitalize bg-white/50 p-5 w-full focus:outline-none'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='flex bottom-0 w-full text-xs z-10 bg-white'>
                <button className='button-style' onClick={handleCanvasUrl}>
                    Add my canvas background
                </button>
                <button className='button-style'>
                    Submit my card
                </button>
            </div>
        </div>
        <div className='relative'>
            <Seperator />
        </div>
    </div>
  )
}

export default MakeMyCard
