'use client'
import { EvervaultCard } from '@/_components/aceternity_ui/evervault-card'
import React from 'react'
import JaiBhim from './JaiBhim'

const Hero = () => {
  return (
    <div className='bg-[var(--primary-white)] text-[--primary-blue] p-4
                        flex-1 w-screen flex flex-col justify-center items-center
                        font-title text-xs relative'>
        <EvervaultCard className='font-rajdhani w-[70vw]'>
          <JaiBhim />
        </EvervaultCard>
    </div>
    
  )
}

export default Hero
