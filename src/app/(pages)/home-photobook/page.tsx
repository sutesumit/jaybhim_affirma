'use client'
import React from 'react'
import { CommentsSection } from '@/app/my_components/CommentsSection/CommentsSection'
import Seperator from '@/app/my_components/shared/Seperator'
import AcknowledgementSection from '@/app/my_components/AcknowledgementSection/AcknowledgementSection'
import HomePhotobookHeader from './_components/HomePhotobookHeader'
import HomePhotobookGallery from './_components/HomePhotobookGallery'
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
    <div className='flex flex-col items-center min-h-screen'>
      {/* Title and Description Section */}
      <HomePhotobookHeader />
      
      {/* Photobook / Gallery Section */}
      <HomePhotobookGallery />

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
