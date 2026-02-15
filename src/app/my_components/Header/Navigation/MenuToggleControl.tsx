import React from 'react';
import Link from 'next/link';
import { useMenuContext } from '@/app/my_components/Header/menuContext/useMenuContext';
import MenuToggleIcon from '@/app/my_components/Header/Navigation/MenuToggleIcon';
import { Circle } from 'lucide-react';

const MenuToggleControl: React.FC = () => {
    const { isMenuOpen, toggleMenu } = useMenuContext();

    return (
        <span className='col-span-3 relative md:col-span-1 text-center md:inline-block'>
            {/* <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse animate-duration-[5000ms]'>
                <Circle className='w-12 h-12 stroke-1' />
            </span> */}
            <Link 
                href='/' 
                className='router-tab button-shadow gradient-button py-1'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMenu();
                }}
            >
                <span className='inline-block align-middle text-sm'>
                    <MenuToggleIcon isMenuOpen={isMenuOpen} />
                </span>
            </Link>
        </span>
    );
};

export default MenuToggleControl;
