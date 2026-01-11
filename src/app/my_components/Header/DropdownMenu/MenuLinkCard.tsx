import React from 'react'
import Link from 'next/link';

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
        className="link-card"
    >  
        <div className={`menu-title-wrapper ${isActive ? 'menu-title-active' : ''}`}>
            <div className='menu-title-bg'/>
            <span className='menu-title-text'>
                {object.title}
            </span>
        </div>

        <div className={`menu-card-description ${isActive ? 'menu-card-description-visible' : ''}`}>
            {object.description}
        </div>
    </Link>
    </div>
  )
}


export default MenuLinkCard
