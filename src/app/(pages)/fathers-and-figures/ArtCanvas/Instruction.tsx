import React from 'react'

// Instruction component for ArtCanvas Component that elicits user interaction for moving the draggable photo elements
const Instruction = () => {

  const instructions = [
    '📝',
    '🖼️',
    'Move ',
    'these ',
    'pieces ',
    'to ',
    'create ',
    'your ',
    'story! ',
    '👨',
    '📑',
  ]

  return (
    <div 
        className="instruction z-10 absolute top-2 left-2 m-2 !p-14 bg-black text-white flex flex-row justify-center items-center gap-1"
    >
        {instructions.map((instruction, index) => (
            <span key={index}>{instruction}</span>
        ))}
    </div>
  )
}

export default Instruction
