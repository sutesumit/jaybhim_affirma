import React from 'react'

interface SubmitStoryButtonProps {
    url: string | null
    myStory: string
    myName: string
}


const SubmitStoryButton = ( {url, myStory, myName}: SubmitStoryButtonProps) => {
  return (
    <button className='button-style !border-l-0' onClick={() => {alert(`sumit is cooking this feature`)}}>
        Submit my card
    </button>
  )
}

export default SubmitStoryButton
