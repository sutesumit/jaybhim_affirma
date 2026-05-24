"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PreviewImage } from "../PreviewImage";
import { ThumbnailStrip } from "../ThumbnailStrip";
import { GalleryControls } from "../GalleryControls";
import type { GalleryImage } from "../../imageList";
import { ImageModal } from "../ImageModal/ImageModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDocumentaryGalleryController } from "./useDocumentaryGalleryController";
import { useGalleryRouteState } from "./useGalleryRouteState";

interface Props {
  images: GalleryImage[];
}

const SLIDE_SHOW_INTERVAL = 5000;

export function DocumentaryGallery({ images }: Props) {
  const { selectedImageId, setSelectedImageId } = useGalleryRouteState();
  const {
    currentIndex,
    currentImage,
    direction,
    isDialogOpen,
    isSlideShowPlaying,
    modalImage,
    modalPhase,
    shouldRenderModalContent,
    canInteractWithGallery,
    openImage,
    requestClose,
    completeClose,
    goNext,
    goPrev,
    goNextInModal,
    goPrevInModal,
    selectIndex,
    toggleSlideShow,
  } = useDocumentaryGalleryController({
    images,
    slideShowInterval: SLIDE_SHOW_INTERVAL,
    routeImageId: selectedImageId,
    setRouteImageId: setSelectedImageId,
  });

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        if (isDialogOpen) {
          goPrevInModal();
          return;
        }

        if (canInteractWithGallery) {
          goPrev();
        }

        return;
      }

      if (event.key === "ArrowRight") {
        if (isDialogOpen) {
          goNextInModal();
          return;
        }

        if (canInteractWithGallery) {
          goNext();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    canInteractWithGallery,
    goNext,
    goNextInModal,
    goPrev,
    goPrevInModal,
    isDialogOpen,
  ]);

  if (images.length === 0 || !currentImage) {
    return null;
  }

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <PreviewImage
          key={currentIndex}
          image={currentImage}
          custom={direction}
        />
      </AnimatePresence>

      <GalleryControls
        isPlaying={isSlideShowPlaying}
        onTogglePlay={toggleSlideShow}
        currentImage={currentImage}
        goPrev={goPrev}
        goNext={goNext}
        onOpenModal={openImage}
        disabled={!canInteractWithGallery}
      />

      <ThumbnailStrip
        images={images}
        currentIndex={currentIndex}
        onSelect={selectIndex}
      />

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && requestClose()}>
        <DialogContent
          className="max-w-4xl overflow-hidden"
          onAnimationEnd={(event) => {
            if (
              modalPhase === "closing" &&
              event.target === event.currentTarget &&
              event.currentTarget.getAttribute("data-state") === "closed"
            ) {
              completeClose();
            }
          }}
        >
          {shouldRenderModalContent && modalImage && (
            <ImageModal
              image={modalImage}
              onPrev={goPrevInModal}
              onNext={goNextInModal}
              direction={direction}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
