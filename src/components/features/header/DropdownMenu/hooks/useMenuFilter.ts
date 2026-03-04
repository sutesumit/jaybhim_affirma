import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

export interface MenuItem {
    id: number;
    title: string;
    description: string;
    href: string;
    image: string;
    searchContent?: string; // Optional field for deep content search
}

export const useMenuFilter = (items: MenuItem[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const fuse = useMemo(() => {
        return new Fuse(items, {
            keys: [
                { name: 'title', weight: 1.0 },
                { name: 'description', weight: 0.6 },
                { name: 'searchContent', weight: 0.4 }
            ],
            threshold: 0.35, // Sensitivity: lower is more strict
            ignoreLocation: true,
            minMatchCharLength: 2,
            distance: 100,
        });
    }, [items]);

    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return items;
        
        return fuse.search(searchTerm).map(result => result.item);
    }, [items, searchTerm, fuse]);

    return {
        searchTerm,
        setSearchTerm,
        filteredItems,
        clearSearch: () => setSearchTerm(''),
    };
};
