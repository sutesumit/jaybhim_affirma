'use client'
import React, { useRef } from 'react'
import Videoscape from '@/app/my_components/specific/image_bodies/videoscape'
import { videoSources, timelineItems } from '../data'
import RunningTimeline from './RunningTimeline'

export const HomePhotobookGallery = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(true) // Autoplay is on by default

  // Listen for state changes from YouTube IFrame
  React.useEffect(() => {
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
    <div className='relative flex flex-col w-screen h-auto md:aspect-video md:max-h-screen items-center justify-center overflow-hidden'>
      <div className='relative w-full h-full flex items-center justify-center'>
        <Videoscape 
          ref={iframeRef}
          src={videoSources.gallery}
          bg_value="bg-black"
          id="gallery-video"
        />
        
        {/* Placeholder for future artwork/gallery overlay */}
        <div className='text-container mix-blend-difference text-[--primary-white] opacity-100 z-10'>
           {/* Add text or interactive elements here if needed */}
        </div>

        {/* Running Timeline like YouTube */}
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

export default HomePhotobookGallery

