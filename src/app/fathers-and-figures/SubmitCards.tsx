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
            className='all-stories text-container h-[70vh] overflow-x-auto snap snap-x snap-mandatory'
        >
            {[...submitStories, ...submitStories, ...submitStories, ...submitStories].map((story, index) => (
                    <div 
                        key={index} 
                        className={`story-container card-shadow sticky my-4 card-bg flex flex-col snap-center px-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm`}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{ top: `${index}rem`, rotate: `${Math.random()*3}deg` }}
                    >
                        <div className='card flex flex-col items-end h-auto overflow-y-auto'>
                            
                            <p className='m-auto max-w-[50ch] p-4'>
                                {story.story}
                                <span  
                                    className='mx-2 opacity-50 italic before:content-["-"]'>
                                        {story.name}
                                </span>
                            </p>
                        </div>
                    </div>
                )   
            )}
        </div>
    </div>
  )
}

export default SubmitCards
