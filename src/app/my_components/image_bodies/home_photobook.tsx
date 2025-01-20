import React from 'react'

const HomePhotobook = () => {
  return (

      <div className='flex items-center justify-center w-full h-full object-cover overflow-hidden'>
        <iframe
          className='aspect-video w-full overflow-hidden'
          src="https://www.youtube.com/embed/INBzyeMpWzo?autoplay=1&mute=1&controls=0&loop=1&playlist=INBzyeMpWzo&modestbranding=1&showinfo=0"
          title="Home Photobook Video"
          allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            pointerEvents: 'none',
            border: 'none'  // Remove iframe border
          }}
        ></iframe>
      </div>
  );
};

export default HomePhotobook;
