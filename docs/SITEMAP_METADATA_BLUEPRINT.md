# Sitemap & Engineered Metadata System Blueprint

A reference architecture blueprint for implementing a comprehensive SEO metadata system with sitemap, JSON-LD structured data, dynamic OG images, and RSS feed.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Centralised Configuration](#2-centralised-configuration)
3. [HTML Metadata Builders](#3-html-metadata-builders)
4. [Root Layout Metadata](#4-root-layout-metadata)
5. [JSON-LD Structured Data](#5-json-ld-structured-data)
6. [Dynamic OG Image Generation](#6-dynamic-og-image-generation)
7. [XML Sitemap](#7-xml-sitemap)
8. [RSS Feed](#8-rss-feed)
9. [Content-Type-Specific Patterns](#9-content-type-specific-patterns)
10. [Implementation Checklist](#10-implementation-checklist)
11. [Key Design Decisions](#11-key-design-decisions)
12. [Cross-Cutting Concerns](#12-cross-cutting-concerns)

---

## 1. Architecture Overview

### 1.1 High-Level Data Flow

```
src/config/metadata.ts          ← [CUSTOMIZE] Single source of truth
        │
        ├── builders.ts         ← HTML <meta> / OpenGraph / Twitter
        ├── schema.tsx          ← JSON-LD structured data (Schema.org)
        ├── og-image.tsx        ← Dynamic OG image generation
        │
        ├── app/sitemap.xml/    ← XML sitemap route
        ├── app/feed.xml/       ← RSS feed route
        └── app/og/             ← OG image route handlers
```

### 1.2 Core Principle

**Single source of truth**: One config file drives all metadata, sitemap entries, schema types, and OG image content. This avoids duplication and drift.

**Prompt**: What are your site's core constants? Define:
- `SITE_URL` — e.g., `https://yoursite.com`
- `SITE_NAME` — e.g., `Your Name`
- `SITE_AUTHOR` — e.g., `Your Name`
- `SITE_DESCRIPTION` — 1-2 sentence description of your site
- `SITE_OG_DESCRIPTION` — separate description for social sharing cards

---

## 2. Centralised Configuration

### 2.1 File: `src/config/metadata.ts`

```typescript
// [CUSTOMIZE] Site-level constants
export const SITE_URL = 'https://yoursite.com';
export const SITE_NAME = "Your Site Name";
export const SITE_AUTHOR = "Your Name";
export const SITE_DESCRIPTION = "Your site description - what you write about, who it's for.";
export const SITE_OG_DESCRIPTION = "Your OG description - what shows on social cards.";
export const DEFAULT_OG_IMAGE = '/your-default-og-image.jpg';
export const DEFAULT_TWITTER_CARD = 'summary_large_image' as const;

// [CUSTOMIZE] Sitemap last modified timestamps
export const STATIC_SITEMAP_LAST_MODIFIED = '2026-01-01T00:00:00.000Z';
export const PROJECTS_SITEMAP_LAST_MODIFIED = '2026-01-01T00:00:00.000Z';

// [CUSTOMIZE] Schema.org types for each page type
export type StaticSchemaKind =
  | 'WebPage'
  | 'ProfilePage'
  | 'ItemList'
  | 'Blog'
  | 'CollectionPage'
  | 'DefinedTermSet';

// [CUSTOMIZE] Your static page keys
export type StaticPageKey = 'home' | 'about' | 'work' | 'blog' | 'notes' | 'glossary';

// [CUSTOMIZE] Static page metadata registry
export const staticPageMetadata = {
  home: {
    path: '/',
    title: 'your name',
    description: "Your home page description.",
    ogTitle: 'Your Name | Your Title',
    ogDescription: 'Your OG home description.',
    ogType: 'website' as const,
    schemaKind: 'WebPage' as const,
    imagePolicy: 'generated' as const,
    generatedImagePath: '/og/static/home',
    ogGeneration: 'static' as const,
  },
  about: {
    path: '/about',
    title: 'about',
    description: "Your about page description.",
    ogTitle: 'About | Your Name',
    ogDescription: 'Your OG about description.',
    ogType: 'profile' as const,
    schemaKind: 'ProfilePage' as const,
    imagePolicy: 'generated' as const,
    generatedImagePath: '/og/static/about',
    ogGeneration: 'static' as const,
  },
  // [CUSTOMIZE] Add your other static pages
  work: {
    path: '/work',
    title: 'work',
    description: "Your work/projects page description.",
    ogTitle: 'Work | Your Name',
    ogDescription: 'Your OG work description.',
    ogType: 'website' as const,
    schemaKind: 'ItemList' as const,
    imagePolicy: 'generated' as const,
    generatedImagePath: '/og/static/work',
    ogGeneration: 'static' as const,
  },
  // ...
} as const satisfies Record<
  StaticPageKey,
  {
    path: string;
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogType: 'website' | 'article' | 'profile';
    schemaKind: StaticSchemaKind;
    imagePolicy: 'generated' | 'none';
    generatedImagePath?: string;
    ogGeneration: 'static';
  }
>;
```

### 2.2 Key Patterns

- Use `as const satisfies Record<StaticPageKey, ...>` for both literal type inference and structural validation
- `schemaKind` maps to JSON-LD `@type`
- `imagePolicy: 'generated'` declares that OG images are dynamically generated; `buildStaticMetadata` resolves the full URL

**Prompt**: List your static pages and their Schema.org types:
| Page | Path | Schema.org Type |
|------|------|-------------|
| Home | `/` | WebPage |
| About | `/about` | ProfilePage |
| Work/Projects | `/work` | ItemList |
| Blog | `/blog` | Blog |
| Notes | `/notes` | CollectionPage |
| Glossary | `/glossary` | DefinedTermSet |

---

## 3. HTML Metadata Builders

### 3.1 File: `src/lib/metadata/builders.ts`

```typescript
import type { Metadata } from 'next';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_CARD,
  SITE_NAME,
  SITE_URL,
  staticPageMetadata,
  type StaticPageKey,
} from '@/config/metadata';

// [CUSTOMIZE] SITE_NAME, SITE_URL, DEFAULT constants come from your config

export function buildCanonicalUrl(path: string): string {
  if (path === '/') {
    return SITE_URL;
  }
  return `${SITE_URL}${path}`;
}

export function resolveMetadataImage(image?: string): string {
  return image ?? DEFAULT_OG_IMAGE;
}

// [CUSTOMIZE] Returns Metadata for static pages
export function buildStaticMetadata(page: StaticPageKey): Metadata {
  const copy = staticPageMetadata[page];
  const canonical = buildCanonicalUrl(copy.path);
  const image = copy.imagePolicy === 'generated' && copy.generatedImagePath
    ? buildCanonicalUrl(copy.generatedImagePath)
    : null;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: copy.ogTitle,
      description: copy.ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: copy.ogType,
      ...(image && {
        images: [{ url: image, alt: copy.ogTitle }],
      }),
    },
    twitter: {
      card: image ? DEFAULT_TWITTER_CARD : 'summary',
      title: copy.ogTitle,
      description: copy.ogDescription,
      ...(image && { images: [image] }),
    },
  };
}

// [CUSTOMIZE] Detail metadata input type matches your content structure
type DetailMetadataInput = {
  title: string;
  socialTitle?: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article' | 'profile';
  image?: string;
  generatedImagePath?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

// [CUSTOMIZE] Returns Metadata for dynamic/detail pages
export function buildDetailMetadata(input: DetailMetadataInput): Metadata {
  const canonical = buildCanonicalUrl(input.path);
  const socialTitle = input.socialTitle ?? input.title;
  const image = input.image
    ? resolveMetadataImage(input.image)
    : input.generatedImagePath
      ? buildCanonicalUrl(input.generatedImagePath)
      : resolveMetadataImage();

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url: canonical,
      siteName: SITE_NAME,
      type: input.ogType ?? 'article',
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      authors: input.authors,
      tags: input.tags,
      images: [{ url: image, alt: socialTitle }],
    },
    twitter: {
      card: DEFAULT_TWITTER_CARD,
      title: socialTitle,
      description: input.description,
      images: [image],
    },
  };
}
```

### 3.2 Usage Patterns

**Static pages** use constant metadata:
```typescript
// In src/app/(pages)/work/page.tsx
import { buildStaticMetadata } from '@/lib/metadata/builders';

export const metadata: Metadata = buildStaticMetadata('work');
```

**Dynamic pages** use async metadata generation:
```typescript
// In src/app/(pages)/blog/[slug]/page.tsx
import { buildDetailMetadata } from '@/lib/metadata/builders';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return buildDetailMetadata({
    title: post.title,
    socialTitle: `${post.title} | Your Name`,
    description: post.summary,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    generatedImagePath: `/og/blog/${post.slug}`,
  });
}
```

**Prompt**: Map your content types to metadata builder functions:
| Content Type | Builder | Date Fields |
|--------------|---------|------------|
| Blog post | `buildDetailMetadata` | publishedAt, updatedAt |
| Project | `buildDetailMetadata` | createdAt |
| Note | `buildDetailMetadata` | createdAt |
| Glossary term | `buildDetailMetadata` | createdAt, updatedAt |

---

## 4. Root Layout Metadata

### 4.1 File: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, SITE_AUTHOR, SITE_DESCRIPTION, SITE_OG_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/config/metadata';
import { buildPersonSchema, buildWebsiteSchema, renderJsonLd } from '@/lib/metadata/schema';

export const metadata: Metadata = {
  title: {
    default: 'your name',        // [CUSTOMIZE]
    template: '%s | your name', // [CUSTOMIZE]
  },
  description: SITE_DESCRIPTION,
  keywords: [                    // [CUSTOMIZE] your SEO keywords
    'developer',
    'portfolio',
    'your name',
    'web development',
    // ...
  ],
  authors: [{ name: SITE_AUTHOR, url: `${SITE_URL}/about` }],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': '/feed.xml', // [CUSTOMIZE] feed route
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {renderJsonLd(buildWebsiteSchema())}
        {renderJsonLd(buildPersonSchema())}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 4.2 Key Elements

- `metadataBase`: Required for resolving relative OG image URLs
- `title.template`: Child pages set their title; suffix is automatic
- `alternates.types`: Links RSS feed for discovery
- Global JSON-LD: `WebSite` and `Person` schemas

**Prompt**: Define your global keywords array:
```typescript
keywords: [
  // Your primary keywords
  'your niche',
  'your stack',
  // Secondary keywords
  'portfolio',
  'personal site',
  // ...
]
```

---

## 5. JSON-LD Structured Data

### 5.1 File: `src/lib/metadata/schema.tsx`

```typescript
import type { ReactElement } from 'react';
import { SITE_AUTHOR, SITE_NAME, SITE_URL, staticPageMetadata } from '@/config/metadata';
import { buildCanonicalUrl } from '@/lib/metadata/builders';
import type { BlogPost, Project, Note, Term } from '@/types/your-content';

type JsonLdValue = Record<string, unknown>;

export function renderJsonLd(data: JsonLdValue): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// [CUSTOMIZE] Global schemas
export function buildWebsiteSchema(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function buildPersonSchema(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR,
    url: SITE_URL,
    jobTitle: 'Your Job Title',    // [CUSTOMIZE]
    knowsAbout: ['Your', 'Expertise', 'Areas'], // [CUSTOMIZE]
  };
}

// [CUSTOMIZE] Index page schemas
export function buildHomeSchema(): JsonLdValue {
  const copy = staticPageMetadata.home;
  return {
    '@context': 'https://schema.org',
    '@type': copy.schemaKind,
    name: copy.ogTitle,
    description: copy.description,
    url: buildCanonicalUrl(copy.path),
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    about: { '@type': 'Person', name: SITE_AUTHOR, url: SITE_URL },
  };
}

export function buildAboutSchema(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': staticPageMetadata.about.schemaKind,
    mainEntity: {
      '@type': 'Person',
      name: SITE_AUTHOR,
      url: SITE_URL,
      jobTitle: 'Your Job Title',     // [CUSTOMIZE]
      knowsAbout: ['Your Expertise'],   // [CUSTOMIZE]
      sameAs: [],
    },
  };
}

// [CUSTOMIZE] Content-type schemas
export function buildBlogPostSchema(post: BlogPost): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    url: buildCanonicalUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { '@type': 'Person', name: SITE_AUTHOR, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': buildCanonicalUrl(`/blog/${post.slug}`) },
    keywords: post.tags.join(', '),
    publisher: { '@type': 'Person', name: SITE_AUTHOR, url: SITE_URL },
  };
}

// [CUSTOMIZE] Add other schemas: Project → SoftwareSourceCode, Note → SocialMediaPosting, Term → DefinedTerm
```

### 5.2 Schema.org Type Reference

| Page/Content | Schema.org Type |
|------------|-------------|
| Home | WebPage |
| About | ProfilePage |
| Projects list | ItemList |
| Blog index | Blog |
| Notes index | CollectionPage |
| Glossary index | DefinedTermSet |
| Blog post | BlogPosting |
| Project | SoftwareSourceCode |
| Note | SocialMediaPosting |
| Glossary term | DefinedTerm |

**Prompt**: Map your content types to Schema.org types and define their properties:
| Content | Schema.org Type | Special Properties |
|---------|----------------|------------------|
| Blog post | BlogPosting | headline, datePublished, author, keywords |
| Project | SoftwareSourceCode | programmingLanguage, license |
| Note | SocialMediaPosting | datePublished |
| Glossary term | DefinedTerm | inDefinedTermSet |

---

## 6. Dynamic OG Image Generation

### 6.1 Core Infrastructure: `src/lib/metadata/og-image.tsx`

```typescript
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { CSSProperties, ReactElement } from 'react';
import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_URL } from '@/config/metadata';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

// [CUSTOMIZE] Your design tokens
const OG_TOKENS = {
  ink: '#0f172a',
  muted: '#64748b',
  paper: '#f8fafc',
  blue: '#2563eb',
  // Add your accent colours
} as const;

// [CUSTOMIZE] Font loading
let fontPromise: Promise<ArrayBuffer | null> | null = null;
async function getFont(): Promise<ArrayBuffer | null> {
  if (!fontPromise) {
    fontPromise = readFile(join(process.cwd(), 'public', 'fonts', 'your-font.ttf'))
      .then((buffer) => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength))
      .catch(() => null);
  }
  return fontPromise;
}

export async function createOgImageResponse(card: ReactElement): Promise<ImageResponse> {
  const font = await getFont();
  return new ImageResponse(card, {
    ...OG_IMAGE_SIZE,
    fonts: font ? [{ name: 'Your Font', data: font, weight: 400, style: 'normal' }] : [],
  });
}

// [CUSTOMIZE] Text utilities
export function truncateOgText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function formatOgDisplayUrl(pathOrUrl: string): string {
  const full = pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
  return full.replace(/^https?:\/\//, '');
}
```

### 6.2 Shared Components

```typescript
// [CUSTOMIZE] Frame: outer container with gradient background
type FrameProps = { children: ReactElement; background: string; color: string };
function Frame({ children, background, color }: FrameProps): ReactElement {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background, color, padding: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

// [CUSTOMIZE] Header: site name + URL
type HeaderProps = { eyebrow: string; accent: string };
function Header({ eyebrow, accent }: HeaderProps): ReactElement {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent, textTransform: 'lowercase' }}>{eyebrow}</div>
      <div style={{ fontSize: 16, color: OG_TOKENS.muted, textTransform: 'lowercase' }}>{formatOgDisplayUrl(SITE_URL)}</div>
    </div>
  );
}

// [CUSTOMIZE] Footer: path + date
type FooterProps = { left: string; right: string; color?: string };
function Footer({ left, right, color = OG_TOKENS.muted }: FooterProps): ReactElement {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
```

### 6.3 Card Variants

```typescript
// [CUSTOMIZE] Home OG Card
export function HomeOgCard({ title, description, footerLeft, footerRight }: SharedOgProps): ReactElement {
  return (
    <Frame background="linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)" color={OG_TOKENS.ink}>
      <Header eyebrow="your name" accent={OG_TOKENS.blue} />
      <div style={{ fontSize: 58, fontWeight: 800 }}>{truncateOgText(title, 96)}</div>
      <div style={{ fontSize: 24, color: OG_TOKENS.muted }}>{truncateOgText(description, 190)}</div>
      <Footer left={footerLeft} right={footerRight ?? SITE_NAME} color={OG_TOKENS.blue} />
    </Frame>
  );
}

// [CUSTOMIZE] Article OG Card
export function ArticleOgCard({ title, description, footerLeft, footerRight }: SharedOgProps): ReactElement {
  return (
    <Frame background="linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)" color={OG_TOKENS.ink}>
      <Header eyebrow="blog" accent={OG_TOKENS.blue} />
      <div style={{ fontSize: 58, fontWeight: 800 }}>{truncateOgText(title, 110)}</div>
      <div style={{ fontSize: 24, color: OG_TOKENS.muted }}>{truncateOgText(description, 210)}</div>
      <Footer left={footerLeft} right={footerRight ?? SITE_NAME} />
    </Frame>
  );
}

// [CUSTOMIZE] Add: AboutOgCard, WorkIndexOgCard, BlogIndexOgCard, NoteOgCard, TermOgCard, ProjectOgCard, etc.
```

### 6.4 OG Image Route Handlers

**Static** (`src/app/og/static/home/route.tsx`):
```typescript
import { staticPageMetadata } from '@/config/metadata';
import { createOgImageResponse, HomeOgCard } from '@/lib/metadata/og-image';

export const dynamic = 'force-static';

export async function GET() {
  const copy = staticPageMetadata.home;
  return createOgImageResponse(
    <HomeOgCard title={copy.ogTitle} description={copy.description} />
  );
}
```

**Dynamic** (`src/app/og/blog/[slug]/route.tsx`):
```typescript
import { getBlogPostBySlug } from '@/lib/blog';
import { ArticleOgCard, createOgImageResponse } from '@/lib/metadata/og-image';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  return createOgImageResponse(
    <ArticleOgCard title={post?.title ?? ''} description={post?.summary ?? ''} />
  );
}
```

**Prompt**: Define each OG card type and its accent colour:
| Card | Accent Colour | Background Gradient |
|------|--------------|-------------------|
| Home | Blue | paper → blueSoft |
| About | Amber | paperWarm → amberSoft |
| Work | Amber | paperWarm → amberSoft |
| Blog | Blue | paper → blueSoft |
| Note | Teal | paperWarm → tealSoft |
| Glossary | Violet | paper → violetSoft |

---

## 7. XML Sitemap

### 7.1 Route Handler: `src/app/sitemap.xml/route.ts`

```typescript
import { NextResponse } from 'next/server';
import {
  STATIC_SITEMAP_LAST_MODIFIED,
  staticPageMetadata,
} from '@/config/metadata';
import { getBlogPosts } from '@/lib/blog';
import { getProjects } from '@/data/projects';
import { getYourDynamicContent } from '@/lib/your-content';
import { buildCanonicalUrl } from '@/lib/metadata/builders';

export const revalidate = 21600; // 6 hours

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function entryToXml(entry: SitemapEntry): string {
  return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}

export async function GET() {
  // Static pages
  const staticPages: SitemapEntry[] = [
    { url: buildCanonicalUrl(staticPageMetadata.home.path), lastModified: new Date(STATIC_SITEMAP_LAST_MODIFIED), changeFrequency: 'weekly', priority: 1 },
    { url: buildCanonicalUrl(staticPageMetadata.about.path), lastModified: new Date(STATIC_SITEMAP_LAST_MODIFIED), changeFrequency: 'monthly', priority: 0.8 },
    { url: buildCanonicalUrl(staticPageMetadata.work.path), lastModified: new Date(STATIC_SITEMAP_LAST_MODIFIED), changeFrequency: 'weekly', priority: 0.8 },
    { url: buildCanonicalUrl(staticPageMetadata.blog.path), lastModified: new Date(STATIC_SITEMAP_LAST_MODIFIED), changeFrequency: 'daily', priority: 0.8 },
    // [CUSTOMIZE] Add your static pages
  ];

  // Blog posts
  const posts = getBlogPosts();
  const blogPages: SitemapEntry[] = posts.map((post) => ({
    url: buildCanonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Projects
  const projects = getProjects();
  const projectPages: SitemapEntry[] = projects.map((project) => ({
    url: buildCanonicalUrl(`/work/${project.slug}`),
    lastModified: new Date(project.lastModified ?? STATIC_SITEMAP_LAST_MODIFIED),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // [CUSTOMIZE] Dynamic content from database
  const dynamicContent = await getYourDynamicContent();
  const dynamicPages: SitemapEntry[] = dynamicContent.map((item) => ({
    url: buildCanonicalUrl(`/your-path/${item.serial}`),
    lastModified: new Date(item.updatedAt || item.createdAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const allEntries = [...staticPages, ...blogPages, ...projectPages, ...dynamicPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entryToXml).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=21600, s-maxage=21600' },
  });
}
```

### 7.2 Priority Reference

| Page Type | Priority | Change Frequency |
|----------|---------|---------------|
| Home | 1.0 | weekly |
| About | 0.8 | monthly |
| Index pages | 0.8 | daily/weekly |
| Blog posts | 0.7 | monthly |
| Projects | 0.7 | monthly |
| Dynamic content | 0.5 | monthly/yearly |

### 7.3 XSL Stylesheet (optional): `public/sitemap.xsl`

Create a human-readable XSL that sections the sitemap by content type with dark theme styling.

**Prompt**: List your sitemap data sources and their query methods:
| Content Type | Source | Query Method |
|-------------|--------|-------------|
| Static pages | `staticPageMetadata` | Direct mapping |
| Blog posts | MDX files | `getBlogPosts()` |
| Projects | Data file | `getProjects()` |
| Notes | Database | Supabase query |
| Terms | Database | Supabase query |

---

## 8. RSS Feed

### 8.1 Route Handler: `src/app/feed.xml/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { generateFeed } from '@/lib/feed';

export const revalidate = 21600;

export async function GET() {
  const feed = await generateFeed();
  const feedWithXslt = feed.replace(
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>'
  );
  return new NextResponse(feedWithXslt, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=21600, s-maxage=21600' },
  });
}
```

### 8.2 Feed Generator: `src/lib/feed/generator.ts`

```typescript
import { getBlogPosts } from '@/lib/blog';
import { getNotes } from '@/lib/notes';
import type { FeedConfig, FeedItem } from './types';

const DEFAULT_CONFIG: FeedConfig = {
  siteUrl: 'https://yoursite.com',    // [CUSTOMIZE]
  siteTitle: 'Your Site Name',        // [CUSTOMIZE]
  siteDescription: 'Your description.',
  language: 'en-us',
};

export async function generateFeed(maxItems: number = 50, config: FeedConfig = DEFAULT_CONFIG): Promise<string> {
  const [posts, notes] = await Promise.all([getBlogPosts(), getNotes()]);

  const postItems = posts.map(post => ({
    title: post.title,
    link: `${config.siteUrl}/blog/${post.slug}`,
    description: post.summary,
    pubDate: post.publishedAt,
    guid: `${config.siteUrl}/blog/${post.slug}`,
    category: 'blog',
  }));

  const noteItems = notes.map(note => ({
    title: `Note #${note.serial}`,
    link: `${config.siteUrl}/notes/${note.serial}`,
    description: note.content.substring(0, 200),
    pubDate: note.createdAt,
    guid: `${config.siteUrl}/notes/${note.serial}`,
    category: 'note',
  }));

  const allItems = [...postItems, ...noteItems]
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, maxItems);

  const itemsXml = allItems.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
      <category>${item.category}</category>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.siteTitle}</title>
    <link>${config.siteUrl}</link>
    <description>${config.siteDescription}</description>
    <language>${config.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${config.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;
}
```

### 8.3 Feed Configuration

**Prompt**: Define your feed contents:
| Content Type | Category | Include in Feed? |
|--------------|----------|------------------|
| Blog posts | blog | Yes |
| Notes | note | Yes |
| Glossary terms | term | No |
| Projects | project | No |

---

## 9. Content-Type-Specific Patterns

### 9.1 Complete Pattern Reference

| Content Type | Static? | Metadata | Schema | OG Card | Sitemap | Feed |
|-------------|--------|----------|--------|--------|---------|------|
| Home | ✅ | `buildStaticMetadata('home')` | `buildHomeSchema` | `HomeOgCard` | Config | — |
| About | ✅ | `buildStaticMetadata('about')` | `buildAboutSchema` | `AboutOgCard` | Config | — |
| Work index | ✅ | `buildStaticMetadata('work')` | `buildWorkIndexSchema` | `WorkIndexOgCard` | Config | — |
| Blog post | ❌ | `buildDetailMetadata` | `buildBlogPostSchema` | `ArticleOgCard` | MDX frontmatter | ✅ |
| Project | ❌ | `buildDetailMetadata` | `buildProjectSchema` | `ProjectOgCard` | Data file | — |
| Note | ❌ | `buildDetailMetadata` | `buildNoteSchema` | `NoteOgCard` | DB query | ✅ |
| Term | ❌ | `buildDetailMetadata` | `buildTermSchema` | `TermOgCard` | DB query | — |

### 9.2 Implementation Template

**For static pages:**
```typescript
// src/app/(pages)/[page]/page.tsx
import { buildStaticMetadata } from '@/lib/metadata/builders';
import { renderJsonLd } from '@/lib/metadata/schema';

export const metadata = buildStaticMetadata('your-key');
// For JSON-LD index schema:
// export { generateMetadata } from 'next/head' or renderJsonLd in component
```

**For dynamic/detail pages:**
```typescript
// src/app/(pages)/[content]/[slug]/page.tsx
import { buildDetailMetadata } from '@/lib/metadata/builders';
import { buildContentSchema, renderJsonLd } from '@/lib/metadata/schema';
import { getContentBySlug } from '@/lib/your-content';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getContentBySlug(slug);
  return buildDetailMetadata({
    title: post.title,
    socialTitle: `${post.title} | Your Name`,
    description: post.summary,
    path: `/your-path/${post.slug}`,
    ogType: 'article',
    publishedTime: post.createdAt,
    modifiedTime: post.updatedAt,
    generatedImagePath: `/og/your-path/${post.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getContentBySlug(slug);
  return (
    <>
      {renderJsonLd(buildContentSchema(post))}
      {/* Your page content */}
    </>
  );
}
```

**Prompt**: For each content type, define:
1. **Data source** — database, MDX frontmatter, static data file
2. **Date fields** — createdAt, updatedAt, publishedAt
3. **Path pattern** — `/type/${slug}` or `/type/${serial}`
4. **OG image route** — `/og/type/${slug}`

---

## 10. Implementation Checklist

Step-by-step guide for implementing in a new project:

- [ ] **1. Define site constants** in `src/config/metadata.ts`
  - `SITE_URL`, `SITE_NAME`, `SITE_AUTHOR`, `SITE_DESCRIPTION`, `DEFAULT_OG_IMAGE`
- [ ] **2. Define static page registry** in `src/config/metadata.ts`
  - List all static pages with paths, titles, descriptions, schema types
- [ ] **3. Build metadata builders** in `src/lib/metadata/builders.ts`
  - `buildCanonicalUrl`, `buildStaticMetadata`, `buildDetailMetadata`
- [ ] **4. Set up root layout** in `src/app/layout.tsx`
  - Title template, metadataBase, keywords, alternates, global OG/Twitter
- [ ] **5. Build JSON-LD schemas** in `src/lib/metadata/schema.tsx`
  - `renderJsonLd`, global schemas, index schemas, detail schemas
- [ ] **6. Build OG image infrastructure** in `src/lib/metadata/og-image.tsx`
  - Design tokens, utilities, shared components (`Frame`, `Header`, `Footer`)
- [ ] **7. Create OG cards** — one per content type
  - Home, About, Index pages, Article, Project, Note, Term
- [ ] **8. Create OG image routes**
  - Static: `app/og/static/[page]/route.tsx`
  - Dynamic: `app/og/[type]/[slug]/route.tsx`
- [ ] **9. Build XML sitemap** in `app/sitemap.xml/route.ts`
  - Query all content sources, generate XML with entries
- [ ] **10. Build RSS feed** in `app/feed.xml/route.ts` + `lib/feed/`
  - Merge content types, generate RSS 2.0
- [ ] **11. Create XSL stylesheets** (optional but recommended)
  - `public/sitemap.xsl`, `public/feed.xsl`
- [ ] **12. Wire sitemap/feed links** from footer or header

---

## 11. Key Design Decisions

| Decision | Rationale |
|----------|----------|
| Custom XML sitemap route over `sitemap.ts` | XSL injection, explicit cache control, manual escaping |
| `as const satisfies` in config | Literal type inference + structural validation |
| `imagePolicy: 'generated'` | Declarative intent; builder resolves full URL |
| Separate OG image route handlers | Decoupled; Next.js edge-caches images |
| Feed merges all content types | Unified timeline |
| `buildCanonicalUrl` on every URL | Single source of truth for URLs |

**Prompt**: Document your design decisions:
- Which content goes into the sitemap? All public URLs
- Which content goes into the feed? Only blog posts? Notes too?
- What's your revalidation interval? (6 hours recommended)

---

## 12. Cross-Cutting Concerns

### 12.1 Caching Strategy

```typescript
// Both sitemap and feed use:
export const revalidate = 21600; // 6 hours
// Headers:
'Cache-Control': 'public, max-age=21600, s-maxage=21600'
```

### 12.2 Error Handling

```typescript
// In sitemap: graceful fallback
const bytes = (await supabase.from('bytes').select('*').maybe()) ?? [];
```

### 12.3 SEO Validation Tools

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org
- Sitemap Validator: https://www.sitemap.com/validate

### 12.4 Performance Tips

- Use `force-static` for OG image routes with fixed content
- Dynamic OG image routes are edge-cached by Next.js automatically
- Set `revalidate` on sitemap/feed for cache segmentation

---

## Quick Reference: Placeholders

Replace these placeholders when adapting this blueprint:

| Placeholder | Description |
|------------|-------------|
| `SITE_URL` | Your site URL (e.g., `https://example.com`) |
| `SITE_NAME` | Your site name (e.g., `John Doe`) |
| `SITE_AUTHOR` | Your name |
| `SITE_DESCRIPTION` | 1-2 sentence site description |
| `SITE_OG_DESCRIPTION` | Description for social cards |
| `DEFAULT_OG_IMAGE` | Default OG image path |
| `StaticPageKey` | Your static page keys (`home`, `about`, `work`, etc.) |
| `StaticSchemaKind` | Schema.org types for your pages |
| `build{Content}Schema` | Schema builders for your content types |
| `{Card}OgCard` | OG card components |
| `OG_TOKENS` | Your colour palette |

---

End of Blueprint