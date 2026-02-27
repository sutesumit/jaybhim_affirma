"use client"

import React from 'react'
import { Search } from 'lucide-react';
import Gradient1 from '@/app/my_components/gradients/Gradient1';

interface EmptyStateProps {
    searchTerm: string;
    onClear: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, onClear }) => {
    return (
        <div className="flex-grow flex flex-col">
            <Gradient1 
                hoverOn={true} 
                className="relative group glass-hover card-border rounded-sm flex-grow flex flex-col overflow-hidden"
            >
                <div className="flex flex-grow relative z-10 flex-col items-center justify-center p-5 text-[var(--primary-blue)] space-y-3">
                    <div className="p-4 rounded-full">
                        <Search className="h-6 w-6" />
                    </div>
                    
                    <div className="text-center">
                        <p className="text-md font-rajdhani uppercase tracking-wider"><span className="font-bold italic">{searchTerm}</span> hasn't made any debut yet. No matches.</p>
                    </div>

                    <button 
                        onClick={onClear}
                        className="text-sm button-style w-fit px-8 py-2"
                    >
                        Clear search
                    </button>
                </div>
            </Gradient1>
        </div>
    )
}

export default EmptyState;
