"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { PreviewImage } from "../PreviewImage";
import { ThumbnailStrip } from "../ThumbnailStrip";
import { GalleryControls } from "../GalleryControls";
import type { GalleryImage } from "../../imageList";
import { ImageModal } from "../ImageModal/ImageModal";
import { Dialog } from "@/components/ui/dialog";

interface Props {
  images: GalleryImage[];
}

const SLIDE_SHOW_INTERVAL = 5000;

export function DocumentaryGallery({ images }: Props) {
  const [isSlideShowPlaying, setIsSlideShowPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const previousPlayStateRef = useRef<boolean | null>(null);

  const goPrev = useCallback(() =>{ 
    setDirection(-1);
    setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);
  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent(i => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  const openModal = useCallback((image: GalleryImage) => {
    previousPlayStateRef.current = isSlideShowPlaying;
    setSelectedImage(image);
    setModalOpen(true);
    setIsSlideShowPlaying(false);
  }, [isSlideShowPlaying]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (previousPlayStateRef.current !== null) {
      setIsSlideShowPlaying(previousPlayStateRef.current);
      previousPlayStateRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isSlideShowPlaying) return;
    const interval = setInterval(() => goNext(), SLIDE_SHOW_INTERVAL);
    return () => clearInterval(interval);
  }, [isSlideShowPlaying, goNext, current]);

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
        currentImage={images[current]}
        goPrev={goPrev}
        goNext={goNext}
        onOpenModal={openModal}
      />
      <ThumbnailStrip
        images={images}
        currentIndex={current}
        onSelect={setCurrent}
      />

      {/* Temporary dev button to test modal */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => openModal(images[current])}
          className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-red-600 text-white text-xs rounded"
        >
          DEV: Open Modal
        </button>
      )}

      <Dialog open={modalOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <ImageModal image={selectedImage} onClose={closeModal} />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
