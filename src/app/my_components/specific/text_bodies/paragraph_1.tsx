'use client';

import React from 'react'
import { LinkPreview } from '@/_components/ui/link-preview'

const Paragraph_1 = () => {
  return (
    <div className='text-container paragraph-container'>
      <div className="text-content">
        I used to be an artist, and{' '}
        <LinkPreview url="https://www.art.sumitsute.com/fathers-and-figures">
          my art practices
        </LinkPreview>
        {' '}were always a medium to explore the political within the personal, driven by a clear intent to actively heal from caste-patriarchal traumas. My goal was to celebrate Dalit cultural capital with pride and intimacy through my photographs. Before I fully understood the phrase &ldquo;the personal is political,&rdquo; I aspired for my art to serve as both fodder and fuel for political discourse.
      </div>
    </div>
  )
}

export default Paragraph_1
