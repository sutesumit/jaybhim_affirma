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
  "/lunchbox_pages/Lunchboxe_Page_0.jpg",
  "/lunchbox_pages/Lunchboxe_Page_1.jpg",
  "/lunchbox_pages/Lunchboxe_Page_2.jpg",
  "/lunchbox_pages/Lunchboxe_Page_3.jpg",
  "/lunchbox_pages/Lunchboxe_Page_4.jpg",
  "/lunchbox_pages/Lunchboxe_Page_5.jpg",
  "/lunchbox_pages/Lunchboxe_Page_6.jpg",
  "/lunchbox_pages/Lunchboxe_Page_7.jpg",
  "/lunchbox_pages/Lunchboxe_Page_8.jpg",
  "/lunchbox_pages/Lunchboxe_Page_9.jpg",
  "/lunchbox_pages/Lunchboxe_Page_10.jpg",
  "/lunchbox_pages/Lunchboxe_Page_11.jpg",
  "/lunchbox_pages/Lunchboxe_Page_12.jpg",
  "/lunchbox_pages/Lunchboxe_Page_13.jpg",
  "/lunchbox_pages/Lunchboxe_Page_14.jpg",
  "/lunchbox_pages/Lunchboxe_Page_15.jpg",
  "/lunchbox_pages/Lunchboxe_Page_16.jpg",
  "/lunchbox_pages/Lunchboxe_Page_17.jpg",
  "/lunchbox_pages/Lunchboxe_Page_18.jpg",
  "/lunchbox_pages/Lunchboxe_Page_19.jpg",
  "/lunchbox_pages/Lunchboxe_Page_20.jpg",
  "/lunchbox_pages/Lunchboxe_Page_21.jpg",
  "/lunchbox_pages/Lunchboxe_Page_22.jpg",
  "/lunchbox_pages/Lunchboxe_Page_23.jpg",
  "/lunchbox_pages/Lunchboxe_Page_24.jpg",
  "/lunchbox_pages/Lunchboxe_Page_25.jpg",
  "/lunchbox_pages/Lunchboxe_Page_26.jpg",
  "/lunchbox_pages/Lunchboxe_Page_27.jpg",
  "/lunchbox_pages/Lunchboxe_Page_28.jpg",
  "/lunchbox_pages/Lunchboxe_Page_29.jpg",
  "/lunchbox_pages/Lunchboxe_Page_30.jpg",
  "/lunchbox_pages/Lunchboxe_Page_31.jpg",
  "/lunchbox_pages/Lunchboxe_Page_32.jpg",
  "/lunchbox_pages/Lunchboxe_Page_33.jpg",
  "/lunchbox_pages/Lunchboxe_Page_34.jpg",
  "/lunchbox_pages/Lunchboxe_Page_35.jpg",
  "/lunchbox_pages/Lunchboxe_Page_36.jpg",
  "/lunchbox_pages/Lunchboxe_Page_37.jpg",
  "/lunchbox_pages/Lunchboxe_Page_38.jpg",
  "/lunchbox_pages/Lunchboxe_Page_39.jpg",
  "/lunchbox_pages/Lunchboxe_Page_40.jpg",
  "/lunchbox_pages/Lunchboxe_Page_41.jpg",
  "/lunchbox_pages/Lunchboxe_Page_42.jpg",
  "/lunchbox_pages/Lunchboxe_Page_43.jpg",
  "/lunchbox_pages/Lunchboxe_Page_44.jpg",
  "/lunchbox_pages/Lunchboxe_Page_45.jpg",
  "/lunchbox_pages/Lunchboxe_Page_46.jpg",
  "/lunchbox_pages/Lunchboxe_Page_47.jpg",
  "/lunchbox_pages/Lunchboxe_Page_48.jpg",
  "/lunchbox_pages/Lunchboxe_Page_49.jpg",
  "/lunchbox_pages/Lunchboxe_Page_50.jpg",
  "/lunchbox_pages/Lunchboxe_Page_51.jpg",
  "/lunchbox_pages/Lunchboxe_Page_52.jpg",
  "/lunchbox_pages/Lunchboxe_Page_53.jpg",
  "/lunchbox_pages/Lunchboxe_Page_54.jpg",
  "/lunchbox_pages/Lunchboxe_Page_55.jpg",
  "/lunchbox_pages/Lunchboxe_Page_56.jpg",
  "/lunchbox_pages/Lunchboxe_Page_57.jpg",
  "/lunchbox_pages/Lunchboxe_Page_58.jpg",
  "/lunchbox_pages/Lunchboxe_Page_59.jpg",
  "/lunchbox_pages/Lunchboxe_Page_60.jpg",
  "/lunchbox_pages/Lunchboxe_Page_61.jpg",
  "/lunchbox_pages/Lunchboxe_Page_62.jpg",
  "/lunchbox_pages/Lunchboxe_Page_63.jpg",
  "/lunchbox_pages/Lunchboxe_Page_64.jpg",
  "/lunchbox_pages/Lunchboxe_Page_65.jpg",
  "/lunchbox_pages/Lunchboxe_Page_66.jpg",
  "/lunchbox_pages/Lunchboxe_Page_67.jpg",
  "/lunchbox_pages/Lunchboxe_Page_68.jpg",
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

  const onFlip = (e: any) => {
    console.log('Current page: ' + e.data);
  };

  return (
    // @ts-ignore
    <HTMLFlipBook
      startPage={0}
      width={300}
      height={500}
      drawShadow={true}
      startZIndex={0}
      onFlip={onFlip}
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
