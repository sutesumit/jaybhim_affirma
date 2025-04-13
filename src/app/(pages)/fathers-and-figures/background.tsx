'use client'

import React, { useState, useEffect, useRef } from "react";
import CursorDot from "@/app/my_components/shared/cursorPointers/CursorDot";
import TrailingImage from "./Background/TrailingImage";

interface Trail {
  id: number;
  src: string;
  x: number;
  y: number;
}

const Background = (): React.ReactElement => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const bgtrailsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (bgtrailsRef.current && bgtrailsRef.current.contains(event.target as Node)) { 
      const newTrail: Trail = {
        id: Date.now() + Math.random(),
        src: `/fathersandfigures/${Math.floor(Math.random() * 22 + 1)}.jpg`,
        x: event.clientX,
        y: event.clientY,
      };

      setTrails((prevTrails) => [...prevTrails, newTrail]);

      setTimeout(() => {
        setTrails((prevTrails) => prevTrails.filter((trail) => trail.id !== newTrail.id));
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="relative h-full w-full overflow-hidden cursor-none"
      ref={bgtrailsRef}
    >
      <CursorDot current={null} />
      {trails.map((trail) => (
        <TrailingImage key={trail.id} trail={trail}/>
      ))}
    </div>
  );
};

export default Background;
