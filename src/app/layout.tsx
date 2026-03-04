import { Lora, Merriweather, Vesper_Libre, Rajdhani, Reenie_Beanie } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';
import { Footer } from '@/components/features/footer';
import './globals.css';
import { Header } from '@/components/features/header';
import { AuthProvider } from '@/auth/AuthContext';
import { NavMenuProvider } from '@/components/features/header/menuContext/MenuContextProvider';
import { NotFoundProvider } from './context/NotFoundContext';
import { NavigationProgressBar } from '@/components/features/shared';


import { Toaster } from '@/components/ui/toaster';


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
      <NotFoundProvider>
        <AuthProvider>
          <NavMenuProvider>
            <body className="min-h-screen flex flex-col justify-between">
              <NavigationProgressBar />
              <Header />
              <div className="flex-1 flex flex-col items-center">
                {children}
              </div>
              <Footer />
              <Toaster />
            </body>
          </NavMenuProvider>
        </AuthProvider>
      </NotFoundProvider>
    </html>
  );

}