import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildStaticMetadata } from '@/lib/metadata/builders';
import { getPageBySlug } from '@/lib/metadata';
import { buildProjectPageSchema, renderJsonLd } from '@/lib/metadata/schema';

const PAGE_KEY = 'home-photobook';

export const metadata: Metadata = buildStaticMetadata(PAGE_KEY);

export default function HomePhotobookLayout({ children }: { children: ReactNode }) {
  const pageData = getPageBySlug(PAGE_KEY);

  return (
    <>
      {pageData && renderJsonLd(buildProjectPageSchema(pageData))}
      {children}
    </>
  );
}
