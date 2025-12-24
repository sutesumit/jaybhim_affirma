"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

const IDLE_TIMEOUT = 1000;

export default function ThumbnailStrip({ images, currentIndex, onSelect }: Props) {
  // const [isOpen, setIsOpen] = useState(true);
  const [isIdle, setIsIdle] = useState(false);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<(HTMLButtonElement | null)[]>([]);

  const resetTimer = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);
  }

  useEffect(() => {
    if(scrollContainerRef.current && itemRef.current[currentIndex]) {
      const container = scrollContainerRef.current;
      const activeItem = itemRef.current[currentIndex];

      if (activeItem) {
        const scrollLeft =
          activeItem.offsetLeft -
          (container.offsetWidth / 2) +
          (activeItem.offsetWidth / 2);

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        })
          
      }
    }

  }, [currentIndex])

  useEffect(() => {
    resetTimer();
    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    }
  }, [])

  const handleMouseEnter = () => {
    setIsIdle(false);
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  }

  const handleMouseLeave = () => {
    resetTimer();
  }

  return (
    <motion.div 
      className="absolute bottom-0 w-full z-10"
      initial="visible"
      animate={isIdle ? "idle" : "visible"}
      variants={{
        visible: { y: 0, opacity: 1 },
        // hidden: { y: "100%", opacity: 1 },
        idle: { y: 40, opacity: 0.05 }
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
    >      
      <div 
        ref={scrollContainerRef}
        className="flex h-auto px-[50vw] py-4 w-full overflow-x-auto gap-2 hide-scrollbar bg-gradient-to-t from-black/80 to-transparent"
        style={{ overscrollBehavior: "contain" }}
        onWheel={(e) => {
          e.preventDefault();
          e.currentTarget.scrollLeft += e.deltaY;
        }}  
      >
        {images.map((filename, idx) => (
          <motion.button
            key={filename}
            ref={(el) => { itemRef.current[idx] = el }}
            className={`relative flex-shrink-0 w-24 h-24 rounded transition-all duration-300 ${
              idx === currentIndex 
                ? "ring-4 ring-white scale-110 z-10 shadow-lg shadow-black/50" 
                : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
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
