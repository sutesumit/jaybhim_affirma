'use client' 
import React, { useRef } from 'react'
import { RiScrollToBottomFill } from 'react-icons/ri'
import Seperator from './Seperator'

const Jumper = () => {

    const seperatorRef = useRef<HTMLDivElement>(null)

  return (
    <div className='m-auto h-[1.2rem] cursor-pointer'

                  onClick={() => {

                    if (seperatorRef.current) {
                        const target = seperatorRef.current
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
            >
              <RiScrollToBottomFill className='w-full h-full animate-bounce hover:text-slate-500'/>
              <div className="w-full">
                  <Seperator ref={seperatorRef} />
              </div>
    </div>
  )
}

export default Jumper
