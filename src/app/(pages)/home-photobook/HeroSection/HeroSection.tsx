import React from 'react'
import { TitleDiscription } from '@/app/my_components/PageTitleSection'
import Background from './Background'
import { content } from '../data'

/**
 * HeroSection for the Home Photobook page.
 * Renders title and description over an ambient video background.
 */
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
