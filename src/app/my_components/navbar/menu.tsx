import React from 'react'
import linkObject from './linkObject'
import Image from 'next/image';
import Link from 'next/link';


    interface MenuLinkProps {
        
        setMenuOpen: (isMenuOpen: boolean) => void,
        toggleMenu: () => void;
    }

    const MenuLinks: React.FC<MenuLinkProps> = ({ toggleMenu, setMenuOpen }) => {
        return (
            
            <div className="menu-container relative mx-2">
                    <div className='menu-content absolute h-[35vh] w-full z-20 flex bg-white/50 backdrop-blur-sm rounded-lg snap-y snap-mandatory overflow-x-auto overflow-y-hidden'
                            onMouseEnter={() => setMenuOpen(true)}
                            onMouseLeave={toggleMenu}>
                                
                                {
                                    linkObject.map((object, index) => {
                                        return (
                                            <Link  href={object.href} 
                                            key={index}
                                                className="link-card relative h-full w-[50%] flex-shrink-0 flex rounded-lg p-5 justify-center items-center font-rajdhani text-center overflow-clip hover:scale-105 hover:z-50"
                                            >
                                                <p>{object.title}</p>
                                                <Image  src={object.image} 
                                                        alt={object.title} 
                                                        width={100} 
                                                        height={100}
                                                        style={{
                                                            position: 'absolute',
                                                            objectFit: 'contain',
                                                            width: '100%',
                                                            visibility: 'visible',
                                                            opacity: '0.3',
                                                        }}
                                                />
                                            </Link>
                                        )
                                    }
                                    )
                                }

                        

                    </div>

                    
                    <button className='prev-button absolute z-20 h-[35vh] left-2 transform -translate-y-1 p-2'
                            onMouseEnter={() => setMenuOpen(true)}
                            onClick={() => {
                                const menuCard = document.querySelector('.menu-content')
                                menuCard?.scrollBy({ left: -menuCard.clientWidth, behavior: 'smooth'})
                            }}
                    >
                        &#10094;
                    </button>

                    <button className='next-button absolute z-20 h-[35vh] right-2 transform -translate-y-1 p-2'
                            onMouseEnter={() => setMenuOpen(true)}
                            onClick={() => {
                                const menuCard = document.querySelector('.menu-content')
                                menuCard?.scrollBy({ left: menuCard.clientWidth, behavior: 'smooth'})
                            }}
                    >
                        &#10095;
                    </button>
                    
                        
            </div>
            
        )
    }

export default MenuLinks
