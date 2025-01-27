"use client"
import React from 'react'
import Image from 'next/image'
import { flashFictions } from './flash_fiction_object';

const WritingsSnapscroll = () => {
  return (
    <div className='marathi-writings-container font-rajdhani text-[--primary-blue] max-w-[100ch] w-full mx-auto m-2 px-4 sm:px-6'>
      <div className="all-cards flex overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide gap-4 py-[1px] border-[1px] border-[--primary-blue] rounded-sm">
        {flashFictions.map((fiction, index) => (
          <div key={index} className="card bg-[--primary-white] rounded-sm w-full flex-shrink-0 snap-center">
            <div className="flex flex-col-reverse md:flex-row sm:flex-row items-start gap-4 p-6">
              <div className="card-content md:w-[50%] sm:w-[50%] aspect-square overflow-y-auto scrollbar-hide scrollbar-thin border-[1px] border-[--primary-blue] rounded-sm">
                <h3 className='card-title text-center sticky z-10 top-0 bg-[--primary-white] p-1'>{fiction.title}</h3>
                <h4 className="date text-xs text-[--primary-blue] opacity-50 text-center p-1">{fiction.date}</h4>
                <p className="card-para text-xs leading-relaxed whitespace-pre-wrap px-4">{fiction.content}</p>
              </div>
              <div className="image-wrapper rounded-sm overflow-clip aspect-square md w-full md:w-[50%] sm:w-[50%] relative">
                <Image 
                  className='object-contain' 
                  src={fiction.imageUrl}
                  fill
                  alt={fiction.title}
                  priority 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="navigation-buttons flex justify-around w-full mt-2 h-5 bg-[--primary-white] border-[1px] border-[--primary-blue] rounded-sm">
        <button 
          onClick={() => {
            const container = document.querySelector('.all-cards');
            container?.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
          }}
          className="bg-[--primary-white] hover:bg-[--primary-blue] hover:text-[--primary-white] transition-all z-10 flex justify-center items-center w-full rounded-sm"
          aria-label="Previous card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button 
          onClick={() => {
            const container = document.querySelector('.all-cards');
            container?.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
          }}
        className="bg-[--primary-white] hover:bg-[--primary-blue] hover:text-[--primary-white] transition-all z-10 flex justify-center items-center w-full rounded-sm"
          aria-label="Next card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WritingsSnapscroll
