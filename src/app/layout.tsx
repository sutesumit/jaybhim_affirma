import { Lora, Merriweather, Vesper_Libre, Rajdhani, Reenie_Beanie } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';
import Footer from './my_components/Footer/Footer';
import './globals.css';
import { Header } from './my_components/Header/';


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

const rajdhani = Rajdhani({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rajdhani',
  weight: ['400', '500', '600', '700'],
});

const reenieBeanie = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-reenie-beanie',
  display: "swap",
});

export const metadata: Metadata = {
  title: 'art.sumitsute',
  description: 'Art and Web Portfolio of Sumit Sute',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${lora.variable} ${merriweather.variable} ${vesper_libre.variable} ${rajdhani.variable} ${reenieBeanie.variable}`}>
      <body className="min-h-screen">
        <Header /> 
        {children}
        <Footer />
      </body>
    </html>
  );

}