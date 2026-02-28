import React, { forwardRef } from 'react'

interface VideoscapeProps {
  src: string;
  bg_value?: string;
  id?: string;
}

const Videoscape = forwardRef<HTMLIFrameElement, VideoscapeProps>(({ src, bg_value, id }, ref) => {
  // Ensure enablejsapi=1 is in the src URL
  const videoSrc = src.includes('?') 
    ? `${src}&enablejsapi=1` 
    : `${src}?enablejsapi=1`;

  return (
    <>
      <div className='absolute inset-0 z-[-10] pointer-events-none'>
        <div className='flex items-center justify-center w-full h-full object-cover overflow-hidden'>
          <iframe
            ref={ref}
            id={id}
            className='aspect-video w-full overflow-hidden'
            src={videoSrc}
            title="Home Photobook Video"
            allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              objectFit: 'fill',
              pointerEvents: 'none',
              border: 'none'
            }}
          ></iframe>
        </div>
      </div>

      <div className={`absolute inset-0 ${bg_value} opacity-60`}></div>

      {/* <div 
          className='absolute inset-0 opacity-80'
          style={{
            backgroundImage: 'radial-gradient(circle, var(--primary-blue) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div> */}

    </>
  );
});

Videoscape.displayName = 'Videoscape';

export default Videoscape;

