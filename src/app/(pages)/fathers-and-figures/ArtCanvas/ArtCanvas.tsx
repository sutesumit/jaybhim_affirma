import React, { useRef } from 'react'
import Seperator from '@/app/my_components/shared/Seperator'
import Instruction from './Instruction'
import DraggablePhoto from './DraggablePhoto'
import { usePhotoStyle } from './usePhotoStyleHook'

// ArtCanvas component for the Fathers and Figures page
const ArtCanvas = () => {
    // Reference tag to the .art-canvas div container where dragable photo elements live
    const artCanvasRef = useRef<HTMLDivElement | null>(null)

    // Custom hook to return state to store the style properties for the dragable photo elements
    const photoStyle = usePhotoStyle()

    return (
        <div 
        className='art-canvas relative flex flex-wrap gap-5 items-center justify-center p-[5vh] min-h-screen w-screen bg-gradient-to-tl from-blue-300 to-blue-50 rounded-lg overflow-hidden'
        ref={artCanvasRef}
      >
        <Instruction />
        {/* Generate 23 draggable photocomponets dynamically
            1. Create an array of 23 elements from 0 to 22
            2. Map over the array and generate 23 draggable photocomponets dynamically
        */}
        {Array.from({length: 23}, (_,i) => i).map((i) =>{
            return (
                <DraggablePhoto
                    key={i+200}
                    src={`/fathersandfigures/${i + 1}.jpg`}
                    alt={`Image ${i + 1}`}
                    animate={photoStyle[i]}
                    dragConstraints={artCanvasRef}
                />
            )
        })}
        <Seperator />
      </div>
  )
}

export default ArtCanvas
