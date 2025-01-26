'use client'
import React, { useState } from 'react'

const Paragraph_7 = () => {
  const [sliderPosition, setSliderPosition] = useState(25);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(x, 0), 100));
  };

  return (
    <div 
      className='relative text-container paragraph-container cursor-ew-resize'
      onMouseMove={handleMouseMove}
      style={{ height: 'fit-content' }}
    >
      {/* Container for both text layers */}
      <div className='relative overflow-hidden'>
        {/* Top layer (paragraph) */}
        <p 
          className='relative z-10 pb-4 transition-all duration-200 ease-in-out'
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          So, I used to be an artist.
        </p>

        {/* Bottom layer (code) */}
        <div 
          className="absolute inset-0 z-0 bg-[var(--primary-blue)] rounded-md transition-all duration-200 ease-in-out"
          style={{
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          <code className='codeblock flex items-center h-full pl-4 text-[var(--primary-white)]'>
            <span className="typewriter">&lt;!-- But now, I also code to serve the arts. --&gt;</span>
          </code>
        </div>
      </div>
    </div>
  )
}

export default Paragraph_7
