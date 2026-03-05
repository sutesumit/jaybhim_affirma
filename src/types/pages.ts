export interface PageDescription {
  eng: string;
  mar: string;
}

/**
 * Unified interface for both navigation and page-level metadata.
 */
export interface PageMetadata {
  id: number;
  slug: string; // The route path (e.g., '/fathers-and-figures')
  title: string;
  thumbnail: string; // For the Dropdown Menu
  shortDescription: string; // Brief summary for the Menu
  searchKeywords?: string; // Metadata for global search
  fullDescription: PageDescription; // Detailed bilingual text for HeroSection
  acknowledgements: string[];
  
  // Project Timeline
  startDate?: string;  // Format: "Mon YEAR" (e.g., "Jan 2023")
  finishDate?: string; // Format: "Mon YEAR" (e.g., "Dec 2024") or "Present"

  // Slot for page-specific extras (e.g., video links for home-photobook)
  extras?: Record<string, any>;
}

export interface PageRegistry {
  [key: string]: PageMetadata;
}
