'use client'
import React, { useState } from 'react'
import Jumper from './Jumper';
import LanguageSwitch from './LanguageSwitch';

const TitleDiscription = ({ title, description, background }: { title: string, description: { eng?: string | undefined, mar?: string | undefined }, background?: React.ReactNode | React.ReactElement }) => {
  
  const [isMarathi, setIsMarathi] = useState(false) 
  
  return (
    <>
        <div className='title-container relative pt-14 z-0 w-full m-auto'>
            {background && <div className='absolute inset-0 z-[-10]'>{background}</div>}
            <div className='max-w-[90ch] mx-2 md:mx-auto text-[--primary-blue] bg-white/50 transition-[background] duration-300 hover:bg-gradient-to-bl hover:from-blue-300 hover:via-blue-50 hover:to-blue-50 backdrop-blur-sm border-[1px] border-[--primary-blue] rounded-sm'>
            <div className='text-centr flex justify-center items-center relative pt-6 text-2xl font-rajdhani'>
              {title}
              <LanguageSwitch 
                isMarathi={isMarathi} 
                setIsMarathi={setIsMarathi} 
              />
            </div>
           
            <div 
              className='leading-relaxed relative text-lg m-5 pt-12 flex flex-col max-h-[50vh] items-center hover:shadow-[inset_0px_0px_15px_-5px_rgba(59,_130,_246,_0.5)] p-5 gap-5 justify-between place-items-start border-[1px] border-dotted border-[--primary-blue] rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
            >
              
              <p className='description max-w-prose sm:px-4 lg:px-8 font-rajdhani whitespace-pre-wrap z-0'>
                {isMarathi && description.mar 
                ? description.mar
                : description.eng
                }
              </p>
            </div>
            </div>
            <div className='mt-5'>
              <Jumper />
            </div>
        </div>
    </>
    
  )
}

export default TitleDiscription
