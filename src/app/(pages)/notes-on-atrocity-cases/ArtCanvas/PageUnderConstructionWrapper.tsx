import { PageUnderConstruction } from '@/components/features/shared'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

export function PageUnderConstructionWrapper() {
  const { title } = usePageMetadata()
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <PageUnderConstruction 
        pageName={title}
      />
    </div>
  )
}
