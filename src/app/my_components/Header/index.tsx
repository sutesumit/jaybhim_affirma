'use client';
import React from 'react'
import { NavMenuProvider } from '@/app/my_components/Header/menuContext/MenuContextProvider';
import MenuBarWrapper from './MenuBar/MenuBarWrapper';

const Header: React.FC = () => {
    return (
        <NavMenuProvider>
            <MenuBarWrapper />
        </NavMenuProvider>
    )
}

export default Header
