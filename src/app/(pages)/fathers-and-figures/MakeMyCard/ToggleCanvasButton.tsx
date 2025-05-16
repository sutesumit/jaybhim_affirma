import React from 'react'
import { Loader } from 'lucide-react'


const ToggleCanvasButton = ({ handleCanvasUrl, pendingUrl, canvasOn }: { handleCanvasUrl: () => void, pendingUrl: boolean, canvasOn: boolean }) => {
  
  
  return (
    <>
        <button className='button-style !border-r-0' onClick={handleCanvasUrl} disabled={pendingUrl}>
            {pendingUrl ? 
                <span className='grayscale'><Loader className='text-xs inline h-3 animate-spin' />Painting Canvas!</span> 
            : 
                <span>{canvasOn ? 'Remove' : 'Add'} canvas background</span>
            }
        </button>
    </>
  )
}

export default ToggleCanvasButton
