import React, { useEffect } from 'react'

const Pointer = () => {

  const useMousePostion = () => {
    const [mouseCords, setMouseCords] = React.useState({x: 0, y: 0})

    useEffect(()=>{

        const updateMouseCords = (event: MouseEvent) => {

            setMouseCords({x: event.clientX, y: event.clientY})

        }

        window.addEventListener('mousemove', updateMouseCords)

        return () => {
            window.removeEventListener('mousemove', updateMouseCords)
        }

    }, [])

    return mouseCords
}

const {x, y} = useMousePostion()

  return (
      <div    
          className='nav-pointer absolute z-50 pointer-events-none'
          
          style={{
              top: y,
              left: x
          }}

      ></div>
  )
}

export default Pointer
