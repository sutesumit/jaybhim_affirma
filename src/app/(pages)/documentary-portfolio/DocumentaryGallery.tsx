"use client";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PreviewImage from "./PreviewImage";
import ThumbnailStrip from "./ThumbnailStrip";
import imageList from "./imageList";

const SLIDE_SHOW_INTERVAL = 5000;

export default function DocumentaryGallery() {
  const  [isSlideShowPlaying, setIsSlideShowPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [current, setCurrent] = useState(0);

  const goPrev = useCallback(() =>{ 
    setDirection(-1);
    setCurrent(i => (i === 0 ? imageList.length - 1 : i - 1));
  }, []);
  const goNext = useCallback(() =>{ 
    setDirection(1);
    setCurrent(i => (i === imageList.length - 1 ? 0 : i + 1));
  }, []);

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

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <PreviewImage 
          key={current}
          src={`/documentary_portfolio/${imageList[current]}`} 
          alt={`Documentary ${current + 1}`} 
          custom={direction}
        />
      </AnimatePresence>
      <ThumbnailStrip images={imageList} currentIndex={current} onSelect={setCurrent} />
    </section>
  );
}
