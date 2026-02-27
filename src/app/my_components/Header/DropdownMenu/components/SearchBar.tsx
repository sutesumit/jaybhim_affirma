"use client"

import React from 'react'
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Gradient1 from '../../../gradients/Gradient1';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onClear }) => {
    return (
        <div className="sticky top-0 mt-0.5 mb-1 z-30 card-border glass-hover rounded-sm">
            <Gradient1 hoverOn={true} className="relative group p-0">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--primary-blue)] opacity-50 group-focus-within:opacity-100 transition-opacity z-10" />
                <Input
                    placeholder="Search works and projects"
                    className="pl-10 pr-10 border-none bg-transparent focus-visible:ring-0 font-bold text-[var(--primary-blue)] font-rajdhani placeholder:text-[var(--primary-blue)] placeholder:opacity-50 relative z-10 h-10 w-full"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchTerm && (
                    <button 
                        onClick={onClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 button-style w-fit transition-colors z-20"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </Gradient1>
        </div>
    )
}

export default SearchBar;
