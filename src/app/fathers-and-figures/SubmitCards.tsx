import { motion as m, animate, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import submitStories from './SubmitObjects'


const SubmitCards = () => {

    const [ hoveredCard, setHoveredCard ] = React.useState<Number | null>(null)


  return (
    <div>
      <div className='relative isolate p-5'>
        <div className=" text-container my-1 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-xs opacity-80 text-center'>In the quiet queue, <span className='story-count '>0</span> fresh stories wait their turn, joining those already shared below.</div>
        </div>
        <div  className='stories text-center text-container !px-0 overflow-hidden'>
            <m.div
                className='flex w-full'
            >
                {[...submitStories, ...submitStories].map((story, index) => (
                    
                        <div 
                            key={index} 
                            className='story-container flex-grow snap-center p-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm'
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {
                            hoveredCard == index ?
                            <div className='hovered-state'>
                                <p>{story.story}</p>
                                <p className='opacity-65 italic'>- <span>{story.name}</span></p>
                            </div>
                            :
                            <div className='text-center'>card</div>
                            }
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
