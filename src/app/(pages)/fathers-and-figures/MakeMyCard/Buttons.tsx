import React from 'react'

const Buttons = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='flex w-full text-xs'>
      <button className='button-style' onClick={onClick}>
        Add your canvas background
      </button>
      <button className='button-style'>
        Submit your card
      </button>
    </div>
  )
}

export default Buttons
