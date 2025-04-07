import React, {createContext, useState } from 'react'
import useMousePosition from '@/_hooks/useMousePosition';
import { NavMenuContextProps } from './types';

const NavMenuContext = createContext<NavMenuContextProps | undefined>(undefined);

export const NavMenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMenuOpen, setMenuOpen ] = useState(false);
    const [hoveredCard, setHoveredCard ] = useState<number | null>(null);
    const { x, y } = useMousePosition();
    const toggleMenu = () => {
        setMenuOpen(prev => !prev)
    }

    return (
        <NavMenuContext.Provider value={{
            isMenuOpen,
            setMenuOpen,
            toggleMenu,
            hoveredCard,
            setHoveredCard,
            x,
            y,
        }}
        >
            {children}
        </NavMenuContext.Provider>
    );  
}   


export default NavMenuContext;