import { Lora, Merriweather, Vesper_Libre, Rajdhani, Reenie_Beanie } from 'next/font/google';
import type { Metadata } from 'next';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_DESCRIPTION,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from '@/config/metadata';
import { buildWebsiteSchema, buildPersonSchema, renderJsonLd } from '@/lib/metadata/schema';
import React from 'react';
import { Footer } from '@/components/features/footer';
import './globals.css';
import { Header } from '@/components/features/header';
import { AuthProvider } from '@/auth/AuthContext';
import { NavMenuProvider } from '@/components/features/header/menuContext/MenuContextProvider';
import { NotFoundProvider } from './context/NotFoundContext';
import { NavigationProgressBar } from '@/components/features/shared';
import { AnalyticsTracker } from '@/components/features/analytics';


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
  title: {
    default: 'art.sumitsute',
    template: '%s | art.sumitsute',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Sumit Sute',
    'art portfolio',
    'documentary photography',
    'visual art',
    'caste',
    'family',
    'identity',
    'dalit',
    'India',
    'Marathi',
    'photography',
    'lens-based art',
    'contemporary art',
  ],
  authors: [{ name: 'Sumit Sute', url: SITE_URL }],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'mr': SITE_URL,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_OG_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_OG_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${lora.variable} ${merriweather.variable} ${vesper_libre.variable} ${rajdhani.variable} ${reenieBeanie.variable}`}>
      <head>
        {renderJsonLd(buildWebsiteSchema())}
        {renderJsonLd(buildPersonSchema())}
      </head>
      <NotFoundProvider>
        <AuthProvider>
          <NavMenuProvider>
            <body className="min-h-screen flex flex-col justify-between">
              <NavigationProgressBar />
              <AnalyticsTracker />
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