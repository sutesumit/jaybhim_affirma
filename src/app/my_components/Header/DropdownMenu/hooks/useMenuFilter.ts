import { useState, useMemo } from 'react';

export interface MenuItem {
    id: number;
    title: string;
    description: string;
    href: string;
    image: string;
}

export const useMenuFilter = (items: MenuItem[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => {
        if (!searchTerm) return items;
        
        const lowerSearch = searchTerm.toLowerCase();
        return items.filter((item) =>
            item.title.toLowerCase().includes(lowerSearch) ||
            item.description.toLowerCase().includes(lowerSearch)
        );
    }, [items, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredItems,
        clearSearch: () => setSearchTerm(''),
    };
};
