'use client'
import React from 'react'
import { CommentsSection } from '@/app/my_components/CommentsSection/CommentsSection'
import Seperator from '@/app/my_components/shared/Seperator'
import AcknowledgementSection from '@/app/my_components/AcknowledgementSection/AcknowledgementSection'
import { HeroSection } from './HeroSection'
import { GallerySection } from './GallerySection'
import { acknowledgements } from './data'

/**
 * HomePhotobook page component.
 * 
 * Refactored using SOLID principles:
 * - SRP: This component is responsible for orchestrating the page layout.
 * - OCP: New sections can be added as components without changing existing ones.
 * - DIP: Depends on abstractions (data from data.ts) rather than hardcoded values.
 */
const Home = () => {
  return (
    <div className='flex flex-col w-full items-center isolate'>
      {/* Title and Description Section with Video Background */}
      <HeroSection />
      
      {/* Photobook / Gallery Section with Canvas-like styling */}
      <GallerySection />

      <div className='relative w-full'>
        <Seperator />
      </div>

      {/* Community Interaction Section */}
      <CommentsSection pagePath="/home-photobook" mode="standalone" />

      <div className='relative w-full'>
        <Seperator />
      </div>

      {/* Credits Section */}
      <AcknowledgementSection names={acknowledgements} />
    </div>
  )
}

export default Home
