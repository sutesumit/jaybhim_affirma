import React from 'react'
import { TitleDiscription } from '@/components/features/page-title'
import Background from './Background'
import { content } from '../../content'

// Hero Section of the Fathers and Figures page with Title and Description rendered overlayed on a custom Background component
const HeroSection = () => {
  return (
    <TitleDiscription
        title={content.title}
        description={content.description}
        background={<Background />}
    />
  )
}

export default HeroSection
