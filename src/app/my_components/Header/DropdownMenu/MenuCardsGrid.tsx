import React from 'react'
import { motion } from 'framer-motion';
import Seperator from '@/app/my_components/shared/Seperator';
import CardImagePreview from './CardImagePreview';
import MenuLinkCard from './MenuLinkCard';
import menuConfig from './menuConfig';
import { useMenuContext } from '@/app/my_components/Header/menuContext/useMenuContext';

const MenuCardsGrid: React.FC = () => {
    const { setMenuOpen, hoveredCard, setHoveredCard, x, y } = useMenuContext();
    
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
                            menuConfig.map((object) => {
                                return (
                                    <MenuLinkCard  
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
                    menuConfig.map((object) => {
                        return (
                        <CardImagePreview
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

export default MenuCardsGrid;

  