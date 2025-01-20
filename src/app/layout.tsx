import { Lora, Merriweather, Vesper_Libre } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';
import Footer from './my_components/Footer';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

const vesper_libre = Vesper_Libre({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vesper_libre',
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Sumit Sute for AFFIRMA',
  description: 'AFFIRMA Application',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${lora.variable} ${merriweather.variable} ${vesper_libre.variable}`}>
      <body className="min-h-screen">
        {children}
        <Footer />
      </body>
      
    </html>
  );
}