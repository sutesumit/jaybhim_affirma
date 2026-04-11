import { pagesRegistry } from '@/data/pages-registry';
import { PageMetadata } from '@/types/pages';

/**
 * Retrieves full metadata for a page by its slug.
 * @param slug The path of the page (e.g., '/fathers-and-figures')
 */
export function getPageBySlug(slug: string): PageMetadata | undefined {
  // Handle both '/slug' and 'slug' formats
  const normalizedSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  return pagesRegistry[normalizedSlug];
}

/**
 * Interface compatible with the existing DropdownMenu components.
 */
export interface MenuItem {
  id: number;
  title: string;
  description: string;
  href: string;
  image: string;
  searchContent?: string;
  startDate?: string;
  finishDate?: string;
}

/**
 * Returns the list of pages formatted for the Dropdown Menu.
 */
export function getMenuConfig(): MenuItem[] {
  const items = Object.values(pagesRegistry)
    .sort((a, b) => a.id - b.id)
    .map(page => ({
      id: page.id,
      title: page.title,
      description: page.shortDescription,
      href: page.slug,
      image: page.thumbnail,
      searchContent: page.searchKeywords,
      startDate: page.startDate,
      finishDate: page.finishDate
    }));
  
  return items;
}
