import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Gradient1 from '@/app/my_components/gradients/Gradient1';

const MaraaSection = () => {
  return (
    <div className='flex text-container flex-col items-center justify-center gap-2'>
      <div className='inline-title-style'>Notes</div>
      <Gradient1>
        <div className='relative glass-hover font-rajdhani p-2 isolate flex flex-col items-center justify-center'>

          <div className="p-1 rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-center'>
              This project was nurtured with the support of <Link target='_blank' href="https://maraa.in/portfolio/mirrors-fellowship/" className="link-text">Maraa&apos;s Mirrors</Link> (2024) — A Creative Fellowship on Masculinity.
            </div>
          </div>
          {/* Section 2 */}
          {/* Maraa Post Fellowship Interview Video */}
          <div className="maraa-video glass-hover rounded-sm p-1 my-3 w-full aspect-[16/10] text-container flex flex-col items-center justify-center">
            <iframe
              className='rounded-sm w-full mx-auto object-cover'
              style={{
                width: '100%',
                height: '100%',
              }}
              src="https://www.youtube.com/embed/Zfsro2hMTws?si=4Ux5lmDwZLW9z7Pf&amp;start=128&end=180&loop=1&modestbranding=1&rel=0&hl=en"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            >
            </iframe>
            <div className='font-rajdhani text-sm pt-1'>A glimpse into the making & unmaking of Mirrors 2024.</div>
          </div>
          <div className="relative glass-hover isolate text-container flex flex-1 md:flex-row flex-col items-center justify-center gap-4">
            <Image
              src='/fathersandfigures/maraa_exhibition/1.jpg'
              alt='A visitor during the exhibition'
              width={220}
              height={200}
              className="rounded-sm overflow-hidden"
            />
            <Image
              src='/fathersandfigures/maraa_exhibition/2.jpg'
              alt='A visitor during the exhibition'
              style={{ transform: 'scaleX(-1)' }}
              width={220}
              height={200}
              className="rounded-sm overflow-hidden"
            />
          </div>
          <div className='rounded-sm font-rajdhani text-center text-sm p-1 mb-2'>
            Scenes from the <Link className='link-text' target='_blank' href="https://bangaloreinternationalcentre.org/event/mirrors/">Mirrors Group Show</Link> on Experiences & Expressions of Masculine & Feminine at Bangalore International Center, November 2024.
          </div>
        </div>
      </Gradient1>
    </div>
  );
};

export default MaraaSection;
