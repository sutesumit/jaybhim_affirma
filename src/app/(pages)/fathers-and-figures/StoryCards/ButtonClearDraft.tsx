import React, { useContext } from 'react'
import { MyStoriesContext } from '../YourStory/MyStoriesProvider'

const ButtonClearDraft = () => {
    const context = useContext(MyStoriesContext)

    if (!context) return null

    const { setMyStories } = context

    const handleClearDrafts = () => {
        setMyStories([])
    }

  return (
    <button 
        type='button' 
        onClick={handleClearDrafts} 
        className='border-[1px] flex-1 text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition duration-300 ease-in-out'
    >
        Start with a clean slate? Clear all drafts!
    </button> 
  )
}

export default ButtonClearDraft
