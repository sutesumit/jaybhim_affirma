import React, { useRef, useState, useEffect } from 'react'
import Seperator from '@/app/my_components/shared/Seperator'
import Instruction from './Instruction'
import DraggablePhoto from './DraggablePhoto'
import { photoStyleProp } from './types'

// ArtCanvas component for the Fathers and Figures page
const ArtCanvas = () => {
    // Reference tag to the .art-canvas div container where dragable photo elements live
    const artCanvasRef = useRef<HTMLDivElement | null>(null)

    // State to store the style properties for the dragable photo elements
    const [photoStyle, setPhotoStyle] = useState<photoStyleProp[]>([])

    // useEffect hook to set the initial style properties for the dragable photo elements upon component mount
    useEffect(() => {
        setPhotoStyle(Array.from({ length: 23}, (_, i)=>{
            return {
                rotate: Math.random() * 60 - 30,
                scale: Math.random() * .6 + .8
            }
        }))
    }, [])

  return (
    <div 
        className='art-canvas relative flex flex-wrap gap-5 items-center justify-center p-[5vh] min-h-screen w-screen bg-gradient-to-tl from-blue-300 to-blue-50 rounded-lg overflow-hidden'
        ref={artCanvasRef}
      >
        <Instruction />
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
