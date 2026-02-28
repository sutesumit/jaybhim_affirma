'use client'
import React from 'react'
import { TitleDiscription } from '@/app/my_components/PageTitleSection'
import { content } from '../data'

export const HomePhotobookHeader = () => {
  return (
    <TitleDiscription 
      title={content.title}
      description={content.description}
    />
  )
}

export default HomePhotobookHeader
