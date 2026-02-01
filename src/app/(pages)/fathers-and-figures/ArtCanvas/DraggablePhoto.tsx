import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { DraggablePhotoProps } from './types'

// Single draggable photo component for the Fathers and Figures page
const DraggablePhoto = ({src, alt, animate, dragConstraints }: DraggablePhotoProps) => {
  return (
    <motion.div
        className=''
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        style={{ cursor: 'grab' }}
        animate={{...animate }}
        whileDrag={{ boxShadow: '0px 0px 10px 0px var(--primary-blue)', rotate: 0, scale: 1.1 }}
    >
    {/* Nextjs image component for lazy and optimized loading of the images  */}
        <Image
            src={src}
            alt={alt}
            width={200}
            height={200}
            className="rounded-sm shadow-[1px_1px_1px_0px_var(--primary-blue)] pointer-events-none"
            
        />
    </motion.div>
)
}

export default DraggablePhoto