"use client"
import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import EventEmitter from 'events';
import { pages } from '../content';

const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(20);

export function LunchboxFlipbook() {
  const bookRef = useRef(null);

  useEffect(() => {
    return () => {
      myEmitter.removeAllListeners();
    };
  }, []);

  return (
    <div className='flex min-h-screen w-screen justify-center bg-gradient-to-br from-blue-100 via-[--primary-white] to-blue-100'>
      {/* @ts-ignore */}
      <HTMLFlipBook
        startPage={0}
        width={300}
        height={500}
        drawShadow={true}
        startZIndex={0}
      >
        {pages.map((page, index) => (
          <div className="demoPage shadow-[--primary-blue] shadow-sm rounded-sm overflow-hidden" key={index}>
            <Image src={page} alt={`Page ${index}`} width={300} height={400} style={{ height: '100%' , width: '100%'}} priority={index < 4} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
