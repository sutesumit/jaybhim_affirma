import React from 'react'


    interface MenuLinkProps {
        toggleMenu: () => void;
    }

    const MenuLinks: React.FC<MenuLinkProps> = ({ toggleMenu }) => {
        return (
            <div>
            <div className="menu-container relative mx-2">
                        <div className='menu-content absolute z-20 bg-white/50 backdrop-blur-sm h-[75vh] w-full border border-[var(--primary-blue)] rounded-lg flex flex-col justify-center items-center'
                            onMouseLeave={toggleMenu}>
                        </div>
                    </div>
            </div>
        )
    }

export default MenuLinks
