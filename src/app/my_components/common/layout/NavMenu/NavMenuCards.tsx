import React from 'react'
import linkObject from '@/app/my_components/common/layout/data/linkObject'
import { motion } from 'framer-motion';
import Seperator from '@/app/my_components/shared/Seperator';
import { useNavMenu } from '../context/NavMenu/useNavMenu';
import HoverImagePreview from './HoverImagePreview';
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
                        <HoverImagePreview
                            key={object.id}
                            object={object}
                            hoveredCard={hoveredCard}
                            x={x}
                            y={y}
                        />
                        )
                    })
                }
            </div>
    )
}

export default NavMenuCards;

  