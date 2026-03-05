'use client'

import { TitleDiscription } from '@/components/features/page-title'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'
import Background from './Background'

export function HeroSection() {
  const { title, description, startDate, finishDate } = usePageMetadata()

  return (
    <TitleDiscription
      title={title}
      description={description}
      background={<Background />}
      startDate={startDate}
      finishDate={finishDate}
    />
  )
}
