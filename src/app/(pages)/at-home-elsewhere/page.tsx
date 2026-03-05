'use client'

import { HeroSection } from './components'
import { PageUnderConstructionWrapper } from './ArtCanvas'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

export default function Home() {
  const { acknowledgements, pagePath } = usePageMetadata()

  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />

      <PageUnderConstructionWrapper />

      <Separator />

      <CommentsSection pagePath={pagePath} mode="standalone" />

      <Separator />

      {acknowledgements.length > 0 && (
        <AcknowledgementSection names={acknowledgements} />
      )}
    </div>
  )
}
