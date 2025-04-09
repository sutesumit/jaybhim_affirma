'use client';
import React from 'react'
import { NavMenuProvider } from '@/app/my_components/common/layout/context/NavMenu/NavMenuContext';
import Navbar from './NavBar';

const NavbarWrapper: React.FC = () => {
    return (
        <NavMenuProvider>
            <Navbar />
        </NavMenuProvider>
    )
}

export default NavbarWrapper
