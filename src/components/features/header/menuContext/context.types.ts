export interface MenuContextProps {
    isMenuOpen: boolean;
    setMenuOpen: (isMenuOpen: boolean) => void;
    toggleMenu: () => void;
    hoveredCard: number | null;
    setHoveredCard: (hoveredCard: number | null) => void;
    x: number;
    y: number;
}