"use client"
import React from 'react'
import Image from 'next/image'
import { flashFictions } from '../content';
import { Gradient1 } from '@/components/features';

const WritingsSnapscroll = () => {
  return (
    <div className='marathi-writings-container font-rajdhani text-[--primary-blue] max-w-[120ch] w-full p-2'>
      <Gradient1>
      <div className="all-cards flex overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide gap-4 py-[1px] glass-hover card-shadow rounded-sm">
        {flashFictions.map((fiction, index) => (
          <div key={index} className="card rounded-sm w-full flex-shrink-0 snap-center">
            <div className="flex flex-col-reverse md:flex-row items-start gap-4 p-6">
              <div className="card-content card-inner-shadow md:w-[50%] aspect-square overflow-y-auto scrollbar-hide scrollbar-thin rounded-sm">
                <div className='card-title text-md font-semibold text-center rounded-sm border-b border-dotted border-[var(--primary-blue)] p-1'>{fiction.title}</div>
                <div className="date text-xs text-[var(--primary-blue)] opacity-50 text-center p-1">{fiction.date}</div>
                <div className="card-para leading-relaxed whitespace-pre-wrap px-4">{fiction.content}</div>
              </div>
              <div className="image-wrapper glass-hover rounded-sm overflow-clip aspect-square md w-full md:w-[50%] relative">
                <Image 
                  className='object-fill' 
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
      </Gradient1>
      
      <div className="navigation-buttons flex justify-around w-full mt-2 h-5 rounded-sm">
        <button 
          onClick={() => {
            const container = document.querySelector('.all-cards');
            container?.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
          }}
          className="button-style transition-all z-10 flex justify-center items-center w-full rounded-sm"
          aria-label="Previous card"
        >
          <span aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </span>
        </button>

        <button 
          onClick={() => {
            const container = document.querySelector('.all-cards');
            container?.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
          }}
          className="button-style transition-all z-10 flex justify-center items-center w-full rounded-sm"
          aria-label="Next card"
        >
          <span aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default WritingsSnapscroll
