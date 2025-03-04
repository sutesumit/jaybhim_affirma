import React from 'react'
import Seperator from '../specific/Seperator';

const TitleDiscription = ({ title, description, background }: { title: string, description: { eng?: string | undefined, mar?: string | undefined }, background?: React.ReactNode | React.ReactElement }) => {
  return (
    <>
        <div className='title-container z-0 relative w-full p-4 sm:p-7 m-auto overflow-hidden'>
            {background && <div className='absolute inset-0 z-[-10]'>{background}</div>}
            <div className='max-w-[90ch] md:m-auto text-[--primary-blue] bg-white/50 backdrop-blur-sm border-[1px] border-[--primary-blue] rounded-sm'>
              <div className='font-title text-center pt-6'>{title}</div>
              <div className='description m-5 flex flex-col md:flex-row max-h-[60vh] p-5 gap-12 justify-between place-items-start border-[1px] border-dotted border-[--primary-blue] rounded-sm overflow-y-auto scrollbar-thin'>
                {description.eng && <p className='eng-description flex-1 font-rajdhani whitespace-pre-wrap z-0'>{description.eng}</p>}
                {description.mar && <p className='mar-description flex-1 font-rajdhani whitespace-pre-wrap z-0'>{description.mar}</p>}
              </div>
            </div>
            <Seperator />
        </div>
    </>
    
  )
}

export default TitleDiscription
