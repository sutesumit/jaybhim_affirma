import React from 'react'
import SiteIdentityLinks from './SiteIdentityLinks';
import MenuToggleControl from './MenuToggleControl';
import PageNavigationStatus from './PageNavigationStatus';

interface NavigationLinksProps {
    pathName: string | null,
    tabName: string | undefined
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({pathName, tabName}) => {
  return (
    <>
        <SiteIdentityLinks />
        <MenuToggleControl />
        <PageNavigationStatus pathName={pathName} tabName={tabName} />
    </>
  )
}

export default NavigationLinks
