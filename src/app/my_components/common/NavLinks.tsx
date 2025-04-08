import React from 'react'
import Link from 'next/link'
import { useNavMenu } from '@/app/my_components/common/layout/context/NavMenu/useNavMenu';
import { usePathname } from 'next/navigation';
import NavMenuIcon from '@/app/my_components/common/layout/NavMenu/NavMenuIcon';

const NavLinks = () => {
    const { toggleMenu } = useNavMenu();
    const pathName = usePathname()
    var tabName = pathName ? pathName.split('/').pop()?.split('-').join(' ') : "Home"

  return (
    <>
        <span className='col-span-1 text-left hidden md:inline-block'>
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
            </span>
      
    </>
  )
}

export default NavLinks
