import React from 'react'
import Seperator from '../Seperator'

const Navbar = () => {
  return (
    <>
        <div className='relative text-[var(--primary-blue)] opacity-40 hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] text-xs font-title p-2 w-screen text-center'>
            <div className='nav-content flex justify-between px-4'>
                <h2>sumit sute</h2>
                <h2>works + projects</h2>
                <h2>bengaluru, in</h2>
            </div>
            <Seperator />
        </div>
    </>
    
  )
}

export default Navbar
