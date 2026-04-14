import { NextResponse } from 'next/server';
import {
  STATIC_SITEMAP_LAST_MODIFIED,
  HOME_PAGE_META,
  getAllProjectKeys,
  getProjectSeoMeta,
} from '@/config/metadata';
import { buildCanonicalUrl } from '@/lib/metadata/builders';
import { pagesRegistry } from '@/data/pages-registry';

// Next.js requires revalidate to be a static literal, not a variable reference
export const revalidate = 86400;

// ─── Types ───────────────────────────────────────────────────────────────────

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function entryToXml(entry: SitemapEntry): string {
  return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}

/**
 * Attempts to parse a human-readable date like "Dec 2014" or "April 2021"
 * into an ISO string. Falls back to the provided default.
 */
function parseApproximateDate(dateStr: string | undefined, fallback: string): string {
  if (!dateStr || dateStr === 'Present') return fallback;
  const match = dateStr.match(/^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{4})$/i);
  if (match) {
    const monthMap: Record<string, string> = {
      jan: '01', feb: '02', mar: '03', apr: '04',
      may: '05', jun: '06', jul: '07', aug: '08',
      sep: '09', oct: '10', nov: '11', dec: '12',
    };
    const month = monthMap[dateStr.substring(0, 3).toLowerCase()] ?? '01';
    return `${match[1]}-${month}-01T00:00:00.000Z`;
  }
  return fallback;
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export async function GET() {
  const entries: SitemapEntry[] = [
    // Home page
    {
      url: buildCanonicalUrl(HOME_PAGE_META.path),
      lastModified: STATIC_SITEMAP_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: HOME_PAGE_META.sitemapPriority,
    },
  ];

  // Auto-derive project pages from registry keys
  const projectKeys = getAllProjectKeys();

  for (const key of projectKeys) {
    const seo = getProjectSeoMeta(key);
    const registry = pagesRegistry[key];

    if (!seo || !registry) continue;

    const lastModified = parseApproximateDate(
      registry?.finishDate,
      STATIC_SITEMAP_LAST_MODIFIED,
    );

    entries.push({
      url: buildCanonicalUrl(seo.path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: seo.sitemapPriority,
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entryToXml).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
