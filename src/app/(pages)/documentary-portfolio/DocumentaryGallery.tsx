"use client";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PreviewImage from "./PreviewImage";
import ThumbnailStrip from "./ThumbnailStrip";
import GalleryControls from "./GalleryControls";
import type { GalleryImage } from "./imageList";

interface Props {
  images: GalleryImage[];
}

const SLIDE_SHOW_INTERVAL = 5000;

export default function DocumentaryGallery({ images }: Props) {
  const  [isSlideShowPlaying, setIsSlideShowPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [current, setCurrent] = useState(0);

  const goPrev = useCallback(() =>{ 
    setDirection(-1);
    setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);
  const goNext = useCallback(() =>{ 
    setDirection(1);
    setCurrent(i => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isSlideShowPlaying) return;
    const interval = setInterval(() => goNext(), SLIDE_SHOW_INTERVAL);
    return () => clearInterval(interval);
  }, [isSlideShowPlaying, goNext, current]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  if (images.length === 0) return null;

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <PreviewImage 
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          custom={direction}
        />
      </AnimatePresence>
      <GalleryControls 
        isPlaying={isSlideShowPlaying} 
        onTogglePlay={() => setIsSlideShowPlaying(prev => !prev)}
        // currentImage={images[current]}
        goPrev={goPrev}
        goNext={goNext}
      />
      <ThumbnailStrip 
        images={images} 
        currentIndex={current} 
        onSelect={setCurrent} 
      />
    </section>
  );
}
