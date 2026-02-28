'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NotFoundReporter } from './components/NotFoundReporter';
import Gradient1 from '@/app/my_components/gradients/Gradient1';
import MenuToggleControl from './my_components/Header/Navigation/MenuToggleControl';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Gradient1>
        <NotFoundReporter />
        <div className="404-container flex flex-col items-center justify-center p-10 rounded-md card-shadow font-rajdhani text-center overflow-clip glass-hover transition-transition duration-300 ease-in-out">
          <div className='loader2 mb-5'></div>
          <div className="space-y-6">
            <p className="text-container !text-center">
              Arre, 404. Looks like you&#39;ve lost your way.
            </p>
            <p className='line-through opacity-70'>art.sumitsute.com{usePathname()}</p>
            <div className="text-container !text-xs !text-center !leading-relaxed">
              <span className='italic opacity-50'>Or maybe there used to be something here?</span><br />This might be because work titles and URLs were recently rearranged.
              <div className="!text-xs !text-center !leading-relaxed">
                Check out <MenuToggleControl /> to find what you need!
              </div>
            </div>
            <div className='text-container flex justify-center gap-2 font-title bg-blend-difference transition-colors duration-1000 ease-out'>
              <Link
                href="/"
                className="flex justify-center items-center flex-1 px-4 py-2 text-sm text-center button-style"
              >
                Let&#39;s take you back home.
              </Link>
            </div>
          </div>
        </div>
      </Gradient1>
    </div>
  );
}