'use client' 
import React, { useEffect, useRef, useState } from 'react'
import { RiScrollToBottomFill } from 'react-icons/ri'
import Seperator from '../shared/Seperator'
import { Milestone } from 'lucide-react'
import { motion as m, AnimatePresence } from 'framer-motion'

const jumperTexts = [
  {
    id: 'tldr',
    label: 'TL;DR',
    icon: <Milestone className='h-4 w-4 ml-2 animate-pierce'/>
  },
  {
    id: 'artBoard',
    label: 'Skip to Art',
    icon: null
  }
]


const Jumper = () => {

    const seperatorRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)

    useEffect(()=>{
      const interval = setInterval(()=>{
        setIndex((prev)=> (prev + 1)% jumperTexts.length)
      }, 5000)
      return () => clearInterval(interval)
    }, [])

    const handleScroll = () => {
      seperatorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center'
      })
    }

    const currentJumperText = jumperTexts[index]

  return (
    <div className='m-auto pb-4 items-center cursor-pointer relative'
      onClick={handleScroll}
    >
        <div
          className='flex relative gap-2 font-rajdhani items-center justify-center m-auto h-8 p-4 w-fit overflow-clip card-bg button-style'
        >
          <RiScrollToBottomFill className='text-xl'/>
          <AnimatePresence mode='wait'>
            <m.div
              key={index}
              className='justify-center'
              initial= {{ y: 20, opacity: 0 }}
              animate = {{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <span className='flex items-center justify-center w-20'>
                  {currentJumperText.label}
                  {currentJumperText.icon}
              </span>
            </m.div>
          </AnimatePresence>
        </div>

      <div className="w-full">
          <Seperator ref={seperatorRef} />
      </div>
    </div>
  )
}

export default Jumper
