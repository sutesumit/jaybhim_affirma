import React from 'react'
import linkObject from './linkObject'
import Image from 'next/image';


    interface MenuLinkProps {
        toggleMenu: () => void;
    }

    const MenuLinks: React.FC<MenuLinkProps> = ({ toggleMenu }) => {
        return (
            <div>
            <div className="menu-container relative mx-2">
                        <div className='menu-content absolute z-20 bg-white/50 backdrop-blur-sm h-[75vh] w-full border border-[var(--primary-blue)] rounded-lg flex flex-wrap justify-center items-center'
                            onMouseLeave={toggleMenu}>
                                
                                {
                                    linkObject.map((object, index) => {
                                        return (
                                            <a  href={object.href} 
                                            key={index}
                                                className="link-card relative h-28 w-28 flex flex-1 border border-[var(--primary-blue)] rounded-lg p-2 m-2 justify-center items-center overflow-clip"
                                            >
                                                <p>{object.title}</p>
                                                <Image  src={object.image} 
                                                        alt={object.title} 
                                                        width={100} 
                                                        height={100}
                                                        style={{
                                                            position: 'absolute',
                                                            objectFit: 'cover',
                                                            visibility: 'visible',
                                                        }}
                                                />
                                            </a>
                                        )
                                    }
                                    )
                                }

                        </div>
                    </div>
            </div>
        )
    }

export default MenuLinks
