'use client'
import { Languages } from 'lucide-react'
import React, { useState } from 'react'

interface LanguageSwitchProps {
    isMarathi: boolean,
    setIsMarathi: (isMarathi: boolean) => void
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ isMarathi, setIsMarathi}) => {

  const toggleLangauage = () => {
    setIsMarathi(!isMarathi)
  }

  return (
    <div className='flex absolute bottom-[-38] z-10 w-fit justify-center font-rajdhani text-sm m-auto'>
      <label className='relative inline-flex items-center justify-center gap-2 cursor-pointer  card-bg button-style !border-dotted px-2 font-semibold'>
        <input
          type='checkbox'
          className='sr-only'
          checked={isMarathi}
          onChange={toggleLangauage}
        />
        <Languages className='h-4 w-4'/>
        <div className='w-12 text-center'>
            { !isMarathi
            ? 
            <>
            मराठी
            </>
            :
            <>
            English
            </>
            }
        </div>
      </label>
    </div>
  )
}

export default LanguageSwitch
