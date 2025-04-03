import React, { useEffect, useRef, useState } from 'react'
import linkObject from '@/app/my_components/common/layout/data/linkObject'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Seperator from '@/app/my_components/shared/Seperator';
import useMousePosition from '@/_hooks/useMousePosition'

interface NavMenuCardProps {
    isMenuOpen: boolean,
    setMenuOpen: (isMenuOpen: boolean) => void,
    toggleMenu: () => void;
}

const NavMenuCards: React.FC<NavMenuCardProps> = ({ toggleMenu, setMenuOpen, isMenuOpen }) => {

    const [ hoveredCard, setHoveredCard] = useState<number | null>(null) 
    const imageRef = useRef<HTMLImageElement>(null);
    const { x, y } = useMousePosition(imageRef);

    return ( 
        <div 
            className="menu-container overflow-visible"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
        >
            <motion.div
                key="menu-content relative"
                className={`menu-content relative max-h-screen w-full z-20 p-2 grid md:grid-cols-3 sm:grid-cols-2 gap-4 rounded-lg overflow-y-scroll ${!isMenuOpen ? 'pointer-events-none' : ''}`}
                initial={{ y: "-100%" }}
                animate={{ y: isMenuOpen ? 0 : "-100%" }}
                exit={{ y: "-100%" }}
                transition={{ 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                    {
                        linkObject.map((object, index) => {
                            return (
                
                                <Link   href={object.href}
                                        key={object.id}
                                        onMouseEnter={()=>setHoveredCard(object.id)}
                                        onMouseLeave={()=>setHoveredCard(null)}
                                        onClick={() => setMenuOpen(false)}
                                        className="link-card relative h-[30vh] flex-shrink-0 rounded-sm p-5 flex flex-col justify-center items-center font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out"
                                >
                                    <span className={hoveredCard === object.id ? 'text-[var(--primary-white)] bg-[var(--primary-blue)] px-2 py-1 rounded-sm' : ''}>{object.title}</span>
                                    {hoveredCard === object.id && <span className='text-[var(--primary-blue)] text-sm p-2'>{object.description}</span>}
                                </Link>
                
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
export default NavMenuCards

  