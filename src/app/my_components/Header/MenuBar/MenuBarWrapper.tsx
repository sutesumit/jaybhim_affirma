'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import MenuCardsGrid from '../DropdownMenu/MenuCardsGrid';
import MenuItems from './MenuItems';
import { useMenuContext } from '../menuContext/useMenuContext';
import { cn } from '@/lib/utils';

const MenuBarWrapper: React.FC = () => {
  const { isMenuOpen, setMenuOpen, toggleMenu } = useMenuContext();

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-40 h-auto pointer-events-none">
      {/* Top Bar - always interactive */}
      <div 
        className="relative z-50 pointer-events-auto" 
        onClick={(e) => {
            const target = e.target as HTMLElement;
            if (!target.closest('a')) {
                e.stopPropagation();
                toggleMenu();
            }
        }}
      >
        <MenuItems />
      </div>

      {/* The suggestion: A dedicated interactive layer controlled by isMenuOpen */}
      <div 
        className={cn(
          "fixed inset-0 z-30 flex flex-col pt-[64px]",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <AnimatePresence>
            {isMenuOpen && (
                <>
                {/* Backdrop */}
                <motion.div 
                    key="menu-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-transparent cursor-default"
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                    }}
                />
                
                {/* Menu content container */}
                <div className="relative flex-grow flex flex-col overflow-hidden">
                    <MenuCardsGrid key="menu-cards-grid" />
                </div>
                </>
            )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default MenuBarWrapper