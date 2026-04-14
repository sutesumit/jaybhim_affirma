import type { ReactElement } from 'react';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/metadata';
import { buildCanonicalUrl } from '@/lib/metadata/builders';
import type { PageMetadata } from '@/types/pages';

type JsonLdValue = Record<string, unknown>;

// ─── Renderer ────────────────────────────────────────────────────────────────

export function renderJsonLd(data: JsonLdValue): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Global Schemas (rendered in root layout <head>) ─────────────────────────

export function buildWebsiteSchema(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'mr'],
  };
}

export function buildPersonSchema(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR,
    url: SITE_URL,
    jobTitle: 'Visual Artist & Documentary Photographer',
    knowsAbout: [
      'Documentary Photography',
      'Visual Art',
      'Caste Studies',
      'Family & Identity',
      'Dalit Literature',
    ],
    sameAs: ['https://www.sumitsute.com/'],
  };
}

// ─── Home Page Schema ────────────────────────────────────────────────────────

/**
 * Builds a WebPage JSON-LD schema for the home page.
 * Separate from buildProjectPageSchema because the home page
 * is not in the pages-registry.
 */
export function buildHomeSchema(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Person',
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
  };
}

// ─── Project Page Schema ─────────────────────────────────────────────────────

/**
 * Builds a WebPage JSON-LD schema for a project page.
 * Call this in each project page's layout.tsx and render with renderJsonLd().
 */
export function buildProjectPageSchema(page: PageMetadata): JsonLdValue {
  const url = buildCanonicalUrl(page.slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.shortDescription,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Person',
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    ...(page.thumbnail && { image: buildCanonicalUrl(page.thumbnail) }),
  };
}
