'use client'
import React from 'react'
import Videoscape from '@/app/my_components/specific/image_bodies/videoscape'
import { videoSources } from '../data'

export const HomePhotobookGallery = () => {
  return (
    <div className='relative flex w-screen h-auto md:aspect-video md:max-h-screen py-4 items-center justify-center overflow-hidden'>
      <Videoscape 
        src={videoSources.gallery}
        bg_value="bg-black"
      />
      {/* Placeholder for future artwork/gallery overlay */}
      <div className='text-container mix-blend-difference text-[--primary-white] opacity-100 z-10'>
         {/* Add text or interactive elements here if needed */}
      </div>
    </div>
  )
}

export default HomePhotobookGallery
