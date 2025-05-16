import React, { useCallback } from 'react'


interface SubmitStoryButtonProps {
    url: string | null
    myStory: string
    myName: string
    setUrl: (url: string | null) => void
    setMyStory: (story: string) => void
    setMyName: (name: string) => void
    setCanvasOn: (canvasOn: boolean | ((prev: boolean) => boolean)) => void
}


const SubmitStoryButton = ( {url, myStory, myName, setUrl, setMyStory, setMyName, setCanvasOn}: SubmitStoryButtonProps) => {
    
    const clearAllFields = useCallback(() => {
            setUrl(null)
            setMyStory('')
            setMyName('')
            setCanvasOn(false)
            localStorage.clear()
        }, [])
    
    const handleSubmitStory = () => {
        if (!myStory){
            alert(`Your tale is waiting to be told!`)
            return
        }
        clearAllFields()
        alert(`sumit is cooking this feature`)
    }
  return (
    <button className='button-style !border-l-0' onClick={() => {handleSubmitStory()}}>
        Submit my card
    </button>
  )
}

export default SubmitStoryButton
