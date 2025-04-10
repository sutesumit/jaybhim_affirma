import React from 'react'
import Link from 'next/link'
import { useMenuContext } from '@/app/my_components/Header/menuContext/useMenuContext';
import MenuToggleIcon from '@/app/my_components/Header/Navigation/MenuToggleIcon';


interface NavigationLinksProps {
    pathName: string | null,
    tabName: string | undefined
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({pathName, tabName}) => {
    const { toggleMenu } = useMenuContext();

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
                            <MenuToggleIcon />
                        </span>
                </Link>
            </span>
            <span 
                className='col-span-1 text-right hidden md:inline-block'
            >
                <Link 
                    href={pathName ?? '/'} 
                    className='router-tab capitalize'
                >
                    {tabName || 'Home'}
                </Link>
            </span>
      
    </>
  )
}

export default NavigationLinks
