"use client";
import { useState, useCallback, useEffect } from "react";
import GalleryImage from "./GalleryImage";
import ThumbnailStrip from "./ThumbnailStrip";
import imageList from "./imageList";

export default function ImageGallery() {
  const [current, setCurrent] = useState(0);

  const goPrev = useCallback(() => setCurrent(i => (i === 0 ? imageList.length - 1 : i - 1)), []);
  const goNext = useCallback(() => setCurrent(i => (i === imageList.length - 1 ? 0 : i + 1)), []);

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
    <section className="relative flex flex-col items-center justify-center w-full h-full">
      <GalleryImage src={imageList[current]} alt={`Documentary ${current + 1}`} />
      <ThumbnailStrip images={imageList} currentIndex={current} onSelect={setCurrent} />
    </section>
  );
}
