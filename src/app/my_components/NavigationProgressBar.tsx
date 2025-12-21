'use client';

import NextTopLoader from 'nextjs-toploader';

const NavigationProgressBar = () => {
  return (
    <NextTopLoader
      color="#8B5CF6"
      initialPosition={0.08}
      crawlSpeed={200}
      height={4}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #8B5CF6, 0 0 5px #D946EF"
    />
  );
};

export default NavigationProgressBar;
