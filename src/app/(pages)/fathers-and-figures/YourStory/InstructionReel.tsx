import React from 'react'

const InstructionReel = () => {
  return (
    <div className="flex-1 w-full max-h-[75vh] aspect-[7/12] border-[1px] border-[var(--primary-blue)] rounded-sm overflow-hidden">
        <iframe
        className='rounded-sm inline h-full overflow-hidden'
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
    </div>
  )
}

export default InstructionReel
