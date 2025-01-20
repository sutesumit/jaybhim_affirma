'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const FathersAndFigures = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateImagePosition = () => {
      if (!containerRef.current || !imageContainerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on container's position relative to viewport
      // Progress is 0 when container's top enters viewport, 1 when container's bottom exits viewport
      const progress = 1 - (containerRect.bottom / windowHeight);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Start at -80% (showing bottom 20%) and push the image down as we scroll
      // Scale the movement to complete within the viewport visibility range
      const translateY = -80 + (clampedProgress * 80);
      
      imageContainerRef.current.style.transform = `translateY(${translateY}%)`;
    };

    window.addEventListener('scroll', updateImagePosition);
    updateImagePosition(); // Initial position

    return () => window.removeEventListener('scroll', updateImagePosition);
  }, []);

  return (
    <section
      ref={containerRef}
      className="fathers-and-figures-container overflow-hidden relative h-[25vh] max-w-[80ch] mx-auto m-10 rounded-lg"
    >
      <div
        ref={imageContainerRef}
        className="fathers-and-figures-image-container w-full h-[500%]"
      >
        <Image
          src={'/FathersAndFigures.png'}
          alt="Fathers and Figures"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </section>
  );
};

export default FathersAndFigures;
