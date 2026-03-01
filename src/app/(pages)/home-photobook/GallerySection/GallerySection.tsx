'use client'
import React, { useRef, useState, useEffect } from 'react'
import Videoscape from '@/app/my_components/specific/image_bodies/videoscape'
import { videoSources, timelineItems } from '../data'
import RunningTimeline from './RunningTimeline'

/**
 * GallerySection for the Home Photobook page.
 * Renders an interactive photobook/video gallery with a synchronized timeline.
 */
const GallerySection = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(true) // Autoplay is on by default

  // Listen for state changes from YouTube IFrame
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return
      
      try {
        const data = JSON.parse(event.data)
        if (data.event === 'infoDelivery' && data.info && data.info.playerState !== undefined) {
          // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
          setIsPlaying(data.info.playerState === 1)
        }
      } catch (e) {
        // Not a JSON message or not from YouTube API
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleSeek = (seconds: number) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [seconds, true]
        }),
        '*'
      )
    }
  }

  const handleTogglePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo'
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: []
        }),
        '*'
      )
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className='relative flex flex-col h-screen items-center justify-center overflow-hidden w-full'>
      <div className={`absolute inset-0 bg-black`}></div>
      {/* Inner container that takes up the full width and defines height via aspect-video */}
      <div className='relative z-10 w-full h-full aspect-video flex items-center justify-center overflow-hidden'>
        <Videoscape 
          ref={iframeRef}
          src={videoSources.gallery}
          bg_value="bg-black"
          id="gallery-video"
        />

        {/* Running Timeline */}
        <RunningTimeline 
          items={timelineItems} 
          duration={videoSources.galleryDuration} 
          onSeek={handleSeek} 
          iframeRef={iframeRef}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      </div>
    </div>
  )
  }

export default GallerySection
