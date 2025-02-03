import React from 'react'

const Videoscape = ({src, bg_value}: {src: string, bg_value?: string | undefined}) => {
  return (
      <>
        <div className='absolute inset-0 z-[-10] pointer-events-none'>
          <div className='flex items-center justify-center w-full h-full object-cover overflow-hidden'>
            <iframe
              className='aspect-video w-full overflow-hidden'
              src={src}
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

        <div 
          className='absolute inset-0 opacity-80'
          style={{
            backgroundImage: 'radial-gradient(circle, var(--primary-blue) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>
        
      </>
  );
};

export default Videoscape;
