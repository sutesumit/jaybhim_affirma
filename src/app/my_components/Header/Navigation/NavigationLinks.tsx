import React from 'react'
import Link from 'next/link'
import { useMenuContext } from '@/app/my_components/Header/menuContext/useMenuContext';
import MenuToggleIcon from '@/app/my_components/Header/Navigation/MenuToggleIcon';
import HoverLink from './HoverLink';
import { ExternalLink, House } from 'lucide-react';

interface NavigationLinksProps {
    pathName: string | null,
    tabName: string | undefined
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({pathName, tabName}) => {
    const { isMenuOpen, toggleMenu } = useMenuContext();

  return (
    <>
        <span className='col-span-1 text-left hidden md:inline-block'>
                <span className='site-tab px-5'>
                    <HoverLink 
                        href='/' 
                        className='rootsite-tab'
                        hoverContent={<House className='w-4 h-4' />}
                    >
                        {'art.'}
                    </HoverLink>
                    <HoverLink 
                        target='_blank' 
                        href='https://www.sumitsute.com/' 
                        className='rootsite-tab'
                        hoverContent={<><ExternalLink className='w-4 h-4' /><span className='ml-2'>sumitsute.com</span></>}
                    >
                        {'sumitsute.com'}
                    </HoverLink>
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
                            <MenuToggleIcon isMenuOpen={isMenuOpen} />
                        </span>
                </Link>
            </span>
            <span 
                className='col-span-1 text-right hidden md:inline-block'
            >
                <Link 
                    href={pathName ?? '/'} 
                    className='router-tab capitalize'
                    onClick={(e) => e.stopPropagation()}
                >
                    {tabName || 'Home'}
                </Link>
            </span>
      
    </>
  )
}

export default NavigationLinks
