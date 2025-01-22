'use client'
import Image from 'next/image'; 


const Flipbook = () => {

    const evenLunchboxPages = (range: number) => {
        const lunchboxPages = Array.from({ length: range }, (_, i) => i); // Generate array [0, 1, 2, ... range-1]
        const evenLunchboxPages = lunchboxPages.filter((i: number) => i % 2 === 0); // Keep only even numbers
        return evenLunchboxPages;
    };
    

  return (
    <div className='flipbook-container font-rajdhani text-[--primary-white] max-w-[80ch] w-full mx-auto m-2 px-4 sm:px-6'>
          <div className="spread flex overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide gap-4 py-[1px]">
            {evenLunchboxPages(69).map((page, index) => (
              <div key={page} className="border-[1px] border-[--primary-blue] rounded-sm w-full flex-shrink-0 snap-center">
                <div className="flex flex-row items-center gap-0 p-6">
                    <Image 
                        src={`/lunchbox_pages/Lunchboxe_Page_${page}.jpg`} 
                        alt={`Lunchboxe Page ${page}`} 
                        width={50} 
                        height={50}
                        style={{ 
                            objectFit: 'contain',
                            objectPosition: 'top',
                            width: '50%'
                        }}
                    />
                    <Image 
                        src={`/lunchbox_pages/Lunchboxe_Page_${page+1}.jpg`} 
                        alt={`Lunchboxe Page ${page}`} 
                        width={50} 
                        height={50} 
                        style={{ 
                            objectFit: 'contain',
                            objectPosition: 'top',
                            width: '50%'
                        }}
                    />
                  
                </div>
              </div>
            ))}
          </div>
          
          <div className="navigation-buttons flex justify-around w-full h-5 rounded-sm">
            <button 
              onClick={() => {
                const container = document.querySelector('.spread');
                container?.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
              }}
              className="z-10 flex justify-center items-center rounded-sm w-full border-[1px] border-[--primary-blue] text-[--primary-blue]"
              aria-label="Previous card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
    
            <button 
              onClick={() => {
                const container = document.querySelector('.spread');
                container?.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
              }}
            className="z-10 flex justify-center items-center rounded-sm w-full border-[1px] border-[--primary-blue] text-[--primary-blue]"
              aria-label="Next card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
  );
};

export default Flipbook;
