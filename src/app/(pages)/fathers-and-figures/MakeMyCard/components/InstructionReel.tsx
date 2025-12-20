import React from 'react'
import { motion as m } from 'framer-motion'
import { useScroll, useTransform, useSpring } from 'framer-motion'

const InstructionReel = () => {
  const phoneCaseRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: phoneCaseRef,
    offset: ['start end', 'end start']
  })

  const x = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [-200, -10, 10, -200])
  const rotation = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [-20, -4, 0, 30])

  const smoothX = useSpring(x, { stiffness: 100, damping: 20 })
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 20 })

  const phoneCaseStyle = {
    x: smoothX,
    rotate: smoothRotation
  }



  return (
    <m.div
      className='phone-wrapper z-10 relative lg:absolute md:left-2 left-0 md:-rotate-2'
      ref={phoneCaseRef}
      style={phoneCaseStyle}
    >
      <m.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={1}
        whileTap={{ cursor: 'grabbing', rotate: 4 }}
        className="relative cursor-grab col-span-1 flex-1 my-5 m-auto max-h-[80vh] aspect-[7/12] bg-black/85 rounded-2xl p-2 overflow-hidden shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
      >
        <div className="speaker-knotch flex flex-row gap-2 items-center justify-center absolute m-[1/2] top-0 left-1/2 -translate-x-1/2 bg-black/85 w-1/2 h-5 rounded-b-2xl">
          <div className="w-1/6 h-1 bg-gray-800"></div>
          <div className="w-1/2 h-1 bg-gray-800"></div>
        </div>
        <div className="bottom-knotch absolute bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-500"></div>
        <iframe
          className='inline object-cover rounded-2xl h-full overflow-clip'
          src='https://www.youtube.com/embed/4yjNqLRRPxE?&controls=0&loop=1&playlist=4yjNqLRRPxE&modestbranding=1&showinfo=0&hl=en'
          title="Maraa Mirrors Reel"
          allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',

          }}
        >
        </iframe>
      </m.div>
    </m.div>
  )
}

export default InstructionReel
