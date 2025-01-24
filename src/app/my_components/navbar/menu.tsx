import React, { useEffect } from 'react'
import linkObject from './linkObject'
import Image from 'next/image';
import Link from 'next/link';


    interface MenuLinkProps {
        isMenuOpen: boolean,
        setMenuOpen: (isMenuOpen: boolean) => void,
        toggleMenu: () => void;
    }

    const MenuLinks: React.FC<MenuLinkProps> = ({ toggleMenu, setMenuOpen, isMenuOpen }) => {

        const handleWheel = (event: any) => {
            if (event.deltaY !== 0){
                event.preventDefault()
                event.currentTarget.scrollLeft += event.deltaY
            }
        }

        useEffect(()=>{

            const menuContent = document.querySelector('.menu-content')
            if(menuContent){
                menuContent.addEventListener('wheel', handleWheel, { passive: false })
            }

            return () => {
                if(menuContent){
                    menuContent.removeEventListener('wheel', handleWheel)
                }
            }

        }, [])

        const useMousePostion = () => {
            const [mouseCords, setMouseCords] = React.useState({x: 0, y: 0})
            useEffect(()=> {
                const updateMouseCords = (event: MouseEvent) => {
                    setMouseCords({ x: event.clientX, y: event.clientY })
                }
                window.addEventListener('mousemove', updateMouseCords)
                return () => {
                    window.removeEventListener('mousemove', updateMouseCords)
                }
            }, [])
            return mouseCords
        }

        

        const {x, y } = useMousePostion()

        return (

            
            
            <div 
                className="menu-container relative overflow-visible"
            >
                    <div 
                        className="menu-content absolute h-[35vh] w-full z-20 my-2 flex rounded-lg snap-x snap-mandatory overflow-x-auto"
                        style={{ 
                            transition: 'all 0.3s ease-in-out',
                            opacity: isMenuOpen ? 1 : 0, 
                            transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
                        }}
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={toggleMenu}>
                            
                                
                        {
                            linkObject.map((object, index) => {
                                return (
                                
                                    <Link   href={object.href} 
                                            key={object.id}
                                            className="link-card relative h-full w-[30%] flex-shrink-0 flex rounded-lg p-5 mx-2 justify-center items-center font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)]
 transition-transition duration-300 ease-in-out"
                                    >
                                        <p>{object.title}</p>
                
                                    </Link>
                                
                                )
                            }
                            )
                        }


                        

                    </div>

                    
                    <button className='prev-button absolute z-20 h-[35vh] left-2 transform -translate-y-1 p-2 hover:scale-150 transition-transform duration-500 ease-in-out'
                            onMouseEnter={() => setMenuOpen(true)}
                            onClick={() => {
                                const menuCard = document.querySelector('.menu-content')
                                menuCard?.scrollBy({ left: -menuCard.clientWidth, behavior: 'smooth'})
                            }}
                    >
                        &#10094;
                    </button>

                    <button className="next-button absolute z-20 h-[35vh] right-2 transform -translate-y-1 p-2 hover:scale-150 transition-all duration-500 ease-in-out"
                            onMouseEnter={() => setMenuOpen(true)}
                            onClick={() => {
                                const menuCard = document.querySelector('.menu-content')
                                menuCard?.scrollBy({ left: menuCard.clientWidth, behavior: 'smooth'})
                            }}
                    >
                        &#10095;
                    </button>

                    {
                        linkObject.map((object) => {

                            

                            return (
                                <Image
                                    // className='checkbox'  
                                    src={object.image} 
                                    key={object.id}
                                    alt={object.title} 
                                    width={100} 
                                    height={100}
                                    style={{
                                        position: 'absolute',
                                        objectFit: 'contain',
                                        visibility: 'visible',
                                        width: '20vw',
                                        opacity: '10',
                                        zIndex: 0,
                                        pointerEvents: 'none',
                                        left: x - 200,
                                        top: y - 200
                                    }}
                                />
                            )
                        })
                                }

                        
            </div>
            
        )
    }

export default MenuLinks
