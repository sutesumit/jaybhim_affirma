"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReactionCounterProps {
  pathName: string | null;
}

const MOTION = {
  distance: 4,
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
    scale: 0.2,
    opacity: 0,
  },
  exitUnlike: {
    x: -MOTION.distance,
    rotate: -10,
    scale: 1.2,
    opacity: 0,
  },
};

export default function ReactionCounter({ pathName }: ReactionCounterProps) {
  const [count, setCount] = useState(201);
  const [isLiked, setIsLiked] = useState(false);
  const [locked, setLocked] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (locked) return;
    setLocked(true);

    setTimeout(
      () => {
        setCount((c) => (isLiked ? c - 1 : c + 1));
        setIsLiked((v) => !v);
      },
      MOTION.duration * 1000 * 0.5,
    );

    setTimeout(() => setLocked(false), MOTION.duration * 1000 + 120);
  };

  return (
    <Link
      href={pathName ?? "/"}
      onClick={toggle}
      className="router-tab reaction-counter"
    >
      <span className={`px-1 rounded-sm ${isLiked ? "bg-[var(--primary-blue)] text-[var(--primary-white)]" : ""} transition-all duration-1000`}>
        <span className="text-xs min-w-8 text-center inline-block mr-1 border-r border-[var(--primary-blue)] pr-1">
          {count}
        </span>
        <motion.div
          className="inline-block items-center justify-center"
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
  );
}
