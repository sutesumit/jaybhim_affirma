import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const CardImagePreview: React.FC<CardImagePreviewProps> = ({ object, hoveredCard, x, y}) => {
  return (
    <div
        className="image-container"
    >
        <AnimatePresence>
            {hoveredCard === object.id && (
            <motion.img
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: -180 }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
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
