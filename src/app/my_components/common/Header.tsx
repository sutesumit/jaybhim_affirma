'use client';
import React from 'react'
import { usePathname } from 'next/navigation';
import NavMenuCardsWrapper from '@/app/my_components/common/layout/NavMenu/NavMenuCards';
import { AnimatePresence } from 'framer-motion';
import { useNavMenu } from '@/app/my_components/common/layout/context/NavMenu/useNavMenu';
import { NavMenuProvider } from '@/app/my_components/common/layout/context/NavMenu/NavMenuContext';
import NavLinks from './NavLinks';

const Navbar: React.FC = () => {

    const { isMenuOpen, setMenuOpen } = useNavMenu();
    
  return (
    <nav
        className="navbar fixed isolate top-0 z-20 w-full"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
    >
        
        <>
            <div 
                className='w-full relative text-[var(--primary-blue)] z-30 p-2 pb-1 cursor-pointer'
            >
                <div className='nav-content cursor-pointer grid grid-cols-3 items-center px-4 py-2 rounded-sm border-[1px] border-[var(--primary-blue)] text-xs font-title bg-white/50 backdrop-blur-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-colors duration-1000 ease-out'>
                    <NavLinks />
                    {/* <span className='col-span-1 text-left hidden md:inline-block'>
                        <span className='site-tab px-5'>
                            <Link 
                                href='/' 
                                className='rootsite-tab'
                            >
                                {'art.'}
                            </Link>
                            <Link 
                                target='_blank' 
                                href='https://www.sumitsute.com/' 
                                className='rootsite-tab'
                            >
                                {'sumitsute.com'}
                            </Link>
                        </span>
                    </span>
                    <span 
                        className='col-span-3 md:col-span-1 text-center md:inline-block'
                    >
                        <Link 
                            href='/' 
                            className='router-tab'
                            onClick={(e) => {
                                e.preventDefault();
                                toggleMenu();
                            }}
                        >
                                <span className='inline-block align-middle text-sm'>
                                    <NavMenuIcon />
                                </span>
                        </Link>
                    </span>
                    <span 
                        className='col-span-1 text-right hidden md:inline-block'
                    >
                        <Link 
                            href={pathName} 
                            className='router-tab capitalize'
                        >
                            {pathName !=='/' ? tabName : "Home"}
                        </Link>
                    </span> */}
                </div>
            </div>
        </>
        <AnimatePresence>
            {isMenuOpen &&
                <NavMenuCardsWrapper />
            }
        </AnimatePresence>
    </nav>
  )
}

const NavbarWrapper: React.FC = () => {
    return (
        <NavMenuProvider>
            <Navbar />
        </NavMenuProvider>
    )
}

export default NavbarWrapper
