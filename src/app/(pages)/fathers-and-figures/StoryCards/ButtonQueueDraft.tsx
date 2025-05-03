import React, { useContext } from 'react'
import { MyStoriesContext } from '../YourStory/MyStoriesProvider'

const ButtonQueueDraft = () => {

    const context = useContext(MyStoriesContext)

    if (!context) return null

    const { myStories } = context

    if (myStories.length === 0) {
        return null
    }

    const handleQueueDraft = () => {
        alert('Hang on, Sumit is still cooking this feature!')
    }

  return (
    <button 
        type='button' 
        onClick={handleQueueDraft} 
        className='border-[1px] flex-1 text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition duration-300 ease-in-out'
    >
        Queue up your story for publishing below!
    </button> 
  )
}

export default ButtonQueueDraft
