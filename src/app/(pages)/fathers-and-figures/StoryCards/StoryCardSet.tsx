import React from 'react'
import StoryCard from './StoryCard'
import { StoryObjectType } from '../types'


const StoryCardSet = ({ myStories = [] }: { myStories?: StoryObjectType[] }) => {

  return (
    <div
        className='all-stories p-5 h-[25rem] z-10 overflow-x-auto scroll-smooth'
        
    >
        {myStories.map((story, index) => {
            return (
            <StoryCard 
                key={index} 
                story={story}
            />
            )
        })}        
    </div>
  )
}

export default StoryCardSet
