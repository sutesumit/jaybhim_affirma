"use client"

import React from 'react'
import { motion } from 'framer-motion';
import menuConfig from './menuConfig';
import { useMenuContext } from '@/app/my_components/Header/menuContext/useMenuContext';

// Hooks & Sub-components
import { useMenuFilter, MenuItem } from './hooks/useMenuFilter';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import CardsGrid from './components/CardsGrid';
import ImagePreviews from './components/ImagePreviews';

const MenuCardsGrid: React.FC = () => {
    const { setMenuOpen, hoveredCard, setHoveredCard, x, y } = useMenuContext();
    
    // Logic extraction (SRP)
    const { searchTerm, setSearchTerm, filteredItems, clearSearch } = useMenuFilter(menuConfig as MenuItem[]);

    return (
        <div 
            className="menu-container card-border rounded-sm mx-2 mb-2 flex flex-col flex-grow overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <motion.div
                key="menu-content relative"
                className="menu-content relative flex-grow w-full z-20 p-2 flex flex-col overflow-y-auto gap-1"
                initial={{ y: "-100%" }}
                animate={{ y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
                exit={{ y: "-100%", transition: { duration: 0.1, ease: [0.4, 0, 0.1, 1] } }}
            >
                <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    onClear={clearSearch} 
                />

                <CardsGrid 
                    items={filteredItems} 
                    hoveredCard={hoveredCard} 
                    setHoveredCard={setHoveredCard} 
                    setMenuOpen={setMenuOpen} 
                />

                {filteredItems.length === 0 && (
                    <EmptyState searchTerm={searchTerm} onClear={clearSearch} />
                )}
            </motion.div>

            <ImagePreviews 
                items={filteredItems} 
                hoveredCard={hoveredCard} 
                x={x} 
                y={y} 
            />
        </div>
    )
}

export default MenuCardsGrid;
