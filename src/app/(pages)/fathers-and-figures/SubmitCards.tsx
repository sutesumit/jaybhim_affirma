import React, { useState, useEffect } from 'react'
import submitStories from './SubmitObjects'


const SubmitCards = () => {  

    const [rotations, setRotations] = useState<number[]>([])

    useEffect(() => {
        const rotations: number[] = []
        for (let i = 0; i < 4*submitStories.length; i++) {
            rotations.push(Math.random() * 5 - 2.5)
        }
        setRotations(rotations)
    }, [])

  return (
    <div className='relative isolate p-5'>
        <div className="text-container my-1 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-xs opacity-80 text-center'>In the quiet queue, <span className='story-count '>0</span> fresh stories wait their turn, joining those already shared below.</div>
        </div>
        <div
            className='all-stories h-[25rem] text-container overflow-x-auto scroll-smooth'
        >
            {[...submitStories, ...submitStories, ...submitStories, ...submitStories].map((story, index) => (
                    <div 
                        key={index} 
                        className={`story-container h-full sticky card-bg flex flex-col snap-center px-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm transition-all duration-300`}
                        style={{ top: 0, rotate: `${rotations[index]}deg` }}
                    >
                        <div className='card flex flex-col h-full items-center justify-center overflow-y-auto'>
                            <p className='m-auto text-lg font-semibold p-4 font-handwriting'>
                                {story.story}
                                <span  
                                    className='mx-2 opacity-50 italic uppercase before:content-["-"]'>
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
