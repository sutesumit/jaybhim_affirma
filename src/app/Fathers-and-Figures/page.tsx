'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Home() {

  const frame = globalThis.window

  const useMousePostion = ( ) => {
    
    const [mouseCords, setMouseCords] = React.useState({x: 0, y: 0})
    
    useEffect(()=> {
        const updateMouseCords = (event: MouseEvent): void => {
            if (event) {
                setMouseCords({ x: event.clientX, y: event.clientY });
            }
        }
        window.addEventListener('mousemove', updateMouseCords)
        return () => {
            window.removeEventListener('mousemove', updateMouseCords)
        }
    }, [])
    return mouseCords
  }

  const [isHovered, setIsHovered] = React.useState(false)

  const {x, y} = useMousePostion()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">

        <div 
          className='reel-container absolute z-[-10] aspect-[9/16] rounded-lg overflow-clip pointer-events-none'
          style={{
            top: `${y}px`,
            left: `${x}px`,
          }}
        >
            { isHovered &&
              
              <iframe
              className='overflow-hidden pointer-events-none'
              src='https://www.youtube.com/embed/4yjNqLRRPxE?autoplay=1&mute=1&controls=0&loop=1&playlist=4yjNqLRRPxE&modestbranding=1&showinfo=0&version=3&rel=0&cc_load_policy=3&hl=en'
              title="Maraa Mirrors Reel"
              allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                border: 'none'
              }}
              ></iframe>

            }
            
        </div>

        <div 
          className="404-container flex flex-col items-center justify-center mx-2 p-10 rounded-lg font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='loader mb-5'></div>
          <div className="space-y-6">
            <p className="text-container !text-center">
              Arre! This page is under construction.
            </p>
            <p className="text-container !text-xs !text-center !leading-relaxed">But worry not, sumit is rolling up his sleeves,
            chasing down time and resources, and will bring this page to life soon.<br />Hang tight!</p>
          
            <div className='text-container flex justify-center gap-2 font-title bg-blend-difference transition-colors duration-1000 ease-out'>
              <Link
                href="https://youtu.be/llARFMPOTB0?t=1119"
                target="_blank"
                className="flex justify-center items-center flex-1 px-4 py-2 text-center rounded-sm border-[1px] border-[var(--primary-blue)] text-xs hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]"
              >
                Watch the old walkthrough video here.
              </Link>
              <Link
                href="https://sumitupall.tumblr.com/"
                target="_blank"
                className="flex justify-center items-center flex-1 px-4 py-2 text-center rounded-sm border-[1px] border-[var(--primary-blue)] text-xs hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]"
              >
                Check out the work on the old site.
              </Link>
            </div>
        </div>

        </div>
      
    </div>
  );
}