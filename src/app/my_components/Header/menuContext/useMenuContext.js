
import { useContext } from 'react'
import { MenuContextProvider } from '@/app/my_components/Header/menuContext/MenuContextProvider';

export const useMenuContext = () => {
    const context = useContext(MenuContextProvider);
    if (!context) {
        throw new Error('useMenuContext must be used within a MenuContextProvider');
    }
    return context;
}