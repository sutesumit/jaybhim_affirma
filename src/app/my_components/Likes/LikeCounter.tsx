"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedActionDrawer } from "@/components/auth/ProtectedActionDrawer";
import { useLikes } from "./hooks/useLikes";
import { OdometerCount } from "./OdometerCount";
import { useNotFound } from "@/app/context/NotFoundContext";

interface LikeCounterProps {
  pathName: string | null;
}

const MOTION = {
  distance: 14,
  duration: 0.5,
  stagger: 0,
  ease: [0.22, 1, 0.36, 1],
};

const leafVariants = {
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

export function LikeCounter({ pathName }: LikeCounterProps) {
  const { likeCount, isLiked, isToggling, toggleLike } = useLikes(pathName);
  const { isNotFound } = useNotFound();
  
  console.log("LikeCounter: render", { pathName, isNotFound });

  const [locked, setLocked] = useState(false);
  const title = pathName
  ?.replace(/^\/|-/g, ' ')
  .replace(/\b\w/g, c => c.toUpperCase())
  .trim();


  const handleToggle = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (locked || isToggling || !pathName || isNotFound) return;
    
    setLocked(true);

    // Trigger the toggle action (hook handles optimistic updates and toast)
    await toggleLike();

    // Unlock after animation completes
    setTimeout(() => setLocked(false), MOTION.duration * 1000 + 120);
  };

  return (
    <div 
      className={`relative hidden lg:inline-block ${isNotFound ? "opacity-50 cursor-not-allowed filter grayscale" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <ProtectedActionDrawer 
        title={isNotFound ? "Page Not Found" : "Login to like"}
        description={isNotFound ? "This page doesn't exist, so it can't be liked." : `Verify to leave a little love for ${title}`}
        mode={isNotFound ? "view" : "action"}
      >
        <Link
          href={pathName ?? "/"}
          onClick={handleToggle}
          className={`router-tab reaction-counter ${isNotFound ? "pointer-events-none cursor-not-allowed" : ""}`}
        >
          <span className={`px-1 inline-flex items-center justify-center rounded-sm ${isLiked ? "bg-[var(--primary-blue)] text-[var(--primary-white)]" : ""} transition-all duration-700 ease-in-out`}>
            <span className={`text-xs inline-flex border-r border-[var(--primary-blue)] px-1 transition-all duration-700 ease-in-out`}>
              <OdometerCount value={likeCount} minDigits={3} />
            </span>
            <motion.div
              className="inline-flex items-center justify-center pl-1"
              animate={{ scale: locked ? 1.12 : 1 }}
              transition={{ duration: 0.15, ease: MOTION.ease }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLiked ? "liked" : "unliked"}
                  variants={leafVariants}
                  initial={isLiked ? "initialLike" : "initialUnlike"}
                  animate="animate"
                  exit={isLiked ? "exitLike" : "exitUnlike"}
                  transition={{
                    duration: MOTION.duration,
                    ease: MOTION.ease,
                    delay: MOTION.stagger,
                  }}
                  className={`${
                    isLiked
                      ? "text-[var(--primary-white)]"
                      : "text-[var(--primary-blue)]"
                  }`}
                >
                  <Heart className="w-4 h-4 inline-flex" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </span>
        </Link>
      </ProtectedActionDrawer>
    </div>
  );
}
