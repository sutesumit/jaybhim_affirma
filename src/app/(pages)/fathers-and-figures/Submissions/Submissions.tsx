import React, { useState } from 'react'
import { StoryCardSet } from '../StoryCards'
import { syntheticStories } from './synthetic-stories'
import StoryCanvasCard from '../MakeMyCard/components/cardBackground/StoryCanvasCard'
import Gradient1 from '@/app/my_components/gradients/Gradient1'
import CardCanvas from '../MakeMyCard/components/cardBackground/CardCanvas'
import WriteMyCard from '../MakeMyCard/components/inputStory/WriteMyCard'


const Submissions = () => {
    const [rotation, setRotation] = useState(0)
    const randomRotation = () => {
        const random = Math.floor(Math.random() * 2)
        setRotation(random)
    }
    const [myStory, setMyStory] = useState('');
    const [myName, setMyName] = useState('');

  return (
    <div className='py-1 relative text-container'>
      New Set of Stories Here!
          <div 
              className="rounded-sm glass-hover transition-all duration-300 w-full h-full"
              style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 1s ease-in-out' }}
              onMouseEnter={() => setRotation(0)}
              onMouseLeave={() => randomRotation()}
            //   ref={storyCardRef}
          >
              <Gradient1 hoverOn={true} className='relative w-full h-full'>
                  <div
                      className='relative card-shadow z-10 h-[360px] sm:min-w-[84ch] flex flex-col font-handwriting text-xl overflow-hidden submission-card rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300'
                  >
                      {/* <CardCanvas url={"url"} rotation={rotation}/> */}
                      <WriteMyCard myStory={myStory} myName={myName} setMyStory={setMyStory} setMyName={setMyName}/>
                  </div>
              </Gradient1>
          </div>
        {/* <div className="my-2 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
                <div className='text-sm opacity-80 text-center'>In the quiet queue, <span className='story-count '>0</span> fresh stories wait their turn, joining those already shared below.</div>
            </div>
        <div className='p-5 shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm overflow-hidden'>
            <StoryCardSet myStories={syntheticStories} />        
        </div>
        <div className='text-xs my-2 p-1 opacity-50'>* We want to share all your stories! The queue is just a small step to ensure nothing harmful or inappropriate slips through. Thanks for understanding!</div>                                                                                                                                        */}
    </div>
  )
}

export default Submissions