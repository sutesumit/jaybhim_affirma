import React from 'react'
import {cn} from '@/lib/utils'

interface SeperatorProps {
  className?: string;
}

const Seperator = React.forwardRef<HTMLDivElement, SeperatorProps>((_, ref) => {
  return (
    
      <div ref={ref} className='separator absolute bottom-0 hero-border-container h-[1px] w-full'>
        <div className='h-full w-full bg-gradient-to-r from-[var(--primary-white)] via-[var(--primary-blue)] to-[var(--primary-white)]'/>
      </div>
    
  )
})

Seperator.displayName = 'Seperator'

export default Seperator
