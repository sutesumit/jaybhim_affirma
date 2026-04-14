import type { Metadata } from 'next';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_CARD,
  SITE_NAME,
  SITE_URL,
  HOME_PAGE_META,
  getProjectSeoMeta,
  type StaticPageMeta,
} from '@/config/metadata';


// ─── URL Helpers ─────────────────────────────────────────────────────────────

export function buildCanonicalUrl(path: string): string {
  if (path === '/') return SITE_URL;
  return `${SITE_URL}${path}`;
}

// ─── Static Page Metadata ────────────────────────────────────────────────────

/**
 * Returns a complete Next.js Metadata object for a registered static page.
 * Used by layout.tsx files and the home page.
 */
export function buildStaticMetadata(page: StaticPageKey): Metadata {
  const entry = getEntryForKey(page);
  if (!entry) {
    return {
      title: SITE_NAME,
      description: 'Art portfolio of Sumit Sute.',
    };
  }

  const canonical = buildCanonicalUrl(entry.path);
  const image = entry.ogImage
    ? buildCanonicalUrl(entry.ogImage)
    : buildCanonicalUrl(DEFAULT_OG_IMAGE);

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical,
      languages: {
        'en': canonical,
        'mr': canonical,
      },
    },
    openGraph: {
      title: entry.ogTitle,
      description: entry.description,
      url: canonical,
      siteName: SITE_NAME,
      type: entry.ogType,
      locale: 'en_US',
      images: [{ url: image, alt: entry.ogTitle }],
    },
    twitter: {
      card: DEFAULT_TWITTER_CARD,
      title: entry.ogTitle,
      description: entry.description,
      images: [image],
    },
  };
}

// ─── Project Page Metadata (dynamic lookup from registry) ────────────────────

/**
 * Returns a complete Next.js Metadata object for a project page,
 * looking up the page data from the pages-registry by slug key.
 * Used by layout.tsx files in (pages)/[slug]/ directories.
 */
export function buildProjectMetadata(pageKey: string): Metadata {
  const entry = getProjectSeoMeta(pageKey);
  if (!entry) {
    return {
      title: SITE_NAME,
      description: 'Art portfolio of Sumit Sute.',
    };
  }

  const canonical = buildCanonicalUrl(entry.path);
  const image = entry.ogImage
    ? buildCanonicalUrl(entry.ogImage)
    : buildCanonicalUrl(DEFAULT_OG_IMAGE);

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical,
      languages: {
        'en': canonical,
        'mr': canonical,
      },
    },
    openGraph: {
      title: entry.ogTitle,
      description: entry.description,
      url: canonical,
      siteName: SITE_NAME,
      type: entry.ogType,
      locale: 'en_US',
      images: [{ url: image, alt: entry.ogTitle }],
    },
    twitter: {
      card: DEFAULT_TWITTER_CARD,
      title: entry.ogTitle,
      description: entry.description,
      images: [image],
    },
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

type StaticPageKey = 'home' | string;

function getEntryForKey(key: string): StaticPageMeta | null {
  if (key === 'home') {
    return HOME_PAGE_META;
  }
  return getProjectSeoMeta(key);
}
