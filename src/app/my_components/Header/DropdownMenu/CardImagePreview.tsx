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
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: -180 }}
                transition={{
                    duration: 0.3
                }}
                className='menu-image'
                src={object.image}
                alt={object.title}
                width={100}
                height={100}
                style={{
                borderRadius: '10px',
                position: 'absolute',
                objectFit: 'contain',
                visibility: 'visible',
                width: '20vw',
                zIndex: 10,
                pointerEvents: 'none',
                left: `calc(${x}px - 10vw)`,
                top: `calc(${y}px - 10vw)`,
                }}
            />
            )}
        </AnimatePresence>
    </div>
  )
}

export default CardImagePreview
