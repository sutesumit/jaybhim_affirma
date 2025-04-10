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
    <Link   
        href={object.href}
        onMouseEnter={()=>setHoveredCard(object.id)}
        onMouseLeave={()=>setHoveredCard(null)}
        onClick={() => {
            setMenuOpen(false);
        }}
        className="link-card relative h-[30vh] flex-shrink-0 rounded-sm p-5 flex flex-col justify-center items-center font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out"
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
  )
}


export default MenuLinkCard
