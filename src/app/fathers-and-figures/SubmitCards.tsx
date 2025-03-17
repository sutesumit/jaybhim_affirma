import { motion as m, animate, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import submitStories from './SubmitObjects'


const SubmitCards = () => {




  return (
    <div>
      <div className='relative isolate p-5'>
        <div className=" text-container my-1 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-xs opacity-80 text-center'>In the quiet queue, <span className='story-count '>0</span> fresh stories wait their turn, joining those already shared below.</div>
        </div>
        <div  className='stories flex flex-row checkbox text-center text-container overflow-hidden'>
            <m.div
                className='flex flex-row'
            >
                {[...submitStories, ...submitStories].map((story, index) => (
                    
                        <div key={index} className='story-container snap-center hover:bg-slate-500 p-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm'>
                            <p>{story.story}</p>
                            <p className='opacity-65 italic'>- <span>{story.name}</span></p>
                        </div>
                    )   
                )}
            </m.div>
        </div>
      </div>
    </div>
  )
}

export default SubmitCards
