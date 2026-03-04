'use client'
import { useEffect, useRef } from 'react'

interface Trail {
  id: number;
  src: string;
  x: number;
  y: number;
}

/**
 * useMouseTrail manages a mouse trail effect within a container.
 * Following DIP, it depends on an injected trail generator function.
 */
export const useMouseTrail = (
  containerRef: React.RefObject<HTMLDivElement | null>, 
  addToTrail: (trail: Trail) => void, 
  removeFromTrail: (id: number) => void,
  generateTrail: (x: number, y: number) => Trail // Injected dependency
) => {
  const mouseMoveCounter = useRef(0)
  const trailFrequency = 15

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) { 
        mouseMoveCounter.current++

        if (mouseMoveCounter.current % trailFrequency === 0) {
          const newTrail = generateTrail(event.clientX, event.clientY);
          addToTrail(newTrail);
          
          setTimeout(() => {
            removeFromTrail(newTrail.id);
          }, 1600);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef, addToTrail, removeFromTrail, generateTrail]);
}