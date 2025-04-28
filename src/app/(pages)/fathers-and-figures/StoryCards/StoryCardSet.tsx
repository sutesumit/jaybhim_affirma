import React, { useEffect } from 'react'
import StoryCard from './StoryCard'
import { StoryObjectType } from '../types'


const StoryCardSet = ({ storyObject }: { storyObject: StoryObjectType[] }) => {

  const [rotations, setRotations] = React.useState<number[]>([])

  useEffect(() => {
    const newRotations = storyObject.map(() => Math.floor(Math.random() * 5 - 2.5)) // Generate a random rotation between -2.5 and 2.5 degrees
    setRotations(newRotations) 
  }, [storyObject])

  return (
    <div
        className='all-stories h-[25rem] text-container overflow-x-auto scroll-smooth'
    >
        {storyObject.map((story, index) => {
            return (
            <StoryCard 
                key={index} 
                story={story} 
                rotation={rotations[index]}
            />
            )
        })}        
    </div>
  )
}

export default StoryCardSet
