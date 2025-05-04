import React from 'react'
import { StoryCardSet } from '../StoryCards'
import { syntheticStories } from './synthetic-stories'

const Submissions = () => {
  return (
    <div className='py-1 text-container'>
        <div className="my-2 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
                <div className='text-sm opacity-80 text-center'>In the quiet queue, <span className='story-count '>0</span> fresh stories wait their turn, joining those already shared below.</div>
            </div>
        <div className='p-5 shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm overflow-hidden'>
            <StoryCardSet myStories={syntheticStories} />        
        </div>
        <div className='text-xs my-2 p-1 opacity-50'>* We want to share all your stories! The queue is just a small step to ensure nothing harmful or inappropriate slips through. Thanks for understanding!</div>
    </div>
  )
}

export default Submissions