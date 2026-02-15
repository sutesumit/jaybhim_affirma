'use client'

import React from 'react';
import { Leaf, ChevronRight } from 'lucide-react';

interface AcknowledgementSectionProps {
    names: string[];
}

const AcknowledgementSection: React.FC<AcknowledgementSectionProps> = ({ names }) => {
    return (
        <section className="w-full max-w-2xl mx-auto m-2">
            <div className="flex md:flex-row flex-col text-[var(--primary-blue)] rounded-sm font-rajdhani card-inner-shadow py-2">
                <div className="w-full gradient-button md:w-auto capitalize text-center rounded-sm text-left px-2 card-shadow flex items-center justify-center">
                    <Leaf className="w-3 h-3 inline mr-1" />Made possible with support from <ChevronRight className="w-3 h-3 inline ml-1" />
                </div>
                <div className="overflow-hidden p-1 flex-1 min-w-0">
                    <div className="marquee-track cursor-default flex flex-row gap-1 w-max px-2">
                        {/* First copy */}
                        {names.map((name, index) => (
                            <div key={`a-${index}`} className="whitespace-nowrap flex items-center card-shadow rounded-sm bg-[var(--primary-white)] text-[var(--primary-blue)] px-1">
                                {name}
                            </div>
                        ))}
                        {/* Second Duplicate for seamless loop */}
                        {names.map((name, index) => (
                            <div key={`b-${index}`} className="whitespace-nowrap flex items-center card-shadow rounded-sm bg-[var(--primary-white)] text-[var(--primary-blue)] px-1">
                                {name}
                            </div>
                        ))}
                        {/* Third Duplicate for seamless loop */}
                        {names.map((name, index) => (
                            <div key={`c-${index}`} className="whitespace-nowrap flex items-center card-shadow rounded-sm bg-[var(--primary-white)] text-[var(--primary-blue)] px-1">
                                {name}
                            </div>
                        ))}
                        {/* Fourth Duplicate for seamless loop */}
                        {names.map((name, index) => (
                            <div key={`d-${index}`} className="whitespace-nowrap flex items-center card-shadow rounded-sm bg-[var(--primary-white)] text-[var(--primary-blue)] px-1">
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcknowledgementSection;
