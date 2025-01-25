import Link from 'next/link';
import { Slab } from 'react-loading-indicators';
import Pointer from './my_components/navbar/nav_pointer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      
        <div className='loader mb-5'></div>
        <div className="space-y-6">
          <p className="text-container !text-center">
            Oops! This page is under construction.
          </p>
          <p className="text-container !text-xs !text-center !leading-relaxed"><span className='italic opacity-50'>Or just classic 404 moment?</span><br />But worry not, sumit is rolling up his sleeves, 
          chasing down time and resources, and will bring this page to life soon.<br />Hang tight!</p>
          <Link 
            href="/" 
            className="flex justify-center px-4 py-2 rounded-sm border-[1px] border-[var(--primary-blue)] text-xs font-title bg-blend-difference hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-colors duration-1000 ease-out"
          >
            For now, let&#39;s take you back home.
          </Link>
        </div>
      
    </div>
  );
}