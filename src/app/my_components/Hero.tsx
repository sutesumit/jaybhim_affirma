'use client'
import { EvervaultCard } from '@/components/ui/evervault-card'
import { MaskContainer } from '@/components/ui/svg-mask-effect'
import { RiScrollToBottomFill } from "react-icons/ri"
import { motion } from 'framer-motion'
import Image from 'next/image';
import React from 'react'
import Seperator from './Seperator'


const Hero = () => {


  return (
    <section className='bg-[var(--primary-white)] text-[--primary-blue] p-4
                        h-screen w-screen flex flex-col justify-center items-center
                        font-title text-xs'>
        <div className="absolute top-[15vh] z-10 affirma-band h-[10vh] w-[70vw] rounded-xl overflow-clip flex justify-center items-center cursor-crosshair">
          <MaskContainer className='w-full h-full' size={2} revealSize={70}>
            <h3 className='text-center font-body text-xs font-thin'>This website by <em>Sumit Sute</em> was created as an application for the AFFIRMA Awards 2025.</h3>
          </MaskContainer>
        </div>
        <div className="absolute bottom-[6vh] right-[6vh] h-[10vh] w-[10vh] rounded-full cursor-crosshair">
          <MaskContainer className='w-full h-full' size={2} revealSize={50}>
            <Image src='/ashoka-chakra-white.svg' alt='Ashoka Chakra' width={100} height={100}/>
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
      <Seperator />
    </section>
    
  )
}

export default Hero
