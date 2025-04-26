'use client'
import { useEffect, useRef } from 'react'
import { generateTrailImage } from './generateTrailImage';

// Define the structure for the trail object
interface Trail {
    id: number; // Unique Identifier for the trail image
    src: string; // Source URL or path of the trail image
    x: number; // x-coordinate of the image on the screen
    y: number; // y-coordinate of the image on the screen
   };

/**
 * useMouseTrail is a custom React hook to create and manage a mouse trail effect.
 * 
 * @param bgtrailsRef - A ref to the container element inside which the trail should appear
 * @param addToTrail - A Function to add a new trail object to the trail array/state
 * @param removeFromTrail - A Function to remove a trail object from the trail array/state
 *  */ 


export const useMouseTrail = (
  bgtrailsRef: React.RefObject<HTMLDivElement | null>, 
  addToTrail: (trail: Trail) => void, 
  removeFromTrail: (id: number) => void
) => {
  // keep track of mouse movement count to limit trail generation frequency
  const mouseMoveCounter = useRef(0)
  // trail frequency to adjust the trail clutter
  const trailFrequency = 15
  useEffect(() => {
    // handle mouse movement
        const handleMouseMove = (event: MouseEvent) => {
          // only generate the trail if the mouse is over the specified container
          if (bgtrailsRef.current?.contains(event.target as Node)) { 
            mouseMoveCounter.current++

            // Only create a trail image every given trailFrequency mouse events to limit the trail clutter
            if (mouseMoveCounter.current % trailFrequency === 0){
              const newTrail: Trail = generateTrailImage(event.clientX, event.clientY);
              
              // Add the trail image to the DOM and trail State
              addToTrail(newTrail);
              
              // Remove the trail image after a delay to simulate fading effect
              setTimeout(() => {
                  removeFromTrail(newTrail.id);
              }, 1600);
            }
          }
        };

        // Add event listener for mouse movement
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }, [bgtrailsRef, addToTrail, removeFromTrail]);
}