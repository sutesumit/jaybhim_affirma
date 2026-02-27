import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Seperator from '@/app/my_components/shared/Seperator'
import Instruction from './Instruction'
import DraggablePhoto from './DraggablePhoto'
import { usePhotoStyle } from './usePhotoStyleHook'
import Gradient1 from '@/app/my_components/gradients/Gradient1'
import { photoStyleProp } from './types'

/* ==========================================================================
   Internal Sub-Component (SRP: Photo List Rendering)
   ========================================================================== */

/**
 * Renders the collection of draggable photos based on provided styles.
 */
const PhotoCollection = ({ 
  styles, 
  constraints 
}: { 
  styles: photoStyleProp[], 
  constraints: React.RefObject<HTMLDivElement | null> 
}) => (
  <>
    {Array.from({ length: 23 }, (_, i) => i).map((i) => (
      <DraggablePhoto
        key={i + 200}
        src={`/fathersandfigures/${i + 1}.jpg`}
        alt={`Image ${i + 1}`}
        animate={styles[i]}
        dragConstraints={constraints}
      />
    ))}
  </>
);

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * ArtCanvas component for the Fathers and Figures page.
 * Provides a workspace for users to interact with and arrange photo elements.
 */
const ArtCanvas = forwardRef((props, ref) => {
    const artCanvasRef = useRef<HTMLDivElement | null>(null)
    const photoStyle = usePhotoStyle()

    useImperativeHandle(ref, () => artCanvasRef.current);

    return (
        <Gradient1>
            <div
                className='art-canvas relative flex flex-wrap gap-5 items-center justify-center p-[5vh] min-h-screen w-screen rounded-lg overflow-hidden'
                ref={artCanvasRef}
            >
                <Instruction dragConstraints={artCanvasRef} />
                
                <PhotoCollection styles={photoStyle} constraints={artCanvasRef} />
                
                <Seperator />
            </div>
        </Gradient1>
    )
})

export default ArtCanvas
