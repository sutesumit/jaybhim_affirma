'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReactionCounterProps {
  pathName: string | null;
}

const MOTION = {
  distance: 14,
  duration: 0.5,
  stagger: 0.07,
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
    x: -MOTION.distance,
    opacity: 0,
  },
  exitUnlike: {
    x: MOTION.distance,
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

    setTimeout(() => {
      setCount((c) => (isLiked ? c - 1 : c + 1));
      setIsLiked((v) => !v);
    }, MOTION.duration * 1000 * 0.5);

    setTimeout(
      () => setLocked(false),
      MOTION.duration * 1000 + 120
    );
  };

  return (
    <Link
      href={pathName ?? '/'}
      onClick={toggle}
      className="router-tab reaction-counter"
    >
      <span className="text-xs inline mr-1 border-r border-[var(--primary-blue)] pr-1">
        {count}
      </span>

      <motion.div
        className="inline-flex items-center justify-center"
        animate={{ scale: locked ? 1.12 : 1 }}
        transition={{ duration: 0.15, ease: MOTION.ease }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLiked ? 'liked' : 'unliked'}
            variants={leafVariants}
            initial={isLiked ? 'initialLike' : 'initialUnlike'}
            animate="animate"
            exit={isLiked ? 'exitLike' : 'exitUnlike'}
            transition={{
              duration: MOTION.duration,
              ease: MOTION.ease,
              delay: MOTION.stagger,
            }}
            className={`${
              isLiked ? 'text-green-700' : 'hover:text-green-700'
            }`}
          >
            <Leaf className="w-4 h-4 inline" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
