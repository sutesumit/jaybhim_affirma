'use client'
import React from 'react'
import { getCanvasUrl } from '../YourStory/captureScreenshot'
import Seperator from '@/app/my_components/shared/Seperator'
import InstructionReel from '../YourStory/InstructionReel'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion as m } from 'framer-motion'

interface MakeMyCardProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}

const MakeMyCard = ({ artCanvasRef }: MakeMyCardProps) => {

    const [url, setUrl] = React.useState<string | null>(null)
    const [myStory, setMyStory] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [canvasOn, setCanvasOn] = React.useState(false)
    const [pendingUrl, setPendingUrl] = React.useState(false)

    React.useEffect(() => {
        setMyStory(localStorage.getItem('myStory') || '')
        setName(localStorage.getItem('name') || '')
        setUrl(localStorage.getItem('url') || null)
        setCanvasOn(localStorage.getItem('canvasOn') === 'true')
    }, [])

    const [rotation, setRotation] = React.useState(0)

    React.useEffect(() => {
        const rotation = Math.random() * 5 - 2.5
        setRotation(rotation)
    }, [])


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
                const url = await getCanvasUrl(artCanvasRef.current!)
                setUrl(nextVal ? url : null)
                setPendingUrl(false)
            })()
            setRotation(Math.random() * 5 - 2.5)
            return nextVal
        })
    }

    // I want to run saveMyStory every one second but reset the timer if the user is typing
    React.useEffect(() => {
      const timer = setInterval(() => {
        saveMyStory()
      }, 1000)
      return () => clearInterval(timer)
    }, [myStory, name, url, canvasOn])

    const saveMyStory = () => {
      localStorage.setItem('myStory', myStory)
      localStorage.setItem('name', name)
      localStorage.setItem('url', url || '')
      localStorage.setItem('canvasOn', canvasOn.toString())
    }

    return (
    <div className='relative flex flex-col justify-center overflow-visible'>  
        <InstructionReel />
        <div className='relative w-full text-container h-[25rem] flex flex-col items-center justify-center overflow-visible'>
            <div 
                className={`relative flex-1 w-full rounded-sm card-bg card-border card-hover m-3`}
                style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 2s ease-in-out' }}
                onMouseEnter={() => setRotation(0)}
                onMouseLeave={() => setRotation(rotation)}
            >
                <div
                    className='relative flex flex-col font-handwriting text-xl w-full h-full overflow-hidden submission-card rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
                    
                >
                    <AnimatePresence>
                        {url &&
                        <m.div
                        className="absolute z-[-1] isolate w-full h-full overflow-hidden pointer-events-none"
                        initial={{
                          rotate: 15,
                          scale: 1.8,
                          y: -500,
                        }}
                        animate={{
                          rotate: 0,
                          scale: 1,
                          y: 0,
                          opacity: 1,
                        }}
                        exit={{
                          y: -400,
                          rotate: -45,
                          scale: .5,
                          opacity: 0.1,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 60,
                          damping: 20,
                          mass: 1,
                        }}
                        style={{
                          rotate: rotation,
                        }}
                      >
                        <Image
                          src={url}
                          alt="My card"
                          className="absolute z-[-1] isolate w-full h-full object-cover opacity-50"
                          fill
                        />
                      </m.div>
                      
                        }
                    </AnimatePresence>  
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
            </div>
            <div className='flex bottom-0 w-full text-xs bg-white'>
                <button className='button-style !border-r-0' onClick={handleCanvasUrl} disabled={pendingUrl}>
                    {pendingUrl ? 
                        <><Loader className='text-xs inline h-3 animate-spin' /><span className=''>Painting Canvas!</span></> 
                    : 
                        <span>{canvasOn ? 'Remove' : 'Add'} canvas background</span>
                    }
                </button>
                <button className='button-style !border-l-0' onClick={() => {alert('Sumit is still cooking this feature!')}}>
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
