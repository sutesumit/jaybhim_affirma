import React from 'react'
import { StoryObjectType } from '../types'


// Define the StoryCard component that takes a story object as a prop and an index
interface StoryCardProps {
  story: StoryObjectType; // The story object to be displayed in the card
  rotation: number; // The rotation angle for the card
}


// Define the StoryCard component that takes a story object as a prop
// The component is responsible for rendering a single story card with the story text and the name of the person who submitted it
const StoryCard = ({ story, rotation }: StoryCardProps) => {
  return (
    <div 
        className={`story-container h-full sticky card-bg flex flex-col snap-center px-3 text-xs border-[1px] border-[var(--primary-blue)] rounded-sm transition-all duration-300`}
        style={{ top: 0, rotate: `${rotation}deg` }}
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
}

export default StoryCard
