"use client"
import React from 'react'
import Image from 'next/image'
import { flashFictions } from './flash_fiction_object';
import { LinkPreview } from '../../../../_components/aceternity_ui/link-preview';
import { ExternalLink, Link, Pointer } from 'lucide-react';

const SampleWriting = () => {
  return (
    <div className='marathi-writings-container font-rajdhani text-[--primary-white] max-w-[100ch] w-full mx-auto m-2 px-4 sm:px-6'>
      <div className="all-cards flex overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide gap-4 py-[1px]">
        
          <div className="card bg-[--primary-blue] rounded-sm w-full flex-shrink-0 snap-center">
            <div className="flex flex-col-reverse md:flex-row sm:flex-row items-start gap-4 p-6">
              <div className="card-content md:w-[50%] sm:w-[50%] aspect-square overflow-y-auto scrollbar-hide scrollbar-thin scrollbar-thumb-[--primary-blue] scrollbar-track-transparent">
                <div className='card-title text-center sticky z-10 top-0 bg-[--primary-blue] p-1'>{flashFictions[0].title}</div>
                <div className="date text-xs text-white opacity-50 text-center p-1">{flashFictions[0].date}</div>
                <div className="card-para text-xs leading-relaxed whitespace-pre-wrap px-4">{flashFictions[0].content}</div>
              </div>
              <div className="image-wrapper rounded-sm overflow-hidden aspect-square md w-full md:w-[50%] sm:w-[50%] relative">
                <Image 
                  className='object-contain' 
                  src={flashFictions[0].imageUrl}
                  fill
                  alt={flashFictions[0].title}
                  priority 
                />
              </div>
            </div>
          </div>
        
      </div>
      
      <div className="full-collection-link w-full h-5 bg-[--primary-blue] rounded-sm text-xs flex justify-center items-center">
        <div className="flex items-center gap-2">
          <ExternalLink 
            className='text-white inline p-2 link-text'
          />
          <LinkPreview 
            url="https://www.art.sumitsute.com/marathi-short-stories"
            className='text-white'
          >
            link to the full flash fiction collection.
          </LinkPreview>
        </div>
      </div>
    </div>
  )
}

export default SampleWriting
