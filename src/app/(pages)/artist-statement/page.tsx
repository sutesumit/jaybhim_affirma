'use client'
import AllSections from '@/app/my_components/specific/AllSections';
import Link from 'next/link';
import React, { useEffect } from 'react';


export default function Home() {

  return (
    <div className='flex flex-1 pt-16 h-full items-center justify-center'>
        <AllSections />
    </div>
  );
}