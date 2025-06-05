import React from 'react'
import Jumper from './Jumper';

const TitleDiscription = ({ title, description, background }: { title: string, description: { eng?: string | undefined, mar?: string | undefined }, background?: React.ReactNode | React.ReactElement }) => {
  return (
    <>
        <div className='title-container relative pt-14 z-0 w-full m-auto'>
            {background && <div className='absolute inset-0 z-[-10]'>{background}</div>}
            <div className='max-w-[90ch] mx-2 md:mx-auto text-[--primary-blue] bg-white/50 transition-[background] duration-300 hover:bg-gradient-to-bl hover:from-blue-300 hover:via-blue-50 hover:to-blue-50 backdrop-blur-sm border-[1px] border-[--primary-blue] rounded-sm'>
            <div className='font-title text-center pt-6'>{title}</div>
              <div className='description m-5 flex flex-col md:flex-row max-h-[50vh] hover:shadow-[inset_0px_0px_15px_-5px_rgba(59,_130,_246,_0.5)] p-5 gap-12 justify-between place-items-start border-[1px] border-dotted border-[--primary-blue] rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'>
                {description.eng && <p className='eng-description flex-1 font-rajdhani whitespace-pre-wrap z-0'>{description.eng}</p>}
                {description.mar && <p className='mar-description flex-1 font-rajdhani whitespace-pre-wrap z-0'>{description.mar}</p>}
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
