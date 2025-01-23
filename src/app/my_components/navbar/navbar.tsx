'use client';
import React from 'react'
import Seperator from '../Seperator'
import MenuLinks from './menu';
import Link from 'next/link';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    
  return (
    <>
        <Link href="/">
            <div className='relative text-[var(--primary-blue)] z-30 p-2 w-screen cursor-pointer'
                onMouseEnter={toggleMenu}>
                <div className='nav-content flex justify-between px-4 py-2 rounded-sm border-[1px] opacity-40 text-xs font-title hover:opacity-100 hover:border-[var(--primary-blue)]'>
                    <h2>sumit sute</h2>
                    <h2>works + projects</h2>
                    <h2>bengaluru, in</h2>
                </div>
                <Seperator />
            </div>
        </Link>
        
        {isMenuOpen &&
            <MenuLinks toggleMenu={toggleMenu}/>
        }
    </>
    
  )
}

export default Navbar
