'use client' 
import React, { useRef } from 'react'
import { RiScrollToBottomFill } from 'react-icons/ri'
import Seperator from './Seperator'

const Jumper = () => {

    const seperatorRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex flex-col items-center cursor-pointer relative'

                  onClick={() => {

                    if (seperatorRef.current) {
                        const target = seperatorRef.current
                        target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' })
                    }
                  }}
            >
              <RiScrollToBottomFill className='text-xl inline animate-bounce my-2 hover:text-slate-500'/>
              <div className="w-full">
                  <Seperator ref={seperatorRef} />
              </div>
    </div>
  )
}

export default Jumper
