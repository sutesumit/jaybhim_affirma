'use client'
import React from 'react'
import { CommentsSection } from '@/components/features/comments'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { HeroSection } from './components'
import { GallerySection } from './ArtCanvas'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

const Home = () => {
  const { acknowledgements, pagePath } = usePageMetadata();

  return (
    <div className='flex flex-col w-full items-center isolate'>
      <HeroSection />

      <Separator />
      
      <GallerySection />

      <Separator />

      <CommentsSection pagePath={pagePath} mode="standalone" />

      <Separator />

      {acknowledgements.length > 0 && <AcknowledgementSection names={acknowledgements} />}
    </div>
  )
}

export default Home
