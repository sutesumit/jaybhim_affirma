'use client'
import React, { useContext } from 'react'
import { StoryCardSet } from '../StoryCards'
import { StoryObjectType } from '../types' // Importing the StoryObjectType type for type checking
import { getLocalStories, clearLocalStories } from '../YourStory/' // Importing the getLocalStories and clearLocalStories functions for managing local storage 
import { MyStoriesContext } from '../YourStory/MyStoriesProvider'

const StoryCardSetWrapper= () => {

    const context = useContext(MyStoriesContext)

    if (!context) return null

    const { myStories, setMyStories } = context

    if (myStories.length === 0) {
        return (
            <div className='text-container my-2 shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm overflow-hidden'>
                <p className='text-center p-2 text-sm'>Space for your tales. Let’s craft one!</p>
            </div>
        )
    }

    const handleClearDrafts = () => {
        setMyStories([])
    }

    
  return (
    <>
        <div className='text-container p-5 shadow-[inset_0px_0px_6px_var(--primary-blue)] rounded-sm overflow-hidden'>
        {/* This is the wrapper for the StoryCardSet component. It provides a container for the story cards and applies styles to it. */
        /* The wrapper is responsible for the layout and appearance of the story cards. */}
        <StoryCardSet />
        </div>
        <div className='text-container justify-between flex gap-2 mx-0 my-2'>
            <button 
                type='button' 
                onClick={() => {handleClearDrafts()}} 
                className='border-[1px] flex-1 text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition duration-300 ease-in-out'
            >
                Start with a clean slate? Clear all drafts!
            </button> 
            <button 
                type='button' 
                onClick={() => {alert('Hang on, Sumit is still cooking this feature!')}} 
                className='border-[1px] flex-1 text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition duration-300 ease-in-out'
            >
                Queue up your story for publishing below!
            </button> 
        </div>
    </>
  )
}

export default StoryCardSetWrapper
