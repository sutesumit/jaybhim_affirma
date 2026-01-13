'use client'
import React from 'react'
import Link from 'next/link';
import Gradient1 from '../../gradients/Gradient1';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuLinkCardProps {
    object : {
        href: string,
        id: number,
        title: string,
        description: string,
        image: string
    },
    setHoveredCard: (id: number | null) => void,
    hoveredCard: number | null,
    setMenuOpen: (open: boolean) => void,
}

const MenuLinkCard: React.FC<MenuLinkCardProps> = ({ 
    object, 
    setHoveredCard, 
    hoveredCard, 
    setMenuOpen,  
}) => {
    const isActive = hoveredCard === object.id;
  return (
    <div 
        className='relative flex-shrink-0'
        onMouseEnter={()=>setHoveredCard(object.id)}
        onMouseLeave={()=>setHoveredCard(null)}
    >
    <Link   
        href={object.href}
        onClick={() => {
            setMenuOpen(false);
        }}
        className="link-card p-0"
    >  
        <Gradient1 className='w-full h-full flex flex-col justify-center items-center px-5 py-5' hoverOn={true}>
            <motion.div 
                layout
                className={`menu-title-wrapper ${isActive ? 'menu-title-active' : ''}`}
            >
                <Gradient1 hoverOn={true}>
                    <motion.span layout className='menu-title-text'>
                        {object.title}
                    </motion.span>
                </Gradient1>
            </motion.div>

            <AnimatePresence>
                {isActive && (
                    <motion.div 
                        layout
                        initial={{ height: 0, opacity: 0, marginTop: 0, overflow: 'hidden' }}
                        animate={{ 
                            height: 'auto', 
                            opacity: 1, 
                            marginTop: '1rem',
                            transitionEnd: { overflow: 'auto' }
                        }}
                        exit={{ height: 0, opacity: 0, marginTop: 0, overflow: 'hidden' }}
                        transition={{ 
                            duration: 0.3, 
                            ease: "easeInOut",
                        }}
                        className="menu-card-description z-[2]"
                        style={{ scrollbarWidth: 'thin' }}
                    >
                        {object.description}
                    </motion.div>
                )}
            </AnimatePresence>
        </Gradient1>
    </Link>
    </div>
  )
}


export default MenuLinkCard
