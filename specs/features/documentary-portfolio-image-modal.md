# Spec: Documentary Portfolio Image Modal

## Objective

Add an image detail modal to the documentary portfolio page that:
- Displays a specific image with full metadata from the gallery
- Provides a shareable deep link via URL query parameter (`?image=filename`)
- Includes action buttons: disabled "Buy Photo" placeholder, disabled "Like" placeholder (non-functional for now), and working "Share" (copies URL to clipboard)
- Pauses the slideshow when open, restores previous play state on close
- Can be triggered directly via URL or via button in the InfoCard

**User Stories:**
- As a visitor, I can click "Buy Photo" in the InfoCard to view the image in a larger modal with metadata
- As a visitor, I can copy a shareable link to a specific image in the portfolio
- As a visitor, when the modal is open, the background slideshow is paused so I can focus on the image

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **UI Library:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS + custom CSS variables (`--primary-blue`, `--primary-white`)
- **Animations:** Framer Motion (already used in gallery)
- **Icons:** Lucide React
- **Language:** TypeScript

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run typecheck
```

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   └── documentary-portfolio/
│   │       ├── page.tsx                    # Portfolio page (adds modal root + URL effect)
│   │       ├── imageList.ts                # GalleryImage type + image loading
│   │       └── components/
│   │           ├── DocumentaryGallery/
│   │           │   └── DocumentaryGallery.tsx  # Add modal state + pause logic
│   │           ├── InfoCard/
│   │           │   └── InfoCard.tsx           # Add "Buy Photo" trigger button
│   │           └── ImageModal/               # NEW: Modal component
│   │               └── ImageModal.tsx
└── components/
    └── ui/
        └── dialog.tsx                       # Already exists (custom styled Dialog)
```

Files to create/modify at a glance:
- **Create:** `src/app/(pages)/documentary-portfolio/components/ImageModal/ImageModal.tsx`
- **Modify:** `DocumentaryGallery.tsx` (modal state, pause/restore, URL sync, modal render)
- **Modify:** `InfoCard.tsx` (add Buy Photo button)
- **Modify:** `page.tsx` (optional: handle initial URL query to open modal on load)

## Code Style

**General pattern:**
- Components are client-side (`"use client"`) when using state/effects
- Props typed with TypeScript interfaces
- Tailwind utility classes with custom CSS variables for brand colors
- Framer Motion for animations where appropriate
- shadcn/ui primitives as base (Dialog, Button) then custom styling

**Example button style (from GalleryControls/IconButton):**
```tsx
<button 
  className="comment-tiny-button"
  onClick={handleClick}
  aria-label="Buy photo"
>
  <ShoppingBag className="w-4 h-4" />
</button>
```

**Dialog usage (existing pattern):**
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <Gradient1 hoverOn={true} className="relative">
      {/* modal body */}
    </Gradient1>
  </DialogContent>
</Dialog>
```

## Testing Strategy

**Framework:** Manual + visual verification (no test framework specified in repo). If tests exist, use Jest + React Testing Library.

**Test Levels:**
- Unit: N/A (mostly UI integration)
- Integration: Verify modal opens on button click, pauses gallery, copies share URL
- E2E (if available): Open URL with `?image=...` directly shows correct modal

**Manual Test Cases:**
1. Click "Buy Photo" in InfoCard → Modal opens with correct image and metadata
2. Gallery slideshow is paused when modal opens
3. Close modal → Gallery resumes if it was playing before, stays paused if it was paused
4. Click "Share" → URL copied to clipboard, toast appears ("Link Copied")
5. Visit `/documentary-portfolio?image=<some-filename>` directly → Modal opens automatically on that image
6. Buy button is present but disabled (grayed out, no action)
7. Like button is present but disabled (grayed out, no action)
8. Modal respects aspect ratio (image not stretched)
9. On mobile, modal is usable (responsive)

## Boundaries

- **Always:**
  - Use existing Dialog component (don't create new modal from scratch)
  - Reuse existing UI patterns (button styles, IconButton, toast)
  - Preserve image aspect ratio (use Next.js Image with `fill` and `object-cover` or aspect containers)
  - Pause/resume slideshow correctly (store previous play state)
  - Share URL must include the `image` query parameter

- **Ask first:**
  - Changing Dialog component styling (affects other modals)
  - Modifying the GalleryImage type or image loading logic
  - Adding new dependencies (not needed here)

- **Never:**
  - Commit secrets or hard-coded credentials
  - Remove or disable existing tests without approval
  - Change the existing InfoCard layout in ways that break other sections

## Success Criteria

- [ ] Modal opens from "Buy Photo" button inside InfoCard
- [ ] Modal displays: full-width/height image (aspect-preserved), all metadata fields below
- [ ] Buy button renders as disabled with `ShoppingBag` icon (placeholder)
- [ ] Like button renders as disabled with `Heart` icon (placeholder)
- [ ] Share button copies current URL with `?image=<filename>` to clipboard
- [ ] Share action shows success toast ("Link Copied" + description)
- [ ] Gallery slideshow pauses when modal opens
- [ ] Gallery slideshow restores to previous state (playing/paused) when modal closes
- [ ] Visiting `/documentary-portfolio?image=filename.jpg` directly opens modal on that image
- [ ] Modal closes via (a) close button (X), (b) overlay click, (c) Escape key
- [ ] URL query param is cleared when modal closes (optional: or kept if user shares from open modal)
- [ ] If `?image=` points to non-existent image, either fall back gracefully or show error toast
- [ ] Modal UI follows existing design language (Gradient1, card-bg, card-shadow, rounded-sm, font-rajdhani)

## Open Questions

1. **Should the URL `?image=` query param persist while modal is open** (so user can refresh or share from open state) or should it be cleared on close? Currently leaning: keep it while open, clear on close to avoid stale state.
2. **What if multiple `?image=` params?** Should only first be used.
3. **Share UX feedback:** The existing Submissions share uses toast "Link Copied — The link is with you now. Pass it along." Should we use same toast message?
4. **Like placeholder:** Disabled button visually only (opacity-50, cursor-not-allowed)? Or completely hidden? Pro: visible placeholder communicates future feature.
5. **Buy placeholder:** Disabled button with tooltip "Coming soon"? Or just visually obscured?
6. **Modal width:** Centered card, but what max-width? Existing InfoCard uses `max-w-[400px]`. Image modal may need wider for large images. Suggested: `max-w-4xl` or `max-w-5xl` with responsive scaling.

## Desired Skill Use Per Phase

- **Spec Phase:** `spec-driven-development` (this spec)
- **Planning Phase:** `planning-and-task-breakdown` → decompose into subtasks (modal component, gallery state, URL sync, InfoCard button)
- **Implementation Phase:** 
  - `incremental-implementation` → thin vertical slices (state first, then UI, then URL, then share/like)
  - `test-driven-development` → write minimal tests for hooks/effects before UI (if test framework exists)
- **Review Phase:** `code-review-and-quality` → before committing, run lint/typecheck, review across 5 axes
- **Git Phase:** `git-workflow-and-versioning` → atomic commits per task, descriptive messages
