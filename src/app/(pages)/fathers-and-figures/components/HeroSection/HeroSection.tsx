'use client'

import React from 'react'
import { TitleDiscription } from '@/components/features/page-title'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'
import Background from './Background'

const HeroSection = () => {
  const { title, description, startDate, finishDate } = usePageMetadata()

  return (
    <TitleDiscription
        title={title}
        description={description}
        startDate={startDate}
        finishDate={finishDate}
        background={<Background />}
    />
  )
}

export default HeroSection
