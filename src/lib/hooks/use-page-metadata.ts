'use client'

import { usePathname } from 'next/navigation'
import { getPageBySlug } from '@/lib/metadata'
import { PageDescription } from '@/types/pages'

export interface PageMetadataOutput {
  title: string
  description: PageDescription
  acknowledgements: string[]
  startDate?: string
  finishDate?: string
  thumbnail?: string
  shortDescription?: string
  pagePath: string
}

export function usePageMetadata(): PageMetadataOutput {
  const pathname = usePathname()
  const slug = pathname.replace(/^\//, '')
  const metadata = getPageBySlug(slug)

  return {
    title: metadata?.title ?? '',
    description: metadata?.fullDescription ?? { eng: '', mar: '' },
    acknowledgements: metadata?.acknowledgements ?? [],
    startDate: metadata?.startDate,
    finishDate: metadata?.finishDate,
    thumbnail: metadata?.thumbnail,
    shortDescription: metadata?.shortDescription,
    pagePath: pathname,
  }
}
