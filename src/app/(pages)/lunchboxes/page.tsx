'use client'
import React from 'react'
import { CommentsSection } from '@/components/features/comments'
import { Gradient1, Separator, AcknowledgementSection } from '@/components/features/shared'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'
import { HeroSection } from './components'
import { LunchboxFlipbook } from './ArtCanvas'

const Home = () => {
  const { acknowledgements, pagePath } = usePageMetadata()

  return (
    <div className='flex flex-col w-full items-center isolate'>
      <HeroSection />
      <LunchboxFlipbook />
      <Separator />
      <CommentsSection pagePath={pagePath} mode="standalone" />
      <Separator />
      {acknowledgements.length > 0 && (
        <AcknowledgementSection names={acknowledgements} />
      )}
    </div>
  )
}

export default Home
