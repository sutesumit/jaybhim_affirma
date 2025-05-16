import React from 'react'
import { Loader } from 'lucide-react'


const Buttons = ({ handleCanvasUrl, pendingUrl, canvasOn }: { handleCanvasUrl: () => void, pendingUrl: boolean, canvasOn: boolean }) => {
  
  
  return (
    <div className='flex bottom-0 w-full text-xs bg-white'>
        <button className='button-style !border-r-0' onClick={handleCanvasUrl} disabled={pendingUrl}>
            {pendingUrl ? 
                <span className='grayscale'><Loader className='text-xs inline h-3 animate-spin' />Painting Canvas!</span> 
            : 
                <span>{canvasOn ? 'Remove' : 'Add'} canvas background</span>
            }
        </button>
        <button className='button-style !border-l-0' onClick={() => {alert('Sumit is still cooking this feature!')}}>
            Submit my card
        </button>
    </div>
  )
}

export default Buttons
