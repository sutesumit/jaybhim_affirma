import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface TrailingImageProps {
    trail: {
        id: number;
        src: string;
        x: number;
        y: number;
    };
}

const TrailingImage: React.FC<TrailingImageProps> = ({ trail }) => {

  return (
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