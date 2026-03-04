"use client"
import React from 'react'
import { TitleDiscription } from '@/components/features/page-title'
import { content } from '../../content'

const background = <div className='h-full w-full'></div>

export function HeroSection() {
  return (
    <TitleDiscription 
      title={content.title}
      description={content.description}
      background={background}
    />
  )
}
