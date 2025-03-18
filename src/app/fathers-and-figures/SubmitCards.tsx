import { motion as m, animate, useMotionValue, AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import submitStories from './SubmitObjects'



const SubmitCards = () => {

    const [ hoveredCard, setHoveredCard ] = React.useState<Number | null>(null)


  return (
    <div className='relative isolate p-5'>
        <div className="text-container my-1 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-xs opacity-80 text-center'>In the quiet queue, <span className='story-count '>0</span> fresh stories wait their turn, joining those already shared below.</div>
        </div>
        <div
            className='flex md:flex-row flex-col all-stories text-container gap-2 h-[70vh] overflow-x-auto snap snap-x snap-mandatory'
        >
            {[...submitStories, ...submitStories, ...submitStories, ...submitStories].map((story, index) => (
                    <div 
                        key={index} 
                        className={`story-container flex flex-col snap-center p-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm`}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div 
                            className='m-auto h-10 w-10 flex flex-shrink-0 items-center justify-center bg-[var(--primary-blue)] text-[var(--primary-white)] rounded-full'
                        >
                            {index+1}
                        </div>
                        {
                        hoveredCard == index &&
                            <div className='hovered-state h-full overflow-y-auto'>
                                <p className='opacity-65 text-center'><span  className='before:content-["-"] after:content-["-"]'>{story.name}</span></p>
                                <p>{story.story}</p>
                            </div>
                        
                        }
                    </div>
                )   
            )}
        </div>
    </div>
  )
}

export default SubmitCards
