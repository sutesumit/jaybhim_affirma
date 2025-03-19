'use client';
import React from 'react'
import { usePathname } from 'next/navigation';
import MenuLinks from './navbar/menu';
import Link from 'next/link';


const Navbar = () => {

    const pathName = usePathname()
    var tabName = pathName ? pathName.split('/').pop() : "Home"

    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }
    
  return (
    <nav className="navbar fixed isolate top-0 z-20 w-full">
        <>
            <div 
                className='w-full relative text-[var(--primary-blue)] z-30 p-2 pb-1 cursor-pointer'
                onClick={() => window.location.href = '/'}
                onMouseEnter={toggleMenu}
            >
                <div className='nav-content cursor-pointer flex justify-between px-4 py-2 rounded-sm border-[1px] border-[var(--primary-blue)] text-xs font-title bg-white/50 backdrop-blur-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-colors duration-1000 ease-out'>
                    <span>
                    <Link href='/' className='router-tab !pr-0 !mr-0'>{'art.'}</Link><Link target='_blank' href='https://www.sumitsute.com/' className='router-tab !pl-0 !ml-0'>{'sumitsute.com'}</Link>
                    </span>
                    <span>
                        <Link href='/' className='router-tab'>{'works + projects'}</Link>
                        
                    </span>
                    <span>
                        { <Link href={pathName} className='router-tab'>{pathName !=='/' ? tabName : "Home"}</Link> }
                    </span>
                    {/* <Pointer /> */}
                </div>
                {/* <div className="separator-wrapper">
                    <Seperator />
                </div> */}
            </div>
        </>
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
