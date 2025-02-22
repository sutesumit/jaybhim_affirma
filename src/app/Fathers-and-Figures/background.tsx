'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Trail {
  id: number;
  src: string;
  x: number;
  y: number;
}

const Background = (): React.ReactElement => {
  const [trails, setTrails] = useState<Trail[]>([]);

  const handleMouseMove = (event: MouseEvent) => {
    const newTrail: Trail = {
      id: Date.now() + Math.random(),
      src: `/fathersandfigures/${Math.floor(Math.random() * 22 + 1)}.jpg`,
      x: event.clientX,
      y: event.clientY,
    };

    setTrails((prevTrails) => [...prevTrails, newTrail]);

    setTimeout(() => {
      setTrails((prevTrails) => prevTrails.filter((trail) => trail.id !== newTrail.id));
    }, 1800);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative h-full w-full">
      {trails.map((trail) => (
        <Image
          key={trail.id}
          src={trail.src}
          alt="Trail Image"
          width={300}
          height={300}
          className="rounded-sm object-cover translate-x-[-50%] translate-y-[-50%] shadow-[1px_1px_5px_0px_var(--primary-blue)]"
          style={{
            position: "absolute",
            left: trail.x,
            top: trail.y,
            pointerEvents: "none",
            opacity: 1,
            transform: "scale(1)",
            transition: "opacity 2s ease-out, transform .8s ease-out",
          }}
          onLoad={(e) => {
            setTimeout(() => {
              (e.target as HTMLImageElement).style.opacity = "0";
            }, 50);
          }}
        />
      ))}
    </div>
  );
};

export default Background;
