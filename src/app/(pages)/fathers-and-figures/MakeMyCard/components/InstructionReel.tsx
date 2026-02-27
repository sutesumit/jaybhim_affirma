import React, { useRef, RefObject } from "react"
import {
  motion as m,
  useScroll,
  useTransform,
  useSpring,
  MotionValue
} from "framer-motion"

/* ================================
   1️⃣ Animation Hook
================================ */

function useReelAnimation(ref: RefObject<HTMLDivElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Phone animation
  const x = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [-200, -10, 10, -200])
  const rotation = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [-20, -4, 0, 30])

  const smoothX = useSpring(x, { stiffness: 100, damping: 20 })
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 20 })

  // Instruction animation
  const instructionX = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.7, 1],
    [-50, 0, 0, -50]
  )

  const instructionOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.8, 1],
    [0, 1, 1, 0]
  )

  const smoothInstructionX = useSpring(instructionX, {
    stiffness: 100,
    damping: 20
  })

  const smoothInstructionOpacity = useSpring(instructionOpacity, {
    stiffness: 100,
    damping: 20
  })

  return {
    wrapperStyle: {
      x: smoothX,
      rotate: smoothRotation
    },
    instructionStyle: {
      x: smoothInstructionX,
      opacity: smoothInstructionOpacity,
      rotate: 180
    }
  }
}

/* ================================
   2️⃣ Instruction Tag
================================ */

interface InstructionTagProps {
  style: {
    x: MotionValue<number>
    opacity: MotionValue<number>
    rotate: number
  }
}

function InstructionTag({ style }: InstructionTagProps) {
  return (
    <div className="absolute h-full z-0 left-full py-5 flex items-center pointer-events-none">
      <m.div
        style={style}
        className="card-shadow py-5 w-fit text-sm font-rajdhani text-center rounded-l-lg bg-black/90 text-[var(--primary-white)] [writing-mode:vertical-rl]"
      >
        Play the reel for instructions.
      </m.div>
    </div>
  )
}

/* ================================
   3️⃣ Main Component
================================ */

export default function InstructionReel() {
  const phoneCaseRef = useRef<HTMLDivElement>(null)

  const { wrapperStyle, instructionStyle } =
    useReelAnimation(phoneCaseRef)

  return (
    <m.div
      ref={phoneCaseRef}
      drag
      dragElastic={1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ cursor: "grabbing", rotate: 4 }}
      style={wrapperStyle}
      className="phone-wrapper isolate w-fit relative h-full flex z-10 lg:absolute md:left-2 mx-auto md:-rotate-2"
    >
      {/* Instruction — sibling, NOT inside overflow-hidden */}
      <InstructionTag style={instructionStyle} />

      {/* Phone Shell (clips  only internal content) */}
      <div className="relative card-shadow cursor-grab col-span-1 flex-1 md:my-0 m-auto max-h-[80vh] aspect-[7/12] bg-black/85 rounded-2xl p-2 overflow-hidden shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">

        {/* Speaker notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black/85 w-1/2 h-5 rounded-b-2xl flex gap-2 items-center justify-center">
          <div className="w-1/6 h-1 bg-gray-800"></div>
          <div className="w-1/2 h-1 bg-gray-800"></div>
        </div>

        {/* Bottom notch */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-500"></div>

        {/* Video */}
        <iframe
          className="inline object-cover rounded-2xl h-full w-full"
          src="https://www.youtube.com/embed/4yjNqLRRPxE?&controls=0&loop=1&playlist=4yjNqLRRPxE&modestbranding=1&showinfo=0&hl=en"
          title="Maraa Mirrors Reel"
          allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </m.div>
  )
}