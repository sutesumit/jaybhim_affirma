'use client'
import React from 'react'
import { CommentsSection } from '@/components/features/comments'
import { Gradient1, Separator, AcknowledgementSection } from '@/components/features/shared'
import { acknowledgements } from './content'
import { HeroSection } from './components'
import { LunchboxFlipbook } from './ArtCanvas'

const Home = () => {

  return (
    <div className='flex flex-col w-full items-center isolate'>
      <HeroSection />
      <LunchboxFlipbook />
      <Separator />
      <CommentsSection pagePath="/lunchboxes" mode="standalone" />
      <Separator />
      {acknowledgements.length > 0 && (
        <AcknowledgementSection names={acknowledgements} />
      )}
    </div>
  )
}

export default Home
