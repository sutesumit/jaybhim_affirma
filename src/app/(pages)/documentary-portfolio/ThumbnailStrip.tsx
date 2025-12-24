"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

interface Props {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function ThumbnailStrip({ images, currentIndex, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div 
      className="absolute bottom-0 w-full z-10"
      initial="visible"
      animate={isOpen ? "visible" : "hidden"}
      variants={{
        visible: { y: 0, },
        hidden: { y: "100%" }
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div 
        className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-full cursor-pointer hover:bg-white/20 transition-all z-20"
        onClick={() => setIsOpen(!isOpen)}
        // whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
        animate={{rotate: isOpen ? 180 : 0, y: isOpen ? 0 : -20}}
        transition={{ duration: 0.1 }}
      >
        <ChevronUp className="w-5 h-5 text-white/80" />
      </motion.div>
      
      <div 
        className="flex h-auto p-4 w-full overflow-x-auto gap-2 hide-scrollbar bg-gradient-to-t from-black/80 to-transparent"
        style={{ overscrollBehavior: "contain" }}
        onWheel={(e) => {
          e.preventDefault();
          e.currentTarget.scrollLeft += e.deltaY;
        }}  
      >
        {images.map((filename, idx) => (
          <motion.button
            key={filename}
            className={`relative flex-shrink-0 w-24 h-24 rounded ${idx === currentIndex ? "ring-2 ring-primary" : ""}`}
            onClick={() => onSelect(idx)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={`/documentary_portfolio/${filename}`} alt={`thumb ${idx + 1}`} fill className="object-cover rounded" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
