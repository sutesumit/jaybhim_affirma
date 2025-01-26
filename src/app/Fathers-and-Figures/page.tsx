import Link from 'next/link';
import Videoscape from '../my_components/image_bodies/videoscape';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">

        <div className='reel-container absolute z-[-10] aspect-[9/16] rounded-lg overflow-clip pointer-events-none'>
            <iframe
              className='overflow-hidden pointer-events-none'
              src='https://www.youtube.com/embed/4yjNqLRRPxE?autoplay=1&mute=1&controls=0&loop=1&playlist=4yjNqLRRPxE&modestbranding=1&showinfo=0&version=3&rel=0&cc_load_policy=3&hl=en'
              title="Maraa Mirrors Reel"
              allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                objectFit: 'fill',
                width: '100%',
                height: '100%',
                top: '20',
                left: '20',
                pointerEvents: 'none',
                border: 'none'
              }}
            ></iframe>
            
        </div>

        <div className="404-container flex flex-col items-center justify-center mx-2 p-10 rounded-lg font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out">
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
                href="https://www.sumitsute.com/Fathers-and-Figures"
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