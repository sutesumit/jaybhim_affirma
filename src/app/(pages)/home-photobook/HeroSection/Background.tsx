'use client'
import React from 'react'
import Videoscape from '@/app/my_components/specific/image_bodies/videoscape'
import { videoSources } from '../data'

/**
 * Background component for the Home Photobook page.
 * Provides an ambient video background using Videoscape.
 */
const Background = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* <Videoscape 
        src={videoSources.background}
        bg_value="bg-black"
        id="background-video"
      /> */}
    </div>
  )
}

export default Background
