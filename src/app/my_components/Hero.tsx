'use client'
import { EvervaultCard } from '@/components/ui/evervault-card'
import { MaskContainer } from '@/components/ui/svg-mask-effect'
import { RiScrollToBottomFill } from "react-icons/ri"
import Image from 'next/image';
import React from 'react'
import Seperator from './Seperator'


const Hero = () => {


  return (
    <div className='bg-[var(--primary-white)] text-[--primary-blue] p-4
                        h-screen w-screen flex flex-col justify-center items-center
                        font-title text-xs relative'>
        
        <div className="absolute bottom-[6vh] right-[6vh] h-[10vh] w-[10vh] rounded-full padding-2 overflow-hidden hover:animate-spin hover:repeat-1 cursor-none">
          <MaskContainer className='w-full h-full' size={10} revealSize={100}>
            <Image src='/ashoka-chakra-white.svg' className='p-[2px]' alt='Ashoka Chakra' width={100} height={100}/>
          </MaskContainer>
        </div>

        <EvervaultCard className='font-jaibhim w-[70vw]' text='जय भीम'/>

        <div className='absolute bottom-[6vh] m-auto h-[1.5rem] cursor-pointer'
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                })
              }}
        >
          <RiScrollToBottomFill className='w-full h-full animate-bounce'/>
        </div>
        
        <div className="w-full">
          <Seperator />
        </div>
    </div>
    
  )
}

export default Hero
