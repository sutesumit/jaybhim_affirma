import { PageUnderConstruction } from '@/components/features/shared'
import { content } from '../content'

export function PageUnderConstructionWrapper() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <PageUnderConstruction 
        pageName={content.title}
        youtubeTimestamp="174"
        blogUrl="https://niranjaninpune.tumblr.com/"
      />
    </div>
  )
}
