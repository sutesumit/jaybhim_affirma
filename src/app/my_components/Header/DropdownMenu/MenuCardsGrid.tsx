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
        <motion.div 
            key="menu-cards-grid-container"
            className="menu-container card-border rounded-sm mx-2 mb-2 flex flex-col flex-grow overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
            exit={{ y: "-100%", opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 0.1, 1] } }}
        >
            <div className="absolute top-2 left-2 right-2 z-30">
                <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    onClear={clearSearch} 
                />
            </div>

            <div
                className="menu-content relative flex-grow w-full z-20 px-2 pb-2 pt-14 flex flex-col overflow-y-auto gap-1"
            >

                <CardsGrid 
                    items={filteredItems} 
                    hoveredCard={hoveredCard} 
                    setHoveredCard={setHoveredCard} 
                    setMenuOpen={setMenuOpen} 
                />

                {filteredItems.length === 0 && (
                    <EmptyState searchTerm={searchTerm} onClear={clearSearch} />
                )}
            </div>

            <ImagePreviews 
                items={filteredItems} 
                hoveredCard={hoveredCard} 
                x={x} 
                y={y} 
            />
        </motion.div>
    )
}

export default MenuCardsGrid;
