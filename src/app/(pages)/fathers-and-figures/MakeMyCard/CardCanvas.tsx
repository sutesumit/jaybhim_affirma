import React from 'react'
import { AnimatePresence, motion as m } from 'framer-motion'
import Image from 'next/image'

const CardCanvas = ({url, rotation}: {url: string | null, rotation: number}) => {
  return (
    <AnimatePresence>
        {url &&
        <m.div
        className="absolute z-[-1] isolate w-full h-full overflow-hidden pointer-events-none"
        initial={{
            rotate: 15,
            scale: 1.8,
            y: -400,
        }}
        animate={{
            borderRadius: '0%',
            rotate: 0,
            scale: 1,
            y: 0,
            opacity: 1,
        }}
        exit={{
            borderRadius: '100%',
            y: -400,
            rotate: -45,
            scale: .5,
            opacity: 0.1,
        }}
        transition={{
            type: 'spring',
            stiffness: 60,
            damping: 20,
            mass: 1,
        }}
        style={{
            rotate: rotation,
        }}
        >
        <Image
            src={url}
            alt="My card"
            className="absolute z-[-1] isolate w-full h-full object-cover opacity-50"
            fill
        />
        </m.div>
        }
    </AnimatePresence>  
  )
}

export default CardCanvas
