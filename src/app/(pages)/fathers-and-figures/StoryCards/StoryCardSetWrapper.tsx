'use client'
import React from 'react'
import { StoryCardSet } from '../StoryCards'
import ButtonClearDraft from './ButtonClearDraft'
import ButtonQueueDraft from './ButtonQueueDraft'
import { useMyStories } from '../YourStory/MyStoriesProvider'

const StoryCardSetWrapper= () => {

    const { myStories } = useMyStories()

    if (myStories.length === 0) {
        return (
            <div className='text-container my-2 shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm overflow-hidden'>   
                <p className='all-stories h-[25rem] z-10 text-center p-2 text-xs opacity-50'>Space for your tales. Let’s craft one!</p>
            </div>
        )
    }
    
    return (
    <>
        <div className='text-container p-5 shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm overflow-hidden'>
            <StoryCardSet myStories={myStories} />
        </div>
        <div className='text-container justify-between flex gap-2 mx-0 my-2'>
            <ButtonClearDraft />
            <ButtonQueueDraft />
        </div>
    </>
  )
}

export default StoryCardSetWrapper
