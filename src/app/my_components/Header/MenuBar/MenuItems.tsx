import React from 'react'
import NavLinks from '../../common/NavLinks';
import { usePathname } from 'next/navigation';


const MenuItems = () => {

    const pathName = usePathname()
    var tabName = pathName ? pathName.split('/').pop()?.split('-').join(' ') : "Home"

    
  return (
    <div 
        className='w-full relative text-[var(--primary-blue)] z-30 p-2 pb-1 cursor-pointer'
    >
        <div className='nav-content cursor-pointer grid grid-cols-3 items-center px-4 py-2 rounded-sm border-[1px] border-[var(--primary-blue)] text-xs font-title bg-white/50 backdrop-blur-sm hover:opacity-100 hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] transition-colors duration-1000 ease-out'>
            <NavLinks pathName={pathName} tabName={tabName} />
        </div>
    </div>
  )
}

export default MenuItems
