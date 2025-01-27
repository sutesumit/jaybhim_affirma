'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Home() {

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">

        
        <div 
          className="404-container flex flex-col items-center justify-center mx-2 p-10 rounded-lg font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out"
        >
          <div className='loader mb-5'></div>
          <div className="space-y-6">
            <p className="text-container !text-center">
              Arre! This page is under construction.
            </p>
            <p className="text-container !text-xs !text-center !leading-relaxed">But worry not, sumit is rolling up his sleeves,
            chasing down time and resources, and will bring this <span className='opacity-50'>Niranjan In A City</span> page to life soon.<br />Hang tight!</p>
          
            <div className='text-container flex justify-center gap-2 font-title bg-blend-difference transition-colors duration-1000 ease-out'>
              <Link
                href="https://youtu.be/llARFMPOTB0?t=174"
                target="_blank"
                className="flex justify-center items-center flex-1 px-4 py-2 text-center rounded-sm border-[1px] border-[var(--primary-blue)] text-xs hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]"
              >
                Watch the old walkthrough video here.
              </Link>
              <Link
                href="https://niranjaninpune.tumblr.com/"
                target="_blank"
                className="flex justify-center items-center flex-1 px-4 py-2 text-center rounded-sm border-[1px] border-[var(--primary-blue)] text-xs hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]"
              >
                Check out the work on the old blog.
              </Link>
            </div>
        </div>

        </div>
      
    </div>
  );
}