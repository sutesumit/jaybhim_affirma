"use client"

import * as React from "react"
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

type DotGridStyle = React.CSSProperties & Record<`--${string}`, string>

const HIDDEN_CURSOR_POSITION = "-999px"

function createDotPattern(color: string, size: number) {
  const radius = `${Math.max(size / 2, 0.5)}px`
  return `radial-gradient(circle, ${color} ${radius}, transparent calc(${radius} + 1px))`
}

const DotGrid = React.forwardRef<HTMLDivElement, DotGridProps>(
  (
    {
      dotSize = 1,
      spacing = 25,
      opacity = 0.5,
      dotColor = "var(--primary-blue)",
      interactive = false,
      influenceRadius = 150,
      className,
      style,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const frameRef = React.useRef<number | null>(null)

    const dotPattern = React.useMemo(
      () => createDotPattern(dotColor, dotSize),
      [dotColor, dotSize]
    )

    const highlightPattern = React.useMemo(
      () => createDotPattern(dotColor, dotSize * 4),
      [dotColor, dotSize]
    )

    const setCursorPosition = React.useCallback((x: string, y: string) => {
      const node = containerRef.current
      if (!node) return

      node.style.setProperty("--dot-grid-x", x)
      node.style.setProperty("--dot-grid-y", y)
    }, [])

    React.useEffect(() => {
      return () => {
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current)
        }
      }
    }, [])

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event)
      if (!interactive || !containerRef.current) return

      const { left, top } = containerRef.current.getBoundingClientRect()
      const x = `${event.clientX - left}px`
      const y = `${event.clientY - top}px`

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }

      frameRef.current = requestAnimationFrame(() => {
        setCursorPosition(x, y)
        frameRef.current = null
      })
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event)
      if (!interactive) return

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      setCursorPosition(HIDDEN_CURSOR_POSITION, HIDDEN_CURSOR_POSITION)
    }

    const baseStyle: DotGridStyle = {
      opacity,
      "--dot-grid-x": HIDDEN_CURSOR_POSITION,
      "--dot-grid-y": HIDDEN_CURSOR_POSITION,
      ...style,
    }

    const layerStyle: React.CSSProperties = {
      backgroundImage: dotPattern,
      backgroundPosition: "top left",
      backgroundRepeat: "repeat",
      backgroundSize: `${spacing}px ${spacing}px`,
    }

    return (
      <div
        {...props}
        ref={(node) => {
          containerRef.current = node

          if (typeof ref === "function") {
            ref(node)
            return
          }

          if (ref) {
            ref.current = node
          }
        }}
        className={cn(
          "absolute inset-0 overflow-hidden",
          interactive ? "pointer-events-auto" : "pointer-events-none",
          className
        )}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={layerStyle}
        />
        {interactive ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-[opacity] duration-200"
            style={{
              ...layerStyle,
              backgroundImage: highlightPattern,
              maskImage: `radial-gradient(circle ${influenceRadius}px at var(--dot-grid-x) var(--dot-grid-y), black 0%, black 55%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${influenceRadius}px at var(--dot-grid-x) var(--dot-grid-y), black 0%, black 55%, transparent 100%)`,
            }}
          />
        ) : null}
      </div>
    )
  }
)

DotGrid.displayName = "DotGrid"

export { DotGrid }
