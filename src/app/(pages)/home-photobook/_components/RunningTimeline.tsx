'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  timestamp: number; // in seconds
  label: string;
}

interface RunningTimelineProps {
  items: TimelineItem[];
  duration: number;
  onSeek: (seconds: number) => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const RunningTimeline: React.FC<RunningTimelineProps> = ({ items, duration, onSeek, iframeRef, isPlaying, onTogglePlay }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Listen for messages from YouTube IFrame
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return
      
      try {
        const data = JSON.parse(event.data)
        if (data.event === 'infoDelivery' && data.info && data.info.currentTime !== undefined) {
          setCurrentTime(data.info.currentTime)
        }
      } catch (e) {
        // Not a JSON message or not from YouTube API
      }
    }

    window.addEventListener('message', handleMessage)
    
    // Poll for updates since YouTube infoDelivery isn't always frequent
    const interval = setInterval(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'listening',
          id: 1
        }), '*')
      }
    }, 1000)

    return () => {
      window.removeEventListener('message', handleMessage)
      clearInterval(interval)
    }
  }, [iframeRef])

  const calculateSeekTime = useCallback((clientX: number) => {
    if (!progressBarRef.current) return 0
    const rect = progressBarRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    return (x / rect.width) * duration
  }, [duration])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const newTime = calculateSeekTime(e.clientX)
    onSeek(newTime)
    setCurrentTime(newTime)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newTime = calculateSeekTime(e.clientX)
      onSeek(newTime)
      setCurrentTime(newTime)
    }
  }, [isDragging, calculateSeekTime, onSeek])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const progressPercent = (currentTime / duration) * 100

  return (
    <div 
      className="absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center px-8 md:px-20 gap-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Play/Pause Button */}
        <button 
          onClick={onTogglePlay}
          className="group flex items-center justify-center w-10 h-10 rounded-full button-style"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress Bar Container */}
        <div className="relative w-full flex-1 group cursor-pointer py-1" ref={progressBarRef} onMouseDown={handleMouseDown}>
          {/* Background Track */}
          <div className="h-1 w-full bg-white/10 overflow-hidden">
            {/* Progress Fill */}
            <motion.div 
              className="h-full bg-[--primary-blue] relative"
              style={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform" />
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default RunningTimeline
