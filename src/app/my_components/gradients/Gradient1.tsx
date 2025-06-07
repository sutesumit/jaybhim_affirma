import React from 'react'
import { cn } from '@/lib/utils'

type GradientProps = {
  hoverOn?: boolean,
} & React.HTMLAttributes<HTMLDivElement>

const Gradient1: React.FC<GradientProps> = ({ children, className, hoverOn = false }) => {
  
  const [isHovered, setIsHovered] = React.useState(hoverOn)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className={cn('gradient-wrapper overflow-clip rounded-sm group flex flex-col relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
    >
      <div 
        className={cn(`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`)}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-100 to-blue-200'>
        </div>
      </div>
      { children }
    </div>
  )
}

export default Gradient1
