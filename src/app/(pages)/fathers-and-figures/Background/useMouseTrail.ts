'use client'
import { useEffect, useRef } from 'react'
import { generateTrailImage } from './generateTrailImage';

interface Trail {
    id: number;
    src: string;
    x: number;
    y: number;
   };


export const useMouseTrail = (bgtrailsRef: React.RefObject<HTMLDivElement | null>, addToTrail: (trail: Trail) => void, removeFromTrail: (id: number) => void) => {
  const mouseMoveCounter = useRef(0)
  useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
          if (bgtrailsRef.current?.contains(event.target as Node)) { 
            mouseMoveCounter.current++
              if (mouseMoveCounter.current % 15 === 0){
              const newTrail: Trail = generateTrailImage(event.clientX, event.clientY);
        
              addToTrail(newTrail);
        
              setTimeout(() => {
                  removeFromTrail(newTrail.id);
              }, 1600);
            }
          }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }, [bgtrailsRef, addToTrail, removeFromTrail]);
}