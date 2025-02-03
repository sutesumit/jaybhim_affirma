'use client';
import React from 'react'
import Seperator from '../Seperator'
import MenuLinks from './menu';
import Link from 'next/link';
import Pointer from './nav_pointer';

const Navbar = () => {

    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }
    
  return (
    <nav className="navbar">
        <Link href="/">
            <div className='relative text-[var(--primary-blue)] z-30 p-2 cursor-pointer'
                onMouseEnter={toggleMenu}>
                <div className='nav-content cursor-none flex justify-between px-4 py-2 rounded-sm border-[1px] opacity-40 text-xs font-title bg-blend-difference hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-colors duration-1000 ease-out'>
                    <span>sumitsute</span>
                    <span>works + projects</span>
                    <span>bengaluru, in</span>
                    <Pointer />
                </div>
                <div className="separator-wrapper">
                    <Seperator />
                </div>
            </div>
        </Link>
        
        {isMenuOpen &&
            <MenuLinks 
                toggleMenu={toggleMenu} 
                setMenuOpen={setMenuOpen} 
                isMenuOpen={isMenuOpen}
            />
        }
    </nav>
  )
}

export default Navbar
