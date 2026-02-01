import React from 'react'
import { motion } from 'framer-motion'
import { InstructionProps } from './types'
import Gradient1 from '@/app/my_components/gradients/Gradient1'

// Instruction component for ArtCanvas Component that elicits user interaction for moving the draggable photo elements
const Instruction = ({dragConstraints}: InstructionProps) => {
  return (
    // <Gradient1 hoverOn={true} className='relative'>
    <motion.div 
        className="instruction absolute font-rajdhani text-center glass-hover card-bg z-10 top-2 rounded-sm cursor-pointer"
        drag
        dragConstraints={dragConstraints}
        dragElastic={0}
        dragMomentum={false}
        style={{ cursor: 'grab' }}
        // animate={{...animate }}
        // whileDrag={{ boxShadow: '0px 0px 10px 0px var(--primary-blue)', scale: 1.1 }}
    >
      <Gradient1 hoverOn={true} className='relative'>
        <p className='p-2 z-10'>
          📝🖼️ Craft a story by arranging these frames and watch as your thoughts weave into a father-son tale! 👨‍👦‍📑
        </p>
      </Gradient1>
    </motion.div>
    // </Gradient1>
  )
}

export default Instruction
