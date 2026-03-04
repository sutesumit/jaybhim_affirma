'use client'

import { HeroSection } from './components'
import { PageUnderConstructionWrapper } from './ArtCanvas'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { content, acknowledgements } from './content'

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      <PageUnderConstructionWrapper />
      <Separator />
      <CommentsSection pagePath="/niranjan-in-a-city" mode="standalone" />
      <Separator />
      {acknowledgements.length > 0 && (
        <AcknowledgementSection names={acknowledgements} />
      )}
    </div>
  )
}
