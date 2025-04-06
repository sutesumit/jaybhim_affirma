import React, {createContext, useState } from 'react'
import useMousePosition from '@/_hooks/useMousePosition';

interface NavMenuContextProps {
    isMenuOpen: boolean;
    setMenuOpen: (isMenuOpen: boolean) => void;
    hoveredCard: number | null;
    setHoveredCard: (hoveredCard: number | null) => void;
    x: number;
    y: number;
}

const NavMenuContext = createContext<NavMenuContextProps | undefined>(undefined);

export const NavMenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMenuOpen, setMenuOpen ] = useState(false);
    const [hoveredCard, setHoveredCard ] = useState<number | null>(null);
    const { x, y } = useMousePosition();

    return (
        <NavMenuContext.Provider value={{
            isMenuOpen,
            setMenuOpen,
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