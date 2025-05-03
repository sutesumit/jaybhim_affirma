'use client'
import React, { useContext } from 'react'
import { StoryCardSet } from '../StoryCards'
import { MyStoriesContext } from '../YourStory/MyStoriesProvider'

const StoryCardSetWrapper= () => {

    const context = useContext(MyStoriesContext)

    if (!context) return null

    const { myStories, setMyStories } = context

    const handleClearDrafts = () => {
        setMyStories([])
    }

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
