'use client'

import { HeroSection } from './components'
import { PageUnderConstructionWrapper } from './ArtCanvas'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { content, acknowledgements } from './content'

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center isolate">
      {/* Title & Description with optional background */}
      <HeroSection />

      {/* Placeholder: Under Construction */}
      <PageUnderConstructionWrapper />

      <Separator />

      {/* Comments Section */}
      <CommentsSection pagePath="/at-home-elsewhere" mode="standalone" />

      <Separator />

      {/* Acknowledgements */}
      {acknowledgements.length > 0 && (
        <AcknowledgementSection names={acknowledgements} />
      )}
    </div>
  )
}
