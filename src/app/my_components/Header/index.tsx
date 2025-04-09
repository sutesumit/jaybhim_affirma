'use client';
import React from 'react'
import { NavMenuProvider } from '@/app/my_components/common/layout/context/NavMenu/NavMenuContext';
import MenuBarWrapper from './MenuBar/MenuBarWrapper';

const Header: React.FC = () => {
    return (
        <NavMenuProvider>
            <MenuBarWrapper />
        </NavMenuProvider>
    )
}

export default Header
