"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function ThumbnailStrip({ images, currentIndex, onSelect }: Props) {
  return (
    <div 
      className="absolute bottom-0 p-4 flex h-auto w-full overflow-x-auto gap-2 hide-scrollbar z-10 hide-scrollbar"
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
  );
}
