'use client';
import React from 'react'
import { usePathname } from 'next/navigation';
import MenuLinks from './navbar/menu';
import Link from 'next/link';
import { BsViewList } from "react-icons/bs";

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
                <div className='nav-content cursor-pointer grid grid-cols-3 px-4 py-2 rounded-sm border-[1px] border-[var(--primary-blue)] text-xs font-title bg-white/50 backdrop-blur-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-colors duration-1000 ease-out'>
                    <span className='col-span-1 text-left hidden md:inline-block'>
                        <span className='site-tab py-2 px-5'>
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
                        className='col-span-3 md:col-span-1 text-center inline-block'
                    >
                        <Link 
                            href='/' className='router-tab inline-block'
                        >
                                {"<BsViewList />"}
                        </Link>
                    </span>
                    <span className='col-span-1 text-right hidden md:inline-block'>
                        { <Link href={pathName} className='router-tab'>{pathName !=='/' ? tabName : "Home"}</Link> }
                    </span>
                </div>
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
