'use client'

import React from 'react'
import { TitleDiscription } from '@/components/features/page-title'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

const background = <div className='h-full w-full'></div>

export function HeroSection() {
  const { title, description, startDate, finishDate } = usePageMetadata()

  return (
    <TitleDiscription 
      title={title}
      description={description}
      background={background}
      startDate={startDate}
      finishDate={finishDate}
    />
  )
}
