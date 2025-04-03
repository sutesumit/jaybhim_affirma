import React from 'react'
import useMousePosition from '@/_hooks/useMousePosition'

const RoundPointer = (imageRef: React.RefObject<HTMLImageElement | null> = {current: null}) => {

const {x, y} = useMousePosition(imageRef)
  return (
      <div    
          className='round-pointer isolate absolute z-50 pointer-events-none'
          style={{
              top: y,
              left: x,
          }}
      ></div>
  )
}

export default RoundPointer
