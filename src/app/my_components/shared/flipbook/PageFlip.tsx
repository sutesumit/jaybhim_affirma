// PageFlip.tsx
"use client"
import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import EventEmitter from 'events';

// Create event emitter instance outside component to avoid recreation
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(20);

const pages = [
  "/lunchbox_pages/Lunchboxe_Page_0.webp",
  "/lunchbox_pages/Lunchboxe_Page_1.webp",
  "/lunchbox_pages/Lunchboxe_Page_2.webp",
  "/lunchbox_pages/Lunchboxe_Page_3.webp",
  "/lunchbox_pages/Lunchboxe_Page_4.webp",
  "/lunchbox_pages/Lunchboxe_Page_5.webp",
  "/lunchbox_pages/Lunchboxe_Page_6.webp",
  "/lunchbox_pages/Lunchboxe_Page_7.webp",
  "/lunchbox_pages/Lunchboxe_Page_8.webp",
  "/lunchbox_pages/Lunchboxe_Page_9.webp",
  "/lunchbox_pages/Lunchboxe_Page_10.webp",
  "/lunchbox_pages/Lunchboxe_Page_11.webp",
  "/lunchbox_pages/Lunchboxe_Page_12.webp",
  "/lunchbox_pages/Lunchboxe_Page_13.webp",
  "/lunchbox_pages/Lunchboxe_Page_14.webp",
  "/lunchbox_pages/Lunchboxe_Page_15.webp",
  "/lunchbox_pages/Lunchboxe_Page_16.webp",
  "/lunchbox_pages/Lunchboxe_Page_17.webp",
  "/lunchbox_pages/Lunchboxe_Page_18.webp",
  "/lunchbox_pages/Lunchboxe_Page_19.webp",
  "/lunchbox_pages/Lunchboxe_Page_20.webp",
  "/lunchbox_pages/Lunchboxe_Page_21.webp",
  "/lunchbox_pages/Lunchboxe_Page_22.webp",
  "/lunchbox_pages/Lunchboxe_Page_23.webp",
  "/lunchbox_pages/Lunchboxe_Page_24.webp",
  "/lunchbox_pages/Lunchboxe_Page_25.webp",
  "/lunchbox_pages/Lunchboxe_Page_26.webp",
  "/lunchbox_pages/Lunchboxe_Page_27.webp",
  "/lunchbox_pages/Lunchboxe_Page_28.webp",
  "/lunchbox_pages/Lunchboxe_Page_29.webp",
  "/lunchbox_pages/Lunchboxe_Page_30.webp",
  "/lunchbox_pages/Lunchboxe_Page_31.webp",
  "/lunchbox_pages/Lunchboxe_Page_32.webp",
  "/lunchbox_pages/Lunchboxe_Page_33.webp",
  "/lunchbox_pages/Lunchboxe_Page_34.webp",
  "/lunchbox_pages/Lunchboxe_Page_35.webp",
  "/lunchbox_pages/Lunchboxe_Page_36.webp",
  "/lunchbox_pages/Lunchboxe_Page_37.webp",
  "/lunchbox_pages/Lunchboxe_Page_38.webp",
  "/lunchbox_pages/Lunchboxe_Page_39.webp",
  "/lunchbox_pages/Lunchboxe_Page_40.webp",
  "/lunchbox_pages/Lunchboxe_Page_41.webp",
  "/lunchbox_pages/Lunchboxe_Page_42.webp",
  "/lunchbox_pages/Lunchboxe_Page_43.webp",
  "/lunchbox_pages/Lunchboxe_Page_44.webp",
  "/lunchbox_pages/Lunchboxe_Page_45.webp",
  "/lunchbox_pages/Lunchboxe_Page_46.webp",
  "/lunchbox_pages/Lunchboxe_Page_47.webp",
  "/lunchbox_pages/Lunchboxe_Page_48.webp",
  "/lunchbox_pages/Lunchboxe_Page_49.webp",
  "/lunchbox_pages/Lunchboxe_Page_50.webp",
  "/lunchbox_pages/Lunchboxe_Page_51.webp",
  "/lunchbox_pages/Lunchboxe_Page_52.webp",
  "/lunchbox_pages/Lunchboxe_Page_53.webp",
  "/lunchbox_pages/Lunchboxe_Page_54.webp",
  "/lunchbox_pages/Lunchboxe_Page_55.webp",
  "/lunchbox_pages/Lunchboxe_Page_56.webp",
  "/lunchbox_pages/Lunchboxe_Page_57.webp",
  "/lunchbox_pages/Lunchboxe_Page_58.webp",
  "/lunchbox_pages/Lunchboxe_Page_59.webp",
  "/lunchbox_pages/Lunchboxe_Page_60.webp",
  "/lunchbox_pages/Lunchboxe_Page_61.webp",
  "/lunchbox_pages/Lunchboxe_Page_62.webp",
  "/lunchbox_pages/Lunchboxe_Page_63.webp",
  "/lunchbox_pages/Lunchboxe_Page_64.webp",
  "/lunchbox_pages/Lunchboxe_Page_65.webp",
  "/lunchbox_pages/Lunchboxe_Page_66.webp",
  "/lunchbox_pages/Lunchboxe_Page_67.webp",
  "/lunchbox_pages/Lunchboxe_Page_68.webp",
];

const PageFlip = () => {
  const bookRef = useRef(null);

  // Clean up event listeners when component unmounts
  useEffect(() => {
    return () => {
      // Remove all listeners when component unmounts
      myEmitter.removeAllListeners();
    };
  }, []);

  return (
    // @ts-ignore
    <HTMLFlipBook
      startPage={0}
      width={300}
      height={500}
      drawShadow={true}
      startZIndex={0}
    //   size='stretch'
    >
      {pages.map((page, index) => (
        <div className="demoPage shadow-[--primary-blue] shadow-sm rounded-sm overflow-hidden" key={index}>
          <Image src={page} alt={`Page ${index}`} width={300} height={400} style={{ height: '100%' , width: '100%'}} priority={index < 4} />
        </div>
      ))}
    </HTMLFlipBook>
  );
};

export default PageFlip;
