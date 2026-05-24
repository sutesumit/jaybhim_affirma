"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ProtectedActionDrawer } from "@/components/features/protected";
import { cn } from "@/lib/utils";
import { useLikes } from "./hooks/useLikes";
import { OdometerCount } from "./OdometerCount";

interface ImageLikeButtonProps {
  pathName: string | null;
  className?: string;
  minDigits?: number;
}

const MOTION = {
  distance: 14,
  duration: 0.5,
  stagger: 0,
  ease: [0.22, 1, 0.36, 1] as const,
};

const heartVariants = {
  initialLike: {
    x: MOTION.distance,
    opacity: 0,
  },
  initialUnlike: {
    x: -MOTION.distance,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exitLike: {
    y: MOTION.distance,
    rotate: 180,
    scale: 0.5,
    opacity: 0,
  },
  exitUnlike: {
    x: -MOTION.distance,
    rotate: -10,
    scale: 1,
    opacity: 0,
  },
};

export function ImageLikeButton({
  pathName,
  className,
  minDigits = 3,
}: ImageLikeButtonProps) {
  const { likeCount, isLiked, isToggling, toggleLike } = useLikes(pathName);
  const [locked, setLocked] = useState(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current !== null) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  const handleToggle = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (locked || isToggling || !pathName) return;

    setLocked(true);
    await toggleLike();

    if (lockTimeoutRef.current !== null) {
      clearTimeout(lockTimeoutRef.current);
    }

    lockTimeoutRef.current = setTimeout(() => {
      setLocked(false);
      lockTimeoutRef.current = null;
    }, MOTION.duration * 1000 + 120);
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <ProtectedActionDrawer
        title="Login to like"
        description="Verify to leave a little love for the image."
        mode="action"
      >
        <button
          type="button"
          onClick={handleToggle}
          disabled={!pathName}
          className={cn(
            "button-style flex h-8 min-w-20 items-center justify-center gap-1 px-2 transition-all duration-500",
            isLiked && "bg-[var(--primary-blue)] text-[var(--primary-white)]",
            !pathName && "cursor-not-allowed opacity-50",
            className
          )}
          title={isLiked ? "Unlike this image" : "Like this image"}
          aria-label={isLiked ? "Unlike this image" : "Like this image"}
          aria-pressed={isLiked}
        >
          <span
            className={cn(
              "inline-flex items-center border-r px-1 text-xs",
              isLiked
                ? "border-[var(--primary-white)]/35"
                : "border-[var(--primary-blue)]"
            )}
          >
            <OdometerCount value={likeCount} minDigits={minDigits} />
          </span>
          <motion.span
            className="inline-flex items-center justify-center"
            animate={{ scale: locked ? 1.12 : 1 }}
            transition={{ duration: 0.15, ease: MOTION.ease }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isLiked ? "liked" : "unliked"}
                variants={heartVariants}
                initial={isLiked ? "initialLike" : "initialUnlike"}
                animate="animate"
                exit={isLiked ? "exitLike" : "exitUnlike"}
                transition={{
                  duration: MOTION.duration,
                  ease: MOTION.ease,
                  delay: MOTION.stagger,
                }}
                className="inline-flex"
              >
                <Heart className="h-4 w-4" />
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </button>
      </ProtectedActionDrawer>
    </div>
  );
}
