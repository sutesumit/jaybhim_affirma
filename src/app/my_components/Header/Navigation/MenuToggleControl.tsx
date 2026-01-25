import React from 'react';
import Link from 'next/link';
import { useMenuContext } from '@/app/my_components/Header/menuContext/useMenuContext';
import MenuToggleIcon from '@/app/my_components/Header/Navigation/MenuToggleIcon';

const MenuToggleControl: React.FC = () => {
    const { isMenuOpen } = useMenuContext();

    return (
        <span className='col-span-3 md:col-span-1 text-center md:inline-block'>
            <Link 
                href='/' 
                className='router-tab'
                onClick={(e) => {
                    e.preventDefault();
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
