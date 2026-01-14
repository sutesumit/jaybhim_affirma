"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import type { GalleryImage } from "./imageList";
import { ChevronLast, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Props {
  images: GalleryImage[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

const IDLE_TIMEOUT = 4000;

export default function ThumbnailStrip({ images, currentIndex, onSelect }: Props) {
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
      className="absolute bottom-0 w-full z-30"
      initial="visible"
      animate={isIdle ? "idle" : "visible"}
      variants={{
        visible: { y: 0, opacity: 1 },
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
        {images.map((image, idx) => (
          <motion.button
            key={image.filename}
            ref={(el) => { itemRef.current[idx] = el }}
            className={`relative flex-shrink-0 w-24 h-24 rounded transition-all duration-300 ${
              idx === currentIndex 
                ? "card-shadow glass-hover z-10" 
                : ""
            }`}
            onClick={() => onSelect(idx)}
            animate={{ 
              scale: idx === currentIndex ? 1.2 : 1,
              opacity: idx === currentIndex ? 1 : 0.6
            }}
            whileHover={{ 
              scale: idx === currentIndex ? 1.2 : 1.1,
              opacity: idx === currentIndex ? 1 : 0.6
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover rounded" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
