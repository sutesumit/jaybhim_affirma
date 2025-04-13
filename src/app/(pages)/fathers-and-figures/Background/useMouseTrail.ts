'use client'
import { useEffect } from 'react'
import { generateTrail } from './generateTrail';

interface Trail {
    id: number;
    src: string;
    x: number;
    y: number;
   };


export const useMouseTrail = (bgtrailsRef: React.RefObject<HTMLDivElement | null>, addToTrail: (trail: Trail) => void, removeFromTrail: (id: number) => void) => {
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
          if (bgtrailsRef.current?.contains(event.target as Node)) { 
            const newTrail: Trail = generateTrail(event.clientX, event.clientY);
      
            addToTrail(newTrail);
      
            setTimeout(() => {
                removeFromTrail(newTrail.id);
            }, 1000);
          }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }, [bgtrailsRef, addToTrail, removeFromTrail]);
}