"use client"

import React, { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image, { ImageProps } from 'next/image'

interface CardImagePreviewProps {
    object: {
        id: number,
        image: string,
        title: string
    },
    hoveredCard: number | null,
    x: number
    y: number
}

const MotionImage = motion.create(forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
    return <Image ref={ref} {...props}/>
}))

const CardImagePreview: React.FC<CardImagePreviewProps> = ({ object, hoveredCard, x, y}) => {
  return (
    <div
        className="image-container"
    >
        <AnimatePresence>
            {hoveredCard === object.id && (
            <MotionImage
                key={object.id}
                initial={{ opacity: 0, scale: 0, rotate: 180, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, rotate: 0, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0, rotate: -180, x: '-50%', y: '-50%' }}
                transition={{
                    duration: 0.3
                }}
                className='menu-image'
                src={object.image}
                alt={object.title}
                width={500}
                height={500}
                style={{
                borderRadius: '5px',
                position: 'fixed',
                objectFit: 'contain',
                visibility: 'visible',
                width: '20vw',
                zIndex: 10,
                pointerEvents: 'none',
                left: `${x}px`,
                top: `${y}px`,
                }}
            />
            )}
        </AnimatePresence>
    </div>
  )
}

export default CardImagePreview
