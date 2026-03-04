import React from 'react';
import { motion } from 'framer-motion';
import { flashFictions } from "../../content";
import Image from 'next/image';

export default function Background() {
  return (
    <motion.div 
      className='h-full w-auto py-6 gap-6 inline-flex items-center overflow-hidden filter'
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
    >
      <div className="absolute inset-0 z-50 bg-[--primary-blue] opacity-20"></div>
      {[...flashFictions, ...flashFictions].map((fiction, index) => (
        <motion.div 
          key={index}
          className='background-image-container h-full aspect-square grayscale opacity-70'
          initial={{ scale: 3.1, rotate: 0 }}
          animate={{ scale: ["5.1", "3.1", "5.1"], rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
        >
            <Image
              src={fiction.imageUrl}
              alt={fiction.title}
              width={800}
              height={800}
              style={{ objectFit: "cover" }}
            />
        </motion.div>
      ))}
    </motion.div>
  );
}
