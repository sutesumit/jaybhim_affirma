'use client'
import React, { useEffect, useContext } from 'react'
import StoryCard from './StoryCard'
import { MyStoriesContext } from '../YourStory/MyStoriesProvider'


const StoryCardSet = () => {

  const context = useContext(MyStoriesContext)

  if (!context) {
    // throw new Error('StoryCardSet must be used within a MyStoriesProvider')
    return null
  }

  const { myStories = [] } = context

  const [ rotations, setRotations ] = React.useState<number[]>([])

  useEffect(() => {
    const randomRotations = Array.from({ length: myStories.length }, () => Math.floor(Math.random() * 5) - 2.5) 
    setRotations(randomRotations)
  }, [myStories])

  


  return (
    <div
        className='all-stories h-[25rem] z-10 text-container overflow-x-auto scroll-smooth'
        
    >
        {myStories.map((story, index) => {
            return (
            <StoryCard 
                key={index} 
                story={story}
                rotation={rotations[index]} // Pass the random rotation value to each StoryCard 
            />
            )
        })}        
    </div>
  )
}

export default StoryCardSet
