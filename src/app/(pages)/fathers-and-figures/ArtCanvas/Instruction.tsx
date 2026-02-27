import React from 'react'
import { motion } from 'framer-motion'
import { InstructionProps } from './types'
import Gradient1 from '@/app/my_components/gradients/Gradient1'

/**
 * Instruction component for ArtCanvas.
 * Following OCP, the instruction message is injectable via children.
 */
const Instruction = ({ 
  dragConstraints, 
  children = "📝🖼️ Craft a story by dragging these frames. The story may remain mine, or quietly become yours! 👨‍👦‍📑" 
}: InstructionProps & { children?: React.ReactNode }) => {
  return (
    <motion.div 
        className="instruction absolute font-rajdhani text-center glass-hover card-bg z-10 top-2 rounded-sm cursor-pointer"
        drag
        dragConstraints={dragConstraints}
        dragElastic={0}
        dragMomentum={false}
        style={{ cursor: 'grab' }}
    >
      <Gradient1 hoverOn={true} className='relative'>
        <div className='p-2 z-10'>
          {children}
        </div>
      </Gradient1>
    </motion.div>
  )
}

export default Instruction
