import React from 'react'
import { useCanvasOperations } from './useCanvasOperations'
import { useMyCardContext } from './MyCardContext'
import { Loader } from 'lucide-react'

const ToggleCanvasButton = ({artCanvasRef}: {artCanvasRef: React.RefObject<HTMLDivElement | null>}) => {
    const {url} = useMyCardContext()
    const {handleCanvasUrl, pendingUrl} = useCanvasOperations({artCanvasRef})
  
  return (
    <>
        <button className={`button-style ${pendingUrl ? 'cursor-wait' : ''}`} onClick={handleCanvasUrl} disabled={pendingUrl}>
            <span>
                {
                pendingUrl ? 
                <span className='flex w-full justify-center items-center'>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                </span> : 
                url ? 
                <span className='flex w-full justify-center items-center'>Clear My Backdrop</span> : 
                <span className='flex w-full justify-center items-center'>Pull My Collage</span> 
                }
            </span>
        </button>
    </>
  )
}

export default ToggleCanvasButton
