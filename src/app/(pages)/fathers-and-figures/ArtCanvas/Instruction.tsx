import React from 'react'

// Instruction component for ArtCanvas Component that elicits user interaction for moving the draggable photo elements
const Instruction = () => {
  return (
    <div 
        className="instruction absolute lowercase bg-blend-multiply top-[40%] -rotate-2 text-container m-2 !p-14 !text-xl !text-center border-dotted border-[1px] border-[var(--primary-blue)] rounded-sm"
    >
        📝🖼️ Craft a story by arranging these frames and watch as your thoughts weave into a father-son tale! 👨‍👦‍📑
    </div>
  )
}

export default Instruction
