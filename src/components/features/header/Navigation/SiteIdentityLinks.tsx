import React from 'react';
import { House, ExternalLink } from 'lucide-react';
import HoverLink from './HoverLink';

const SiteIdentityLinks: React.FC = () => {
    return (
        <span className='col-span-1 text-left hidden md:inline-block'>
            <span className='site-tab px-3'>
                <HoverLink 
                    href='/' 
                    className='rootsite-tab pl-3'
                    hoverContent={<House className='w-4 h-4 m-1' />}
                >
                    {'art.'}
                </HoverLink>
                <HoverLink 
                    target='_blank' 
                    href='https://www.sumitsute.com/' 
                    className='rootsite-tab pr-3'
                    hoverContent={<><ExternalLink className='w-4 h-4 m-1' /><span className='ml-2'>sumitsute.com</span></>}
                >
                    {'sumitsute.com'}
                </HoverLink>
            </span>
        </span>
    );
};

export default SiteIdentityLinks;
