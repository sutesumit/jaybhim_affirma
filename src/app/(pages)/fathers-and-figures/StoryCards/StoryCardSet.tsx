import React from 'react'
import StoryCard from './StoryCard'
import { StoryObjectType } from '../types'


const StoryCardSet = ({ storyObject }: { storyObject: StoryObjectType[] }) => {

  return (
    <div
        className='all-stories h-[25rem] text-container overflow-x-auto scroll-smooth'
    >
        {storyObject.map((story, index) => {
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
