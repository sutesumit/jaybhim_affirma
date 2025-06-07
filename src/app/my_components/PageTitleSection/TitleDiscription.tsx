'use client'
import React, { useState } from 'react'
import Jumper from './Jumper';
import LanguageSwitch from './LanguageSwitch';
import { motion as m, AnimatePresence } from 'framer-motion'
import Gradient1 from '../gradients/Gradient1';

const TitleDiscription = ({ title, description, background }: { title: string, description: { eng?: string | undefined, mar?: string | undefined }, background?: React.ReactNode | React.ReactElement }) => {
  
  const [isMarathi, setIsMarathi] = useState(false) 
  
  return (
    <>
      <div className='title-container relative pt-16 z-0 w-full m-auto'>
        {background && <div className='absolute inset-0 z-[-10]'>{background}</div>}
        <div className='max-w-[90ch] mx-2 md:mx-auto text-[--primary-blue] card-bg font-rajdhani transition-[background] duration-300 backdrop-blur-sm border-[1px] border-[--primary-blue] rounded-sm'>
          <Gradient1 hoverOn={true}>
            <div className='text-center flex flex-col justify-center items-center relative'>
              <div className='p-5 mb-4 text-2xl'>
                {title}
              </div>
              <LanguageSwitch
                isMarathi={isMarathi}
                setIsMarathi={setIsMarathi}
              />
            </div>
            
            <div
              className='leading-relaxed m-5 mt-0 description-notch relative text-lg flex flex-col max-h-[50vh] items-center hover:shadow-[inset_0px_0px_15px_-5px_rgba(59,_130,_246,_0.5)] justify-between place-items-start border-[1px] border-dotted border-[--primary-blue] rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
            >
              <AnimatePresence mode='wait' initial={false}>
                <m.p
                  key={isMarathi ? 'marathi' : 'english'}
                  className='description max-w-prose my-10 sm:px-4 lg:px-8 font-rajdhani whitespace-pre-wrap z-0'
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMarathi && description.mar
                  ? description.mar
                  : description.eng
                  }
                </m.p>
              </AnimatePresence>
            </div>
          </Gradient1>
        </div>
        <div className='mt-4'>
          <Jumper />
        </div>
      </div>
    </>
  )
}

export default TitleDiscription
