import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Define the structure for the trail object
interface TrailingImageProps {
    trail: {
        id: number; // Unique identifier for the trail image
        src: string; // Path for the trail image
        x: number; // x-coordinate where the image should appear
        y: number; // y-coordinate where the image should appear
    };
}

/**
 * TrailImage component
 * 
 * Renders a single animated image at a given (x, y) position on the screen
 * used to create a visual trailing effect following the mouse or another pointer
 * 
 * @param trail - An object containing the image source, x and y coordinates and unique ID. 
 */

const TrailingImage: React.FC<TrailingImageProps> = ({ trail }) => {

  return (
    // Use framer-motion's motion.div to animate the appearance, scaling, and rotation of the image
    <motion.div
        initial={{ scale: 0.8, rotate: 3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0, rotate: -30 }}
        transition={{ duration: 0.3 }}
        style={{
            position: 'absolute',
            left: trail.x - 150,
            top: trail.y - 150,
            pointerEvents: "none",
            opacity: 1,
        }}
    >
        {/* Render the trail image with Next.js's image component for optimized performance */}
        <Image
            src={trail.src}
            alt="Trail Image"
            width={300}
            height={300}
            className="rounded-sm object-cover shadow-[1px_1px_5px_0px_var(--primary-blue)]"
        />
    </motion.div>
  );
}

export default TrailingImage