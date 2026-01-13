'use client'
import { Languages } from 'lucide-react'
import React, { useState } from 'react'
import { motion as  m, AnimatePresence } from 'framer-motion'

interface LanguageSwitchProps {
    isMarathi: boolean,
    setIsMarathi: (isMarathi: boolean) => void
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ isMarathi, setIsMarathi}) => {

  const toggleLangauage = () => {
    setIsMarathi(!isMarathi)
  }

  const language = !isMarathi ? 'मराठी' : 'English'

  return (
    <div className='flex absolute bottom-0 translate-y-[50%] z-50 w-fit justify-center font-rajdhani text-sm'>
      <label className='relative inline-flex items-center justify-center gap-0 cursor-pointer button-style border-dotted border-[var(--primary-blue)] !border-dotted p-0 pl-2 font-semibold transition-all duration-300'>
        <input
          type='checkbox'
          className='sr-only'
          checked={isMarathi}
          onChange={toggleLangauage}
        />
        <AnimatePresence mode='wait' initial={false}>
            <m.div
                key={isMarathi ? 'marathi' : 'english'}
                className='font- text-xl'
                initial={{ y: -10, scale: 0, opacity: 0, rotate: 90 }}
                animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
                exit={{ y: 10, scale: 0, opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                <Languages className='h-4 w-4'/>
            </m.div>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
            <m.div
                key={isMarathi ? 'marathi' : 'english'}
                className='w-16 text-center px-2 py-1 pointer-events-none'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                { language }
            </m.div>
        </AnimatePresence>
      </label>
    </div>
  )
}

export default LanguageSwitch
