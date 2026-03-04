'use client'

import { TitleDiscription } from '@/components/features/page-title'
import Background from './Background'
import { content } from '../../content'

export function HeroSection() {
  return (
    <TitleDiscription
      title={content.title}
      description={content.description}
      background={<Background />}
    />
  )
}
