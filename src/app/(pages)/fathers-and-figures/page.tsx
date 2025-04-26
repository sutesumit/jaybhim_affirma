'use client'
import React from 'react';
import Seperator from '@/app/my_components/shared/Seperator'
import Image from 'next/image';
import Link from 'next/link';
import SubmitCards from './SubmitCards';
import HeroSection from './HeroSection';
import { ArtCanvas } from './ArtCanvas';


// Main landing page component for the "Fathers and Figures" page.

export default function Home() {

  return (
    <>
      <HeroSection />
      <ArtCanvas />
      {/* Section 3: Submit your own story here: */}
      
      <div className="relative isolate text-container grid md:grid-cols-2 my-2 md:flex-row flex-col items-center justify-center gap-5">
        <div className="flex-1 w-full max-h-[75vh] aspect-[7/12] border-[1px] border-[var(--primary-blue)] rounded-sm overflow-hidden">
          <iframe
            className='rounded-sm inline h-full overflow-hidden'
            src='https://www.youtube.com/embed/4yjNqLRRPxE?&controls=0&loop=1&playlist=4yjNqLRRPxE&modestbranding=1&showinfo=0&hl=en'
            title="Maraa Mirrors Reel"
            allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              
            }}
            >
            </iframe>
        </div>
        <div className='storyboard flex-1 flex flex-col gap-2 h-[80vh] md:h-full w-full'>
        <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Screeshot the story!</button>  
          <textarea defaultValue={'Describe your story here!'} className='text-center text-sm flex-1 p-5 w-full border-[1px] border-[var(--primary-blue)] rounded-sm' readOnly></textarea>
          <textarea defaultValue={'Your name (Optional)'} className='text-center text-sm p-1 w-full border-[1px] border-[var(--primary-blue)] rounded-sm' readOnly></textarea>
          <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Send me your story!</button>  
        </div>      
      </div>

      <div className="relative">
        <Seperator />
      </div>

      <SubmitCards />

      <div className="relative">
        <Seperator />
      </div>

      {/* Section 4: Maraa BIC Exhibition Photos */}
      <div className='relative isolate p-5 flex flex-col items-center justify-center'>
        <div className="text-container my-2 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-xs opacity-80 text-center'>This project was nurtured with the support of <Link target='_blank' href="https://maraa.in/portfolio/mirrors-fellowship/" className="link-text">Maraa&apos;s Mirrors</Link> (2024) — A Creative Fellowship on Masculinity.</div>
        </div>
        <div className="relative isolate text-container flex flex-1 md:flex-row flex-col items-center justify-center gap-4">
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
        <div className='text-container !text-xs !text-center p-1'>Scenes from the <Link className='link-text' target='_blank' href="https://bangaloreinternationalcentre.org/event/mirrors/">Mirrors Group Show</Link> on Experiences & Expressions of Masculine & Feminine at Bangalore International Center, November 2024. <span className="opacity-50">Image courtesy of <span className="italic">Angarika</span> from the Maraa team.</span></div>
        {/* Maraa Post Fellowship Interview Video */}
        <div className="maraa-video border-[1px] border-dotted rounded-sm border-[var(--primary-blue)] mt-5 p-1 w-full aspect-[16/10] text-container flex flex-col items-center justify-center">
            <iframe
              className='rounded-sm w-full mx-auto object-cover'
              style={{ width: '100%',
                      height: '100%',
                    }}
              src="https://www.youtube.com/embed/Zfsro2hMTws?si=4Ux5lmDwZLW9z7Pf&amp;start=128&end=180&loop=1&modestbranding=1&rel=0&hl=en"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            >
            </iframe>
            <div className='text-container !text-xs !text-center p-1 italic'>A glimpse into the making & unmaking of Mirrors 2024.</div>
        </div>
      </div>
    </>
  );
}