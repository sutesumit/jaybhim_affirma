"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedActionDrawer } from "../AuthCard/ProtectedActionDrawer";
import { useLikes } from "./hooks/useLikes";

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
  const [locked, setLocked] = useState(false);

  const handleToggle = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (locked || isToggling || !pathName) return;
    
    setLocked(true);

    // Trigger the toggle action (hook handles optimistic updates and toast)
    await toggleLike();

    // Unlock after animation completes
    setTimeout(() => setLocked(false), MOTION.duration * 1000 + 120);
  };

  return (
    <div 
      className="relative inline-block"
      onClick={(e) => e.stopPropagation()}
    >
      <ProtectedActionDrawer 
        title="Login to like" 
        mode="action"
      >
        <Link
          href={pathName ?? "/"}
          onClick={handleToggle}
          className="router-tab reaction-counter"
        >
          <span className={`px-1 justify-center rounded-sm ${isLiked ? "bg-[var(--primary-blue)] text-[var(--primary-white)]" : ""} transition-all duration-700 ease-in-out`}>
            <span className={`text-xs text-center inline-block border-r border-[var(--primary-blue)] px-1 transition-all duration-700 ease-in-out`}>
              {likeCount}
            </span>
            <motion.div
              className="inline-block items-center justify-center pl-1"
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
                  <Leaf className="w-4 h-4 inline" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </span>
        </Link>
      </ProtectedActionDrawer>
    </div>
  );
}
