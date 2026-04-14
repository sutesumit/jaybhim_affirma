// ─── Site Constants ───────────────────────────────────────────────────────────

export const SITE_URL = 'https://art.sumitsute.com';
export const SITE_NAME = 'art.sumitsute';
export const SITE_AUTHOR = 'Sumit Sute';
export const SITE_DESCRIPTION =
  'Lens-based visual art portfolio of Sumit Sute — documentary photography, personal visual diaries, and digital explorations of caste, family, and identity.';
export const SITE_OG_DESCRIPTION =
  'Art portfolio of Sumit Sute — documentary photography, visual diaries, and explorations of caste, family, and identity in rural and urban India.';
export const DEFAULT_OG_IMAGE = '/thumbnails/metaimage.jpg';
export const DEFAULT_TWITTER_CARD = 'summary_large_image' as const;
export const SITE_LOCALE = 'en_US';
export const SITE_ALTERNATE_LOCALE = 'mr';

// ─── Sitemap Configuration ─────────────────────────────────────────────────

export const STATIC_SITEMAP_LAST_MODIFIED = '2026-04-13T00:00:00.000Z';
export const SITEMAP_REVALIDATE_SECONDS = 86400; // 24 hours

// ─── Home Page Metadata (not in pages-registry) ──────────────────────────────

export const HOME_PAGE_META = {
  path: '/',
  title: 'art.sumitsute',
  description:
    'Lens-based visual art portfolio of Sumit Sute — documentary photography, personal visual diaries, and digital explorations of caste, family, and identity.',
  ogTitle: 'art.sumitsute | Sumit Sute',
  ogDescription:
    'Art portfolio of Sumit Sute — documentary photography, visual diaries, and explorations of caste, family, and identity.',
  ogType: 'website' as const,
  schemaKind: 'WebPage' as const,
  ogImage: '/thumbnails/metaimage.jpg',
  sitemapPriority: 1.0,
};

// ─── SEO Defaults ────────────────────────────────────────────────────────────

const SEO_DEFAULTS = {
  ogType: 'website' as const,
  schemaKind: 'WebPage' as const,
  sitemapPriority: 0.7,
};

// ─── SEO Overrides (only non-default fields) ────────────────────────────────

type SeoOverride = Partial<{
  ogType: 'website' | 'article' | 'profile';
  schemaKind: 'WebPage' | 'ProfilePage' | 'CollectionPage';
  sitemapPriority: number;
}>;

export const seoOverrides: Record<string, SeoOverride> = {
  'documentary-portfolio': {
    schemaKind: 'CollectionPage',
    sitemapPriority: 0.8,
  },
  'fathers-and-figures': {
    sitemapPriority: 0.8,
  },
  'at-home-elsewhere': {
    sitemapPriority: 0.5,
  },
  lunchboxes: {
    schemaKind: 'CollectionPage',
  },
  'marathi-short-stories': {
    schemaKind: 'CollectionPage',
  },
  'artist-statement': {
    ogType: 'profile',
    schemaKind: 'ProfilePage',
    sitemapPriority: 0.6,
  },
  'notes-on-atrocity-cases': {
    ogType: 'article',
  },
};

// ─── Builder: Merge registry data + SEO overrides ────────────────────────────

import { pagesRegistry } from '@/data/pages-registry';

export type StaticPageMeta = {
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogType: 'website' | 'article' | 'profile';
  schemaKind: 'WebPage' | 'ProfilePage' | 'CollectionPage';
  ogImage: string;
  sitemapPriority: number;
};

export function getProjectSeoMeta(key: string): StaticPageMeta | null {
  const page = pagesRegistry[key];
  if (!page) return null;

  const override = seoOverrides[key];

  return {
    path: page.slug,
    title: page.title,
    description: page.shortDescription,
    ogTitle: `${page.title} | ${SITE_NAME}`,
    ogType: override?.ogType ?? SEO_DEFAULTS.ogType,
    schemaKind: override?.schemaKind ?? SEO_DEFAULTS.schemaKind,
    ogImage: page.thumbnail,
    sitemapPriority: override?.sitemapPriority ?? SEO_DEFAULTS.sitemapPriority,
  };
}

export function getAllProjectKeys(): string[] {
  return Object.keys(pagesRegistry);
}
