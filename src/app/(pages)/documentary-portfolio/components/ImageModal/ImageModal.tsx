"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Share2, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { randomInRange } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageLikeButton } from "@/components/features/likes";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "../../imageList";
import { GalleryImageViewport } from "../GalleryImageViewport";

const MOTION = {
  distance: 14,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

const shareIconVariants = {
  initialIdle: {
    x: -MOTION.distance,
    opacity: 0,
  },
  initialCopied: {
    x: MOTION.distance,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exitIdle: {
    x: -MOTION.distance,
    rotate: -10,
    scale: 1,
    opacity: 0,
  },
  exitCopied: {
    y: MOTION.distance,
    rotate: 180,
    scale: 0.5,
    opacity: 0,
  },
};

interface ImageModalProps {
  image: GalleryImage;
  onPrev?: () => void;
  onNext?: () => void;
  direction?: number;
}

export function ImageModal({
  image,
  onPrev,
  onNext,
  direction = 0,
}: ImageModalProps) {
  const { toast } = useToast();
  const initialRotation = React.useMemo(() => randomInRange(-5, 5), []);
  const likePath = `/documentary-portfolio?image=${encodeURIComponent(image.filename)}`;
  const [shareLocked, setShareLocked] = React.useState(false);
  const [shareCopied, setShareCopied] = React.useState(false);
  const shareResetTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (shareResetTimeoutRef.current !== null) {
        window.clearTimeout(shareResetTimeoutRef.current);
      }
    };
  }, []);

  const handlePrintInterest = () => {
    toast({
      variant: "default",
      title: "Coming Soon",
      description: "We are working on print orders for this gallery. Check back soon.",
    });
  };

  const handleShare = async () => {
    if (shareLocked) return;

    setShareLocked(true);

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      toast({
        variant: "success",
        title: "Link Copied",
        description: "The link is with you now. Pass it along.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Couldn't copy the link. Try again?",
      });
    } finally {
      if (shareResetTimeoutRef.current !== null) {
        window.clearTimeout(shareResetTimeoutRef.current);
      }

      shareResetTimeoutRef.current = window.setTimeout(() => {
        setShareLocked(false);
        setShareCopied(false);
      }, MOTION.duration * 1000 + 600);
    }
  };

  const metadataFields: [keyof GalleryImage, string][] = [
    ["year", "Year"],
    ["caption", "Caption"],
    ["organization", "Organization"],
    ["camera", "Camera"],
    ["lens", "Lens"],
    ["exposure", "Exposure"],
    ["iso", "ISO"],
    ["focalLength", "Focal Length"],
  ];

  const hasCaption = Boolean(image.caption && String(image.caption).trim() !== "");
  const visibleMetadata = metadataFields.filter(
    ([key]) => key !== "caption" && image[key] && String(image[key]).trim() !== ""
  );

  const imageVariants = {
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (currentDirection: number) => ({
      opacity: 0.65,
      x: currentDirection >= 0 ? "-100%" : "100%",
      filter: "blur(6px)",
    }),
  };

  return (
    <div className="flex max-h-[90vh] flex-col overflow-hidden">
      <DialogHeader className="shrink-0">
        <DialogTitle>Image Details</DialogTitle>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto">
        <div className="flex w-full flex-col items-center">
          <div className="w-full space-y-2 p-4">
            <div className="relative h-[42vh] w-full overflow-hidden rounded-sm glass-hover sm:h-[50vh] md:h-[58vh]">
              <AnimatePresence mode="sync" initial={false} custom={direction}>
                <motion.div
                  key={image.filename}
                  custom={direction}
                  variants={imageVariants}
                  initial={{
                    opacity: direction === 0 ? 1 : 0.65,
                    x: 0,
                    rotate: direction === 0 ? initialRotation : 0,
                    filter: direction === 0 ? "blur(0px)" : "blur(6px)",
                  }}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <GalleryImageViewport image={image} fit="contain" priority />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              key={`${image.filename}-details`}
              initial={{ opacity: 0.65, y: 10, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="rounded-sm glass-hover px-3 py-3"
            >
              {hasCaption && (
                <div className="pb-3 text-left">
                  <p className="text-sm font-light leading-relaxed text-foreground/90 md:text-base">
                    {String(image.caption)}
                  </p>
                </div>
              )}

              {visibleMetadata.length > 0 && (
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-x-1 gap-y-1",
                    hasCaption ? "border-t border-white/15 pt-1" : ""
                  )}
                >
                  {visibleMetadata.map(([key, label], index) => (
                    <React.Fragment key={key}>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-primary-blue opacity-55">
                          {label}
                        </span>
                        <span className="font-rajdhani text-sm tracking-[0.08em] text-primary-blue">
                          {String(image[key])}
                        </span>
                      </div>
                      {index < visibleMetadata.length - 1 && (
                        <span className="text-primary-blue/30">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </motion.div>

            <div className="flex w-full justify-between gap-2">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="button-style flex h-5 flex-1 items-center justify-center p-0"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="button-style flex h-5 flex-1 items-center justify-center p-0"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="h-fit px-4">
        <div className="flex h-8 w-full flex-row items-center justify-center gap-1">
          <button
            onClick={handlePrintInterest}
            className="button-style gradient-button h-8 flex-1"
            title="Get this print - coming soon"
            aria-label="Buy photo"
          >
            Get this print
          </button>
          <ImageLikeButton pathName={likePath} />
          <button
            onClick={handleShare}
            className="button-style flex h-8 w-8 flex-grow-0 items-center justify-center"
            title="Share this image"
            aria-label="Share this image"
            aria-live="polite"
          >
            <motion.span
              className={cn(
                "inline-flex h-4 w-4 items-center justify-center overflow-hidden",
                shareCopied && "text-[var(--primary-blue)]"
              )}
              animate={{ scale: shareLocked ? 1.12 : 1 }}
              transition={{ duration: 0.15, ease: MOTION.ease }}
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.span
                  key={shareCopied ? "copied" : "idle"}
                  variants={shareIconVariants}
                  initial={shareCopied ? "initialCopied" : "initialIdle"}
                  animate="animate"
                  exit={shareCopied ? "exitCopied" : "exitIdle"}
                  transition={{ duration: MOTION.duration, ease: MOTION.ease }}
                  className="absolute inset-0 inline-flex items-center justify-center"
                >
                  {shareCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </button>
        </div>
      </DialogFooter>
    </div>
  );
}
