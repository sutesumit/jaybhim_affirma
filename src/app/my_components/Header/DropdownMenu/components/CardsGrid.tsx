"use client"

import React from 'react'
import MenuLinkCard from '../MenuLinkCard';
import { MenuItem } from '../hooks/useMenuFilter';

interface CardsGridProps {
    items: MenuItem[];
    hoveredCard: number | null;
    setHoveredCard: (id: number | null) => void;
    setMenuOpen: (open: boolean) => void;
}

const CardsGrid: React.FC<CardsGridProps> = ({ 
    items, 
    hoveredCard, 
    setHoveredCard, 
    setMenuOpen 
}) => {
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            {items.map((object) => (
                <MenuLinkCard
                    object={object}
                    key={object.id}
                    setHoveredCard={setHoveredCard}
                    hoveredCard={hoveredCard}
                    setMenuOpen={setMenuOpen}
                />
            ))}
        </div>
    )
}

export default CardsGrid;
