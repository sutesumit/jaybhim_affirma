import { useNavMenu } from '@/app/my_components/common/layout/context/NavMenu/useNavMenu';
import { AnimatePresence } from 'framer-motion';
import MenuCardsGrid from '../DropdownMenu/MenuCardsGrid';
import MenuItems from './MenuItems';

const MenuBarWrapper: React.FC = () => {
    const { isMenuOpen, setMenuOpen } = useNavMenu();    
    
  return (
    <nav
        className="navbar fixed isolate top-0 z-20 w-full"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
    >
        
        <MenuItems  />
        <AnimatePresence>
            {isMenuOpen &&
                <MenuCardsGrid />
            }
        </AnimatePresence>
    </nav>
  )
}

export default MenuBarWrapper