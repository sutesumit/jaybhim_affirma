'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NotFoundReporter } from './components/NotFoundReporter';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <NotFoundReporter />
      <div className="404-container flex flex-col items-center justify-center mx-2 p-10 rounded-lg font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out">
          <div className='loader2 mb-5'></div>
          <div className="space-y-6">
            <p className="text-container !text-center">
            Arre, 404. Looks like you&#39;ve lost your way.
            </p>
            <p className='line-through opacity-70'>art.sumitsute.com{usePathname()}</p>
            <p className="text-container !text-xs !text-center !leading-relaxed"><span className='italic opacity-50'>Or maybe there used to be something here?</span><br />This might be because work titles and URLs were recently rearranged. Check out the Works + Projects section to find what you need!</p>
            <div className='text-container flex justify-center gap-2 font-title bg-blend-difference transition-colors duration-1000 ease-out'>
              <Link
                href="/"
                className="flex justify-center items-center flex-1 px-4 py-2 text-center rounded-sm border-[1px] border-[var(--primary-blue)] text-xs hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]"
              >
                Let&#39;s take you back home.
              </Link>
            </div>
        </div>
      </div> 
    </div>
  );
}