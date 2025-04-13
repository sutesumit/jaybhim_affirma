'use client'
import React, { useState, useCallback, useRef } from "react";
import CursorDot from "@/app/my_components/shared/cursorPointers/CursorDot";
import TrailingImage from "./Background/TrailingImage";
import { useMouseTrail } from "./Background/useMouseTrail";

interface Trail {
  id: number;
  src: string;
  x: number;
  y: number;
}

const Background = (): React.ReactElement => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const bgtrailsRef = useRef<HTMLDivElement>(null);

  const addToTrail = useCallback((trail: Trail) => {
    setTrails((prevTrails) => [...prevTrails, trail])
  }, []);
  const removeFromTrail = useCallback((id: number) => {
      setTrails((prevTrails) => prevTrails.filter((trail) => trail.id !== id));
  }, []);

  useMouseTrail(bgtrailsRef, addToTrail, removeFromTrail);

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
