
import { useContext } from 'react'
import { NavMenuContext } from './NavMenuContext';

export const useNavMenu = () => {
    const context = useContext(NavMenuContext);
    if (!context) {
        throw new Error('useNavMenu must be used within a NavMenuProvider');
    }
    return context;
}