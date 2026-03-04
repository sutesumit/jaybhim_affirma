import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

interface TrailingImageProps {
    trail: {
        id: number;
        src: string;
        x: number;
        y: number;
    };
    variants?: Variants;
    className?: string;
}

const defaultVariants: Variants = {
    initial: { scale: 0.8, rotate: 3, opacity: 0 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: -30 }
};

/**
 * TrailingImage renders an animated trailing image.
 * Following OCP, it can be extended with custom variants and styles.
 */
const TrailingImage: React.FC<TrailingImageProps> = ({ 
  trail, 
  variants = defaultVariants,
  className = "rounded-sm object-cover shadow-[1px_1px_5px_0px_var(--primary-blue)]"
}) => {
  return (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
        style={{
            position: 'absolute',
            left: trail.x - 150,
            top: trail.y - 150,
            pointerEvents: "none",
        }}
    >
        <Image
            src={trail.src}
            alt="Trail Image"
            width={300}
            height={300}
            className={className}
        />
    </motion.div>
  );
}

export default TrailingImage