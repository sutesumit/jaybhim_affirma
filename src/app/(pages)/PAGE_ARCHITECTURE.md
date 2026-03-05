# Page Architecture Guide

This document defines the standard structure for all pages in `(pages)/`.

---

## Ideal Page Structure

```
src/app/(pages)/[page-name]/
├── page.tsx              # Main page component
├── components/           # UI wrappers and helpers
│   ├── index.ts          # Barrel file
│   ├── HeroSection/     # Title + description + background
│   │   ├── HeroSection.tsx
│   │   ├── Background.tsx  # Optional custom background (JSX allowed)
│   │   └── index.ts
│   └── [other]/         # Other page-specific components
└── ArtCanvas/           # Primary content component
    ├── index.ts          # Barrel file
    └── [Component].tsx   # Main content (flipbook, gallery, etc.)
```

**Note:** Page metadata (title, description, acknowledgements) is now stored in `@/data/pages-registry.ts` and accessed via the `usePageMetadata()` hook. Do NOT create local content.ts files for metadata.

---

## Key Principles

1. **Metadata via hook** - Use `usePageMetadata()` from `@/lib/hooks/use-page-metadata` to get page metadata (title, description, acknowledgements, startDate, finishDate)
2. **Dates in HeroSection** - Pass `startDate` and `finishDate` to `TitleDiscription` to display project timeline
3. **`components/`** - Houses HeroSection and other UI wrappers
4. **`ArtCanvas/`** - Houses the main content component (the "meat" of the page)
5. **Barrel files (index.ts)** - Always create for each folder
6. **PascalCase** - All folder and component names
7. **Import from barrels** - Use `./components` not `./components/HeroSection`

---

## Folder Purposes

### `components/`

- **HeroSection** - Wraps TitleDiscription with title, description, startDate, finishDate, and background
- Any other page-specific UI wrappers

### `ArtCanvas/`

The main content component. **Must have `min-h-screen` class.**

Examples:
- Flipbook (LunchboxFlipbook)
- Gallery (GallerySection, DocumentaryGallery)
- Interactive canvas (ArtCanvas)
- **Placeholder** - PageUnderConstruction for pages still being built

---

## Special Cases

### documentary-portfolio

This page is a **special case** - it uses a fullscreen gallery layout with `h-screen` instead of the standard structure:

```tsx
// Uses <section> instead of <div>
<section className="flex flex-col items-center justify-center h-screen w-full isolate">
```

It does not follow the standard `page.tsx` → `ArtCanvas/` pattern.

---

## Page Levels

### Level 1: Placeholder

```tsx
// page.tsx
'use client'
import { HeroSection } from './components'
import { PageUnderConstructionWrapper } from './ArtCanvas'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

export default function Page() {
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
```

```tsx
// ArtCanvas/PageUnderConstructionWrapper.tsx
import { PageUnderConstruction } from '@/components/features/shared'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

export function PageUnderConstructionWrapper() {
  const { title } = usePageMetadata()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <PageUnderConstruction 
        pageName={title}
        youtubeTimestamp="856"
      />
    </div>
  )
}
```

```tsx
// ArtCanvas/index.ts
export { PageUnderConstructionWrapper } from './PageUnderConstructionWrapper'
```

### Level 2: Simple Content

```tsx
// page.tsx
'use client'
import { HeroSection } from './components'
import { MyContent } from './ArtCanvas'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

export default function Page() {
  const { acknowledgements, pagePath } = usePageMetadata()

  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      <MyContent />
      <Separator />
      <CommentsSection pagePath={pagePath} mode="standalone" />
      <Separator />
      <AcknowledgementSection names={acknowledgements} />
    </div>
  )
}
```

### Level 3: Full-Featured

```tsx
// page.tsx
'use client'
import { useRef } from 'react'
import { HeroSection } from './components'
import { ArtCanvas } from './ArtCanvas'
import { MyProvider } from './components/MyProvider'
import { Submissions } from './components/Submissions'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

export default function Page() {
  const artCanvasRef = useRef(null)
  const { acknowledgements, pagePath } = usePageMetadata()

  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      <ArtCanvas ref={artCanvasRef} />
      <MyProvider>
        <Submissions artCanvasRef={artCanvasRef} />
      </MyProvider>
      <Separator />
      <CommentsSection pagePath={pagePath} mode="standalone" />
      <Separator />
      <AcknowledgementSection names={acknowledgements} />
    </div>
  )
}
```

---

## Common Component Imports

```tsx
// Shared components (from features)
import { TitleDiscription } from '@/components/features/page-title'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'

// Page-specific (from barrel)
import { HeroSection } from './components'
import { MyArtCanvas } from './ArtCanvas'
```

---

## Creating a New Page

### Step 1: Add metadata to registry

Before creating the page, add the page metadata to `@/data/pages-registry.ts`:

```typescript
// src/data/pages-registry.ts
export const pagesRegistry: PageRegistry = {
  'new-page': {
    id: X,
    slug: '/new-page',
    title: 'Page Title',
    thumbnail: '/thumbnails/x.jpg',
    shortDescription: 'Short description for menu',
    fullDescription: {
      eng: "English description...",
      mar: "मराठी वर्णन..."
    },
    acknowledgements: ["Name 1", "Name 2"],
    startDate: "Jan 2024",
    finishDate: "Dec 2024"
  }
}
```

### Step 2: Create directory

```bash
mkdir -p src/app/(pages)/new-page/components/HeroSection
mkdir -p src/app/(pages)/new-page/ArtCanvas
```

### Step 3: Create page.tsx

```tsx
// page.tsx
'use client'
import { HeroSection } from './components'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

export default function NewPage() {
  const { acknowledgements, pagePath } = usePageMetadata()

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      
      {/* Your content here */}
      
      <Separator />
      <CommentsSection pagePath={pagePath} mode="standalone" />
      <Separator />
      <AcknowledgementSection names={acknowledgements} />
    </div>
  )
}
```

### Step 4: Create HeroSection

```tsx
// components/HeroSection/HeroSection.tsx
'use client'
import { TitleDiscription } from '@/components/features/page-title'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'
import Background from './Background'

export function HeroSection() {
  const { title, description, startDate, finishDate } = usePageMetadata()

  return (
    <TitleDiscription
      title={title}
      description={description}
      startDate={startDate}
      finishDate={finishDate}
      background={<Background />}
    />
  )
}
```

```tsx
// components/HeroSection/index.ts
export { HeroSection } from './HeroSection'
```

```tsx
// components/index.ts
export { HeroSection } from './HeroSection'
```

### Step 5: Create ArtCanvas (if needed)

```tsx
// ArtCanvas/MyComponent.tsx
export function MyComponent() {
  return <div>Content</div>
}
```

```tsx
// ArtCanvas/index.ts
export { MyComponent } from './MyComponent'
```

---

## Using startDate and finishDate

The `usePageMetadata()` hook returns `startDate` and `finishDate` from the registry. To display these in the HeroSection, pass them to `TitleDiscription`:

```tsx
// components/HeroSection/HeroSection.tsx
'use client'
import { TitleDiscription } from '@/components/features/page-title'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'
import Background from './Background'

export function HeroSection() {
  const { title, description, startDate, finishDate } = usePageMetadata()

  return (
    <TitleDiscription
      title={title}
      description={description}
      startDate={startDate}
      finishDate={finishDate}
      background={<Background />}
    />
  )
}
```

**Note:** Not all pages have start/finish dates. The `TitleDiscription` component handles `undefined` values gracefully - the dates simply won't be displayed.

---

## Refactoring Existing Pages

### Checklist

- [ ] Move main content to `ArtCanvas/`
- [ ] Move HeroSection to `components/HeroSection/`
- [ ] Create barrel files (index.ts) for each folder
- [ ] Update imports in page.tsx to use barrels
- [ ] Use `usePageMetadata()` hook instead of local content.ts
- [ ] Remove local content.ts (metadata is now in pages-registry.ts)

### Import Changes

```tsx
// Before
import { HeroSection } from './components/HeroSection'
import { content, acknowledgements } from './content'

// After
import { HeroSection } from './components'
import { usePageMetadata } from '@/lib/hooks/use-page-metadata'

// In component:
const { title, description, acknowledgements } = usePageMetadata()
```

---

## Current Page Structures

### fathers-and-figures (Level 3)

```
├── page.tsx
├── components/
│   ├── index.ts
│   ├── HeroSection/
│   ├── Submissions/
│   ├── MaraaSection/
│   └── MakeMyCard/
└── ArtCanvas/
    ├── index.ts
    ├── ArtCanvas.tsx
    ├── DraggablePhoto.tsx
    ├── Instruction.tsx
    ├── types.ts
    └── usePhotoStyleHook.ts
```

### home-photobook (Level 2)

```
├── page.tsx
├── content.ts          # Page-specific data (videoSources, timelineItems)
├── components/
│   ├── index.ts
│   └── HeroSection/
└── ArtCanvas/
    ├── index.ts
    ├── GallerySection.tsx
    └── RunningTimeline.tsx
```

### lunchboxes (Level 2)

```
├── page.tsx
├── content.tsx         # Page-specific data (pages array)
├── components/
│   ├── index.ts
│   └── HeroSection/
└── ArtCanvas/
    ├── index.ts
    └── LunchboxFlipbook.tsx
```

### at-home-elsewhere (Level 1 - Placeholder)

```
├── page.tsx
├── content.ts          # (can be deleted, metadata is now in registry)
├── components/
│   ├── index.ts
│   └── HeroSection/
└── ArtCanvas/
    ├── index.ts
    └── PageUnderConstructionWrapper.tsx
```

---

## Anti-Patterns to Avoid

- ❌ Components at page root level (not in `components/` or `ArtCanvas/`)
- ❌ Missing barrel files (index.ts)
- ❌ Importing from subfolders instead of barrels
- ❌ Creating local content.ts for metadata (use `usePageMetadata()` hook)
- ❌ Hardcoding page slugs in components (use hook to auto-detect)
- ❌ kebab-case folder names (use PascalCase)
