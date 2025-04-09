'use client';
import React from 'react'
import { NavMenuProvider } from '@/app/my_components/common/layout/context/NavMenu/NavMenuContext';
import Navbar from '../common/NavBar';

const Header: React.FC = () => {
    return (
        <NavMenuProvider>
            <Navbar />
        </NavMenuProvider>
    )
}

export default Header
