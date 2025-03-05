'use client';
import React from 'react'
import Seperator from '../shared/Seperator'
import MenuLinks from './navbar/menu';
import Link from 'next/link';
import Pointer from './navbar/nav_pointer';

const Navbar = () => {

    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }
    
  return (
    <nav className="navbar fixed isolate top-0 z-20 w-full">
        <Link href="/">
            <div 
                className='w-full relative text-[var(--primary-blue)] z-30 p-2 pb-1 cursor-pointer'
                onMouseEnter={toggleMenu}
            >
                <div className='nav-content cursor-none flex justify-between px-4 py-2 rounded-sm border-[1px] border-[var(--primary-blue)] text-xs font-title bg-white/50 backdrop-blur-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-colors duration-1000 ease-out'>
                    <span>sumitsute</span>
                    <span>works + projects</span>
                    <span>bengaluru, in</span>
                    <Pointer />
                </div>
                {/* <div className="separator-wrapper">
                    <Seperator />
                </div> */}
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
