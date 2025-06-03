import React from 'react'
import SubmitDrawer from '../submitDrawer/SubmitDrawer'



const SubmitStoryButton = ({artCanvasRef}: {artCanvasRef: React.RefObject<HTMLDivElement | null>}) => {
    
  return (
    <div className='p-0 flex-1 justify-between'>
       <SubmitDrawer artCanvasRef={artCanvasRef}/>
    </div>
  )
}

export default SubmitStoryButton
