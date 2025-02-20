import React, { useEffect, useRef, useState } from 'react'
import linkObject from './linkObject'
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';


    interface MenuLinkProps {
        isMenuOpen: boolean,
        setMenuOpen: (isMenuOpen: boolean) => void,
        toggleMenu: () => void;
    }

    const MenuLinks: React.FC<MenuLinkProps> = ({ toggleMenu, setMenuOpen, isMenuOpen }) => {


        const useMousePostion = (imageRef: React.RefObject<HTMLImageElement | null>) => {
            const [mouseCords, setMouseCords] = React.useState({x: 0, y: 0})
            
            useEffect(()=> {
                const updateMouseCords = (event: MouseEvent) => {
                    
                    
                    setMouseCords({ x: (event.clientX), y: (event.clientY) })
    
                }
                window.addEventListener('mousemove', updateMouseCords)
                return () => {
                    window.removeEventListener('mousemove', updateMouseCords)
                }
            }, [imageRef])
            return mouseCords
        }

        const [ hoveredCard, setHoveredCard] = useState<number | null>(null) 

        

        
        const imageRef = useRef<HTMLImageElement>(null);
        const { x, y } = useMousePostion(imageRef);

        return (

            
            
            <div 
                className="menu-container relative overflow-visible"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
            >
                <AnimatePresence>
                    <motion.div
                        key="menu-content"
                        className={`menu-content absolute max-h-screen w-full z-20 p-2 grid md:grid-cols-3 sm:grid-cols-2 gap-4 rounded-lg overflow-y-scroll ${!isMenuOpen ? 'pointer-events-none' : ''}`}
                        initial={{ y: "-100%" }}
                        animate={{ y: isMenuOpen ? 0 : "-100%" }}
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
                                                className="link-card relative h-[30vh] flex-shrink-0 rounded-lg p-5 flex flex-col justify-center items-center font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out"
                                        >
                                            <span className={hoveredCard === object.id ? 'text-[var(--primary-white)] bg-[var(--primary-blue)] px-2 py-1 rounded-sm' : ''}>{object.title}</span>
                                            {hoveredCard === object.id && <span className='text-[var(--primary-blue)] text-sm p-2'>{object.description}</span>}
                                        </Link>
                        
                                    )
                                }
                                )
                            }
                    </motion.div>
                </AnimatePresence>

                {
                    linkObject.map((object) => {

                        

                        return (

                        <div 
                            key={object.id}
                            className="image-container"
                            >
                            {hoveredCard === object.id && (
                            <Image
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
                                opacity: '10',
                                zIndex: 10,
                                pointerEvents: 'none',
                                left: x,
                                top: y,
                                }}
                            />
                            )}
                        </div>
                        
                        )
                    })
                }

                    
                    

                    

                        
            </div>
            
        )
    }

export default MenuLinks
