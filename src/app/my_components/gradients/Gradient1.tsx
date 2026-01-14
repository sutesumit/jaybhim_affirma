import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import useMousePosition from '@/_hooks/useMousePosition'

type GradientProps = {
  hoverOn?: boolean,
} & React.HTMLAttributes<HTMLDivElement>

const Gradient1: React.FC<GradientProps> = ({ children, className, hoverOn = false }) => {
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [relativeMousePos, setRelativeMousePos] = useState({ x: 0, y: 0 })
  const mouseCords = useMousePosition()

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setRelativeMousePos({
        x: mouseCords.x - rect.left,
        y: mouseCords.y - rect.top
      })
    }
  }, [mouseCords.x, mouseCords.y])
  
  return (
    <div ref={containerRef} className={cn('layer-1 gradient-wrapper overflow-clip rounded-sm group flex flex-col relative group', className)}
    >
      <div 
        className={cn(`layer-2 backdrop-blur-md absolute inset-0 pointer-events-none`)}
      >
        <div className='layer-3 absolute opacity-0 group-hover:opacity-100 group-hover:blur-3xl inset-0 bg-gradient-to-br hover:bg-gradient-to-tl from-blue-200 via-blue-100 to-blue-500 transition-all duration-1000'>
        </div>
        <div className='layer-4 bg-blend-multiply opacity-0 group-hover:animate-brownian group-hover:opacity-100 group-hover:blur-2xl absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-100 to-blue-200 rounded-full mix-blend-multiply aspect-square'>
        </div>
        <div 
          className='layer-5 absolute h-52 w-52 bg-white/50 blur-2xl blend-multiply rounded-full'
          style={{
            left: relativeMousePos.x,
            top: relativeMousePos.y,  
            transform: 'translate(-50%, -50%)',
          }}
        >
        </div>
      </div>
      { children }
    </div>
  )
}

export default Gradient1
