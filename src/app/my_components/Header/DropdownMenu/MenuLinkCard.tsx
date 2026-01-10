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
        <span 
            className={
                hoveredCard === object.id 
                ? 'text-[var(--primary-white)] bg-[var(--primary-blue)] px-2 py-1 rounded-sm' 
                : ''
            }
        >
            {object.title}
        </span>

        {hoveredCard === object.id && (
            <span className='text-[var(--primary-blue)] text-sm p-2'>
                {object.description}
            </span>
        )}
    </Link>
    </div>
  )
}


export default MenuLinkCard
