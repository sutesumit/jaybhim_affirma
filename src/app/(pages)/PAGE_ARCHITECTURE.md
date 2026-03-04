# Page Architecture Guide

This document defines the standard structure for all pages in `(pages)/`.

---

## Ideal Page Structure

```
src/app/(pages)/[page-name]/
├── page.tsx              # Main page component
├── content.ts           # Page metadata only (title, description, acknowledgements)
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

---

## Key Principles

1. **`content.ts`** - Contains only metadata (title, description, acknowledgements) - NO JSX
2. **`components/`** - Houses HeroSection and other UI wrappers
3. **`ArtCanvas/`** - Houses the main content component (the "meat" of the page)
3. **Barrel files (index.ts)** - Always create for each folder
4. **PascalCase** - All folder and component names
5. **Import from barrels** - Use `./components` not `./components/HeroSection`

---

## Folder Purposes

### `components/`

- **HeroSection** - Wraps TitleDiscription with title, description, background
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
import { content, acknowledgements } from './content'

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      <PageUnderConstructionWrapper />
      <Separator />
      <CommentsSection pagePath="/page-name" mode="standalone" />
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
import { content } from '../content'

export function PageUnderConstructionWrapper() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <PageUnderConstruction 
        pageName={content.title}
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
import { acknowledgements } from './content'

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      <MyContent />
      <Separator />
      <CommentsSection pagePath="/page-name" mode="standalone" />
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
import { acknowledgements } from './content'

export default function Page() {
  const artCanvasRef = useRef(null)

  return (
    <div className="flex flex-col w-full items-center isolate">
      <HeroSection />
      <ArtCanvas ref={artCanvasRef} />
      <MyProvider>
        <Submissions artCanvasRef={artCanvasRef} />
      </MyProvider>
      <Separator />
      <CommentsSection pagePath="/page-name" mode="standalone" />
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

### Step 1: Create directory

```bash
mkdir -p src/app/(pages)/new-page
```

### Step 2: Create page.tsx

```tsx
'use client'
import { HeroSection } from './components'
import { Separator, AcknowledgementSection } from '@/components/features/shared'
import { CommentsSection } from '@/components/features/comments'
import { acknowledgements } from './content'

export default function NewPage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      
      {/* Your content here */}
      
      <Separator />
      <CommentsSection pagePath="/new-page" mode="standalone" />
      <Separator />
      <AcknowledgementSection names={acknowledgements} />
    </div>
  )
}
```

### Step 3: Create content.ts

```typescript
// content.ts - metadata only, NO JSX
export const content = {
  title: "Page Title",
  description: {
    eng: "English description...",
    mar: "मराठी वर्णन..."
  }
}

export const acknowledgements = ["Name 1", "Name 2"]
```

### Step 4: Create components folder structure

```bash
mkdir -p src/app/(pages)/new-page/components/HeroSection
mkdir -p src/app/(pages)/new-page/ArtCanvas
```

### Step 5: Create HeroSection

```tsx
// components/HeroSection/HeroSection.tsx
import { TitleDiscription } from '@/components/features/page-title'
import { content } from '../../content'

// Place background JSX here (NOT in content.ts)
const background = <div className='h-full w-full'></div>
// OR import Background from './Background'

export function HeroSection() {
  return (
    <TitleDiscription
      title={content.title}
      description={content.description}
      background={background}
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

### Step 6: Create ArtCanvas (if needed)

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

## Refactoring Existing Pages

### Checklist

- [ ] Move main content to `ArtCanvas/`
- [ ] Move HeroSection to `components/HeroSection/`
- [ ] Create barrel files (index.ts) for each folder
- [ ] Update imports in page.tsx to use barrels
- [ ] Move content to content.ts

### Import Changes

```tsx
// Before
import { HeroSection } from './components/HeroSection'
import { MyContent } from './components/MyContent'

// After
import { HeroSection } from './components'
import { MyContent } from './ArtCanvas'
```

---

## Current Page Structures

### fathers-and-figures (Level 3)

```
├── page.tsx
├── content.ts
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
├── content.ts
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
├── content.ts
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
├── content.ts
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
- ❌ Inline content that should be in content.ts
- ❌ kebab-case folder names (use PascalCase)
