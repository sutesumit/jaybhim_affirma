import React, { useEffect, useRef, useState } from 'react'
import linkObject from '@/app/my_components/common/layout/data/linkObject'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Seperator from '@/app/my_components/shared/Seperator';
import { useNavMenu } from '../context/NavMenu/useNavMenu';
import LinkCard from './LinkCard';

const NavMenuCards: React.FC = () => {

    const { setMenuOpen, toggleMenu, hoveredCard, setHoveredCard, x, y } = useNavMenu();
    
    return ( 
            <div
                className="menu-container overflow-visible"
            >
                <motion.div
                    key="menu-content relative"
                    className={`menu-content relative max-h-screen w-full z-20 p-2 grid md:grid-cols-3 sm:grid-cols-2 gap-4 rounded-lg overflow-y-scroll`}
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                >
                        {
                            linkObject.map((object) => {
                                return (
            
                                    <LinkCard  
                                        object={object}
                                        key={object.id}
                                        setHoveredCard={setHoveredCard}
                                        hoveredCard={hoveredCard}
                                        setMenuOpen={setMenuOpen}
                                    />
                                )
                            }
                            )
                        }
                        <Seperator />
                </motion.div>
                {
                    linkObject.map((object) => {
                        return (
                        <div
                            key={object.id}
                            className="image-container"
                        >
                            <AnimatePresence>
                                {hoveredCard === object.id && (
                                <motion.img
                                    initial={{ opacity: 0, scale: 0, rotate: 180 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0, rotate: -180 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className='menu-image'
                                    src={object.image}
                                    alt={object.title}
                                    width={100}
                                    height={100}
                                    style={{
                                    borderRadius: '10px',
                                    position: 'absolute',
                                    objectFit: 'contain',
                                    visibility: 'visible',
                                    width: '20vw',
                                    zIndex: 10,
                                    pointerEvents: 'none',
                                    left: `calc(${x}px - 10vw)`,
                                    top: `calc(${y}px - 10vw)`,
                                    }}
                                />
                                )}
                            </AnimatePresence>
                        </div>
                        )
                    })
                }
            </div>
    )
}

export default NavMenuCards;

  