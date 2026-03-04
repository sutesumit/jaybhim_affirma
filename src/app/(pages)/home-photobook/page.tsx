'use client'
import React from 'react'
import { CommentsSection } from '@/components/features/comments'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { HeroSection } from './components/HeroSection'
import { GallerySection } from './ArtCanvas'
import { acknowledgements } from './content'

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

      <Separator />
      
      {/* Photobook / Gallery Section with Canvas-like styling */}
      <GallerySection />

      <Separator />


      {/* Community Interaction Section */}
      <CommentsSection pagePath="/home-photobook" mode="standalone" />

      <Separator />

      {/* Credits Section */}
      <AcknowledgementSection names={acknowledgements} />
    </div>
  )
}

export default Home
