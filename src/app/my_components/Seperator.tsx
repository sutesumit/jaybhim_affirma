import React from 'react'

const Seperator = () => {
  return (
    <section>
      <div className='absolute right-0 left-0 bottom-0 hero-border-container h-[1px]'>
        <div className='h-full bg-gradient-to-r from-[var(--primary-white)] via-[var(--primary-blue)] to-[var(--primary-white)]'/>
      </div>
    </section>
  )
}

export default Seperator
