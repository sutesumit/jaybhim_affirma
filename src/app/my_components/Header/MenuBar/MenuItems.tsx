'use client'
import React from 'react'
import NavigationLinks from '../Navigation/NavigationLinks';
import { usePathname } from 'next/navigation';
import Gradient1 from '../../gradients/Gradient1';

const MenuItems = () => {

    const pathName = usePathname()
    var tabName = pathName ? pathName.split('/').pop()?.split('-').join(' ') : "Home"

    
  return (
    <div 
        className='w-full relative text-[var(--primary-blue)] z-30 p-2 pb-1 cursor-pointer'
    >
        <Gradient1 
            className='nav-content font-rajdhani font-medium cursor-pointer grid grid-cols-3 items-center px-4 py-2 rounded-sm text-md card-bg card-shadow glass-hover'
            hoverOn={true}
        >
            <NavigationLinks pathName={pathName} tabName={tabName} />
        </Gradient1>
    </div>
  )
}

export default MenuItems