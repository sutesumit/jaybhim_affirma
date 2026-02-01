import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Seperator from '@/app/my_components/shared/Seperator'
import Instruction from './Instruction'
import DraggablePhoto from './DraggablePhoto'
import { usePhotoStyle } from './usePhotoStyleHook'
import Gradient1 from '@/app/my_components/gradients/Gradient1'

// ArtCanvas component for the Fathers and Figures page, using forwardRef to allow `YourStoryForm` component to pass a ref to the canvas element
// This component is responsible for rendering the canvas where the draggable photo elements are displayed
const ArtCanvas = forwardRef((props, ref) => {
    // Reference tag to the .art-canvas div container where dragable photo elements live
    const artCanvasRef = useRef<HTMLDivElement | null>(null)

    // Custom hook to return state to store the style properties for the dragable photo elements
    const photoStyle = usePhotoStyle()

    // useImperativeHandle is used to expose the artCanvasRef to the parent component (page)
    // This allows the parent component to access the DOM element directly, allowing for manipulation or measurement of the element
    useImperativeHandle(ref, () => artCanvasRef.current);

    return (
        <Gradient1>
            <div
                className='art-canvas relative flex flex-wrap gap-5 items-center justify-center p-[5vh] min-h-screen w-screen rounded-lg overflow-hidden'
                ref={artCanvasRef}
            >
                <Instruction 
                    dragConstraints={artCanvasRef}
                    // animate={{...photoStyle[0] }}
                />
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
        </Gradient1>
  )
})

// This is a default export of the ArtCanvas component, which can be imported and used in other parts of the application
export default ArtCanvas
