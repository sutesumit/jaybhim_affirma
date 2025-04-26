import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Seperator from '@/app/my_components/shared/Seperator'

// ArtCanvas component for the Fathers and Figures page
const ArtCanvas = () => {
    // Reference tag to the .art-canvas div container where dragable photo elements live
    const artCanvasRef = useRef<HTMLDivElement | null>(null)

    // Type for image style properties for the dragable photo elements
    type photoStyleProp = {
        scale: number,
        rotate: number,
    }

    // State to store the style properties for the dragable photo elements
    const [photoStyle, setPhotoStyle] = useState<photoStyleProp[]>([])

    // useEffect hook to set the initial style properties for the dragable photo elements upon component mount
    useEffect(() => {
        setPhotoStyle(Array.from({ length: 23}, (_, i)=>{
            return {
                scale: Math.random() * .6 + .8,
                rotate: Math.random() * 60 - 30
            }
        }))
    }, [])

  return (
    <div 
        className='art-canvas relative flex flex-wrap gap-5 items-center justify-center p-[5vh] min-h-screen w-screen bg-gradient-to-tl from-blue-300 to-blue-50 rounded-lg overflow-hidden'
        ref={artCanvasRef}
      >
        {/* Overlapped and ecllipsed instruction for the art canvas aka playground for users to understand the interactivty in the art canvas */}
        <div 
          className="instruction absolute lowercase bg-blend-multiply top-[40%] -rotate-2 text-container m-2 !p-14 !text-xl !text-center border-dotted border-[1px] border-[var(--primary-blue)] rounded-sm"
        >
          📝🖼️ Craft a story by arranging these frames and watch as your thoughts weave into a father-son tale! 👨‍👦‍📑
        </div>

        {/* Mapping through the hardcoded length of 23 for an array to map through and render the motion.div container for 23 images from the fathersandfigures directory with stayles borrowed from the above imageStyle state array */}
        {Array.from({ length: 23 }, (_, i) => i).map((i) => (
          <motion.div
            key={i+200}
            className=''
            drag
            dragConstraints={artCanvasRef}
            style={{ ...photoStyle[i], cursor: 'grab' }}
            dragElastic={0.1}
            whileDrag={{ boxShadow: '0px 0px 10px 0px var(--primary-blue)', rotate: 0, scale: 1.1 }}
          >
            {/* Nextjs image component for lazy and optimized loading of the images  */}
            <Image
              src={`/fathersandfigures/${i + 1}.jpg`}
              alt={`Image ${i + 1}`}
              width={200}
              height={200}
              className="rounded-sm shadow-[1px_1px_1px_0px_var(--primary-blue)] pointer-events-none"
            />
          </motion.div>
        ))}
        <Seperator />
      </div>
  )
}

export default ArtCanvas
