import React from 'react'
import useMousePosition from '@/_hooks/useMousePosition'

const RoundPointer = () => {

const {x, y} = useMousePosition()
  return (
      <div    
          className='nav-pointer absolute z-50 pointer-events-none' 
          style={{
              top: y,
              left: x
          }}
      ></div>
  )
}

export default RoundPointer
