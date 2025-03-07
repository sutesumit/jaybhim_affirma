import React from 'react'

const Seperator = React.forwardRef<HTMLDivElement>((_,ref) => {
  return (
    
      <div ref={ref} className='separator absolute bottom-0 hero-border-container h-[1px] w-full'>
        <div className='h-full w-full bg-gradient-to-r from-[var(--primary-white)] via-[var(--primary-blue)] to-[var(--primary-white)]'/>
      </div>
    
  )
})

export default Seperator
