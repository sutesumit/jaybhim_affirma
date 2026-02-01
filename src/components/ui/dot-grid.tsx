"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DotGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the dots in pixels
   * @default 1
   */
  dotSize?: number
  
  /**
   * Spacing between dots in pixels
   * @default 20
   */
  spacing?: number
  
  /**
   * Opacity of the background
   * @default 0.8
   */
  opacity?: number
  
  /**
   * CSS variable name for the dot color
   * @default "var(--primary-blue)"
   */
  dotColor?: string
  
  /**
   * Enable interactive mouse tracking
   * @default false
   */
  interactive?: boolean
  
  /**
   * Radius of influence for mouse tracking (in pixels)
   * @default 150
   */
  influenceRadius?: number
}

const DotGrid = React.forwardRef<HTMLDivElement, DotGridProps>(
  (
    {
      dotSize = 1,
      spacing = 20,
      opacity = 0.8,
      dotColor = "var(--primary-blue)",
      interactive = false,
      influenceRadius = 150,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const mousePos = React.useRef({ x: -1000, y: -1000 })
    const rafId = React.useRef<number>(0)
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

    React.useEffect(() => {
      if (!containerRef.current) return
      
      const updateDimensions = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setDimensions({ width: rect.width, height: rect.height })
        }
      }
      
      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      // Cancel previous frame and request new one
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      
      rafId.current = requestAnimationFrame(() => {
        forceUpdate()
      })
    }, [interactive])

    const handleMouseLeave = React.useCallback(() => {
      if (interactive) {
        mousePos.current = { x: -1000, y: -1000 }
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
        forceUpdate()
      }
    }, [interactive])

    // Calculate number of dots needed
    const cols = Math.ceil(dimensions.width / spacing) + 1
    const rows = Math.ceil(dimensions.height / spacing) + 1

    // Generate dots
    const dots = React.useMemo(() => {
      const dotArray = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dotArray.push({ row, col, key: `${row}-${col}` })
        }
      }
      return dotArray
    }, [cols, rows])

    // Separate onDrag and other conflicting props
    const { onDrag, ...restProps } = props

    return (
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(
          "absolute inset-0 overflow-hidden",
          interactive ? "pointer-events-auto" : "pointer-events-none",
          className
        )}
        style={{
          opacity,
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(restProps as any)}
      >
        {dots.map(({ row, col, key }) => {
          const x = col * spacing
          const y = row * spacing

          // Calculate distance from mouse to this dot
          const dx = mousePos.current.x - x
          const dy = mousePos.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Calculate scale based on distance (inverse relationship)
          const scale = interactive && distance < influenceRadius
            ? 1 + (1 - distance / influenceRadius) * 2 // Scale up to 3x at cursor position
            : 1

          return (
            <motion.div
              key={key}
              className="absolute rounded-full"
              style={{
                left: x,
                top: y,
                width: dotSize,
                height: dotSize,
                backgroundColor: dotColor,
                transformOrigin: 'center',
              }}
              animate={{
                scale,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 10,
              }}
            />
          )
        })}
      </div>
    )
  }
)

DotGrid.displayName = "DotGrid"

export { DotGrid }
