# Implementation Plan: Documentary Portfolio Image Modal

## Overview

Build an image detail modal for the documentary portfolio page that displays a single image with full metadata, provides shareable deep links via URL query parameter, pauses the background slideshow when open, and includes placeholder buttons for Buy and Like alongside a working Share button. The modal triggers from inside the existing InfoCard and respects the gallery's play state on close.

## Architecture Decisions

- **Modal state ownership:** Lift modal `open` and `selectedImage` state to `DocumentaryGallery` component (owns slideshow state already). This allows direct pause/resume control and image selection without prop drilling.
- **URL as source of truth:** Read `?image=` query param from router on mount and on change to open/close modal and select image. Sync back to URL on open (set param) and clear on close (replace state).
- **Dialog reuse:** Extend existing `Dialog` component (`src/components/ui/dialog.tsx`) — already styled with Gradient1/DotGrid. Create `ImageModal` as `DialogContent` child; no new modal library.
- **Share pattern:** Clone `handleShareStory` logic from fathers-and-figures page — copy current URL with `?image=<filename>` to clipboard, show toast.
- **Placeholder buttons:** Render `Button` components with `disabled` prop and reduced opacity; no click handlers.
- **Metadata display:** Use stacked DefinitionLists (dt/dd) or simple div rows with labels; all GalleryImage fields displayed except filename.
- **Aspect ratio:** Use Next.js `Image` with `fill` and `object-contain` inside a fixed-height container (e.g. `max-h-[70vh]`) to preserve aspect ratio while fitting in viewport.

## Task List

### Phase 1: Modal Component & Basic Integration

#### Task 1: Create ImageModal component (standalone UI)
**Description:** Build the modal content component that displays the large image, metadata section, and action buttons (Buy, Like, Share). It receives `image` (GalleryImage), `onClose` callback, and `isOpen` state.

**Acceptance criteria:**
- [ ] Component renders without crashing when passed a GalleryImage
- [ ] Image displays with Next.js `<Image src={image.src} alt={image.alt} fill className="object-contain" />`
- [ ] Container has `max-h-[70vh]` to fit in viewport while preserving aspect ratio
- [ ] Metadata section shows: year, caption, organization, camera, lens, exposure, iso, focalLength (each as labeled rows)
- [ ] Action buttons row contains: Buy (disabled, ShoppingBag icon), Like (disabled, Heart icon), Share (enabled, Share2 icon)
- [ ] Close button (X) in top-right corner works (calls `onClose`)
- [ ] Modal uses existing Dialog styling pattern (DialogContent + Gradient1 wrapper)
- [ ] Responsive: buttons stack or remain inline on small screens

**Verification:**
- [ ] Import and render `ImageModal` in a test page or temporarily in `DocumentaryGallery` to visually verify layout
- [ ] No TypeScript errors; image props typed correctly
- [ ] Build succeeds: `npm run build`

**Dependencies:** None (pure UI component)

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/ImageModal/ImageModal.tsx` (create)
- Note: temporary test render in `DocumentaryGallery.tsx` for verification

**Estimated scope:** S (one new component file)

---

#### Task 2: Add modal state to DocumentaryGallery
**Description:** Introduce `modalOpen` (boolean) and `selectedImage` (GalleryImage | null) state to `DocumentaryGallery`. Provide `openModal(image)` and `closeModal()` handlers. Implement pause-on-open logic.

**Acceptance criteria:**
- [ ] `DocumentaryGallery` maintains `const [modalOpen, setModalOpen] = useState(false)` and `const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)`
- [ ] `openModal(image)` sets `selectedImage` and `setModalOpen(true)`, and sets `isSlideShowPlaying` to `false` (pauses slideshow) while storing the previous play state in a ref
- [ ] `closeModal()` sets `modalOpen` false and restores `isSlideShowPlaying` to the stored previous value (playing or paused)
- [ ] Previous play state is tracked via `useRef<boolean | null>` so nested open/close toggles don't lose state
- [ ] Modal state is passed to `ImageModal` as `open={modalOpen} onClose={closeModal} image={selectedImage}`

**Verification:**
- [ ] Unit-agnostic: manually click a temporary button that calls `openModal(images[0])` → slideshow stops
- [ ] Close modal → slideshow resumes only if it was playing before
- [ ] No TypeScript errors; state types correct

**Dependencies:** Task 1 (component exists)

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/DocumentaryGallery/DocumentaryGallery.tsx`

**Estimated scope:** M (state logic in existing component)

---

#### Task 3: Integrate Dialog wrapper in DocumentaryGallery
**Description:** Wrap `ImageModal` in the existing `Dialog` component and control its `open` prop from `modalOpen` state. Ensure `Dialog` uses controlled mode (not `DialogTrigger` since trigger is inside InfoCard).

**Acceptance criteria:**
- [ ] `Dialog` imported from `@/components/ui/dialog`
- [ ] Rendered conditionally: `<Dialog open={modalOpen} onOpenChange={(open) => !open && closeModal()}>`
- [ ] `DialogContent` wraps `ImageModal`
- [ ] Modal opens/closes with animation (existing Dialog behavior)
- [ ] Close on overlay click and Escape key work automatically via Radix

**Verification:**
- [ ] Trigger `openModal()` from a temporary test button → dialog appears
- [ ] Clicking outside or pressing Escape closes dialog and calls `closeModal()`
- [ ] Gallery pause/resume still works

**Dependencies:** Tasks 1, 2

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/DocumentaryGallery/DocumentaryGallery.tsx`

**Estimated scope:** S (Dialog wrapper in same file)

---

### Phase 2: Trigger & Selection

#### Task 4: Add "Buy Photo" button to InfoCard
**Description:** Modify `InfoCard` to include a "Buy Photo" button at the bottom. The button triggers `onOpenModal` callback passed from parent.

**Acceptance criteria:**
- [ ] InfoCard accepts new prop: `onOpenModal?: (image: GalleryImage) => void`
- [ ] Button renders inside the existing card, below content (after the section content)
- [ ] Button style matches existing buttons (use `Button` from `@/components/ui/button` or `comment-tiny-button` if appropriate) with `ShoppingBag` icon
- [ ] Button has `aria-label="Buy photo"` and `type="button"`
- [ ] On click, calls `onOpenModal(data)` where `data` is the current image object
- [ ] Button is visible and not disabled (intentionally active; modal logic handles rest)

**Verification:**
- [ ] In DocumentaryGallery, pass `openModal` to InfoCard as prop
- [ ] Clicking "Buy Photo" opens modal on the current image
- [ ] Button aligned and spaced correctly within InfoCard

**Dependencies:** Task 2 (openModal handler exists)

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/InfoCard/InfoCard.tsx`
- `src/app/(pages)/documentary-portfolio/components/DocumentaryGallery/DocumentaryGallery.tsx` (pass prop)

**Estimated scope:** S

---

#### Task 5: Wire InfoCard button to open modal for current image
**Description:** Ensure GalleryControls passes `openModal` to InfoCard, and that InfoCard's button calls it with the correct image object.

**Acceptance criteria:**
- [ ] GalleryControls no longer controls modal state directly; it receives `openModal` from DocumentaryGallery
- [ ] When InfoCard is visible and button clicked, `openModal(currentImage)` is called
- [ ] Modal opens with the exact image currently displayed in the slideshow

**Verification:**
- [ ] Toggle InfoCard visible (captions section), click "Buy Photo" → modal opens on current image
- [ ] If multiple images scrolled through, clicking from InfoCard opens modal on the image that was visible at that moment

**Dependencies:** Tasks 2, 4

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/GalleryControls/GalleryControls.tsx`
- `src/app/(pages)/documentary-portfolio/components/DocumentaryGallery/DocumentaryGallery.tsx` (prop drilling)

**Estimated scope:** XS

---

### Phase 3: URL Query Handling

#### Task 6: Sync modal state to URL query parameter
**Description:** Integrate Next.js `useRouter` and `useSearchParams` to make modal state reflected in URL: opening modal sets `?image=<filename>`; closing clears it (using `replace` to avoid history push).

**Acceptance criteria:**
- [ ] Router and useSearchParams imported from `next/navigation`
- [ ] `useEffect` on `modalOpen` and `selectedImage`: when modal opens, update search params (`router.push` or `router.replace`) to `?image=<filename>`
- [ ] When modal closes, clear query param using `router.replace({ search: '' })` or equivalent
- [ ] URL updates are debounced or batched to avoid excessive router pushes
- [ ] Modal opens and closes without causing page reload or flicker

**Verification:**
- [ ] Open modal from button → URL becomes `/documentary-portfolio?image=filename.jpg`
- [ ] Close modal → URL returns to `/documentary-portfolio` (no query param)
- [ ] Browser back/forward while modal open navigates appropriately (not required for MVP but should not break)

**Dependencies:** Task 2 (modal state)

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/DocumentaryGallery/DocumentaryGallery.tsx`

**Estimated scope:** M

---

#### Task 7: Deep link support — open modal on initial load from URL
**Description:** On component mount, read `image` query param. If present and corresponds to a valid image in `images`, open modal on that image automatically.

**Acceptance criteria:**
- [ ] On mount, read `searchParams` (or `useSearchParams` hook)
- [ ] If `image` param exists and matches `images[i].filename`, set `selectedImage` to that image and `modalOpen` to true
- [ ] If `image` param does not match any image, ignore (no modal, no error)
- [ ] Modal opens on load with proper image pre-selected; slideshow auto-pauses

**Verification:**
- [ ] Navigate directly to `/documentary-portfolio?image=some-existing-filename.jpg` → modal opens with that image
- [ ] Navigate to `/documentary-portfolio?image=unknown.jpg` → page loads without modal; no error thrown
- [ ] Modal still pauses slideshow on auto-open

**Dependencies:** Task 2 (modal state), Task 6 (URL sync)

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/page.tsx` (since searchParams available at page level in App Router)
- OR `DocumentaryGallery` reads `useSearchParams` — need to verify which approach fits Next.js patterns

**Estimated scope:** M

---

### Phase 4: Share & Like Placeholders

#### Task 8: Implement Share button with clipboard copy
**Description:** Add working Share button that copies current URL (with `?image=` if modal open) to clipboard and shows success toast.

**Acceptance criteria:**
- [ ] Share button in ImageModal calls `handleShare()` function
- [ ] `handleShare` uses `navigator.clipboard.writeText(window.location.href)` to copy full current URL
- [ ] On success, calls `toast({ variant: "success", title: "Link Copied", description: "The link is with you now. Pass it along." })`
- [ ] On failure (clipboard error), shows error toast ("Copy Failed — Couldn't copy the link. Try again?")
- [ ] Button disabled state matches: disabled (like/buy) vs enabled (share)
- [ ] Share works both when modal is open and when triggered from InfoCard? (Not needed: Share inside modal only)

**Verification:**
- [ ] Click Share → clipboard contains full URL
- [ ] Toast appears with correct message
- [ ] No console errors on clipboard success/failure

**Dependencies:** Task 1 (button placed in ImageModal)

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/ImageModal/ImageModal.tsx`
- May need to import `useToast` from `@/hooks/use-toast`

**Estimated scope:** S

---

#### Task 9: Add disabled Like button placeholder
**Description:** Render a disabled Like button (Heart icon) in ImageModal with visual placeholder state. No functionality (no ProtectedActionDrawer, no toggle logic).

**Acceptance criteria:**
- [ ] Like button appears next to Share and Buy
- [ ] Button has `disabled` prop and reduced opacity (`opacity-50`, `cursor-not-allowed`)
- [ ] Uses `Heart` icon from lucide-react
- [ ] `aria-label="Like this image"` for accessibility
- [ ] No click handler (or `onClick` is no-op)
- [ ] Visual state consistent with disabled Button component

**Verification:**
- [ ] Button appears grayed-out
- [ ] Clicking it does nothing; no toast; no network request
- [ ] Layout stable (doesn't shift on disabled)

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/ImageModal/ImageModal.tsx`

**Estimated scope:** XS

---

#### Task 10: Add disabled Buy button placeholder
**Description:** Render a disabled Buy button (ShoppingBag icon) in ImageModal with placeholder visual.

**Acceptance criteria:**
- [ ] Buy button appears next to Like and Share
- [ ] Button has `disabled` prop and reduced opacity
- [ ] Uses `ShoppingBag` (or `CreditCard`?) icon from lucide-react
- [ ] `aria-label="Buy photo"` for accessibility
- [ ] No click handler
- [ ] Consistent with disabled Button styling

**Verification:**
- [ ] Button appears grayed-out
- [ ] No action on click

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/ImageModal/ImageModal.tsx`

**Estimated scope:** XS

---

### Phase 5: Metadata Display Polish

#### Task 11: Render all metadata fields in modal
**Description:** Ensure ImageModal displays every field from GalleryImage type with proper formatting and labels.

**Acceptance criteria:**
- [ ] Shown fields: Year, Caption, Organization, Camera, Lens, Exposure, ISO, Focal Length
- [ ] Layout: two-column grid on desktop (label | value), single column on mobile
- [ ] If a field is empty string or undefined, hide that row (or show placeholder like "—")
- [ ] Use consistent typography (font-rajdhani or inherited from Dialog)
- [ ] Section heading "Image Details" optional, or just clean list
- [ ] Metadata text is selectable (user can copy-paste details)

**Verification:**
- [ ] Inspect modal for a sample image with all fields populated → all visible and aligned
- [ ] Inspect modal for image missing some optional fields → missing fields collapse/hide gracefully
- [ ] Text readable against Gradient1 background

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/ImageModal/ImageModal.tsx`

**Estimated scope:** S

---

#### Task 12: Ensure aspect ratio preservation and responsive sizing
**Description:** Tune the image container so that images display at natural aspect ratio without cropping or excessive whitespace.

**Acceptance criteria:**
- [ ] Container uses `relative w-full aspect-square`? No — instead compute aspect ratio or use `max-h-[70vh]` with `object-contain`
- [ ] For very tall/narrow images, max-height constraint prevents overflow; horizontal centering maintained
- [ ] For very wide images, height caps, width may overflow horizontally? Should clip or allow horizontal scroll? Minimum: image fits within modal without cropping
- [ ] `overflow-auto` on image container if image exceeds bounds (in both dimensions)
- [ ] Mobile: modal full-screen or near-full, image scaled appropriately

**Verification:**
- [ ] Test with sample images of various aspect ratios (portrait, landscape, square) → all visible fully
- [ ] No horizontal scroll on desktop unless necessary; no vertical overflow beyond viewport
- [ ] Touch scrolling works on mobile if needed

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/ImageModal/ImageModal.tsx`

**Estimated scope:** S

---

### Phase 6: End-to-End & Polish

#### Task 13: Disable InfoCard buttons while modal open (optional polish)
**Description:** While the modal is open, the InfoCard actions (Experience/Comments/Captions toggles) could be disabled to prevent UI confusion. Not strictly required but improves UX.

**Acceptance criteria:**
- [ ] When `modalOpen` is true, IconButtons in GalleryControls are disabled (`disabled` prop)
- [ ] Visual feedback: reduced opacity on disabled state matches existing button disabled style
- [ ] Toggling InfoCard sections while modal open has no effect (or closes modal if attempted)

**Verification:**
- [ ] Open modal → try clicking play/pause, info toggles → no action
- [ ] Close modal → controls re-enabled

**Dependencies:** Task 2 (modalOpen state available)

**Files likely touched:**
- `src/app/(pages)/documentary-portfolio/components/GalleryControls/GalleryControls.tsx`

**Estimated scope:** XS

---

#### Task 14: Edge cases & error handling
**Description:** Handle scenarios like missing image data, malformed URL, rapid open/close, and clipboard failure gracefully.

**Acceptance criteria:**
- [ ] If `selectedImage` is null when modal tries to render, show fallback "Image not found" message or prevent render
- [ ] Rapid clicking of Buy button does not cause state errors (debounce not required, but React should handle)
- [ ] Clipboard failure toast already in Task 8; ensure no uncaught errors
- [ ] Modals closed via Escape or overlay click properly restore slideshow state (already in Task 2)

**Verification:**
- [ ] Stress test: quickly open/close modal multiple times → no errors, slideshow state consistent
- [ ] Simulate clipboard denied (if possible): error toast appears

**Dependencies:** Tasks 2, 8

**Files likely touched:**
- `DocumentaryGallery.tsx`, `ImageModal.tsx` (guards)

**Estimated scope:** S

---

#### Task 15: Final verification & styling consistency
**Description:** Run visual QA across breakpoints, ensure all success criteria met, run lint/typecheck.

**Acceptance criteria:**
- [ ] All success criteria from spec satisfied
- [ ] `npm run lint` passes with no new errors
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Modal under 200 lines of code (aim for simplicity)
- [ ] No new console warnings in browser

**Verification:**
- [ ] Manual test matrix (all test cases from spec):
  - Open from InfoCard → modal, pause, metadata, buttons
  - Share → copies URL, toast
  - Close → restore slideshow state
  - Direct URL → opens modal
  - Invalid image URL → no modal, no crash
  - Disabled buttons do nothing
- [ ] Test responsive: mobile (375px), tablet (768px), desktop (1440px)

**Dependencies:** All prior tasks

**Files likely touched:** None (verification only)

**Estimated scope:** M (validation work)

---

## Checkpoints

### Checkpoint 1: After Task 3 — Dialog renders
- [ ] ImageModal component can be launched from a temporary dev-only button
- [ ] Image displays with correct aspect ratio
- [ ] Close button works; slideshow pause logic tested
- [ ] No build or style errors

### Checkpoint 2: After Task 7 — Deep links work
- [ ] Visiting `/documentary-portfolio?image=<filename>` directly opens the modal
- [ ] Modal selects the correct image from the list
- [ ] Closing the modal restores previous slideshow state
- [ ] URL updates correctly on open/close

### Checkpoint 3: After Task 10 — Action buttons present
- [ ] All three buttons (Buy, Like, Share) visible in modal
- [ ] Buy/Like are disabled with correct styling
- [ ] Share button wired and logs to clipboard (toast shows)
- [ ] Manual test: open modal → copy link → verify clipboard content

### Checkpoint 4: After Task 12 — Metadata polished
- [ ] All metadata fields render without layout shift
- [ ] Empty fields don't leave large gaps
- [ ] Modal is usable on mobile (no overflow, text readable)
- [ ] Aspect ratio maintained for landscape and portrait images

### Checkpoint 5: Final
- [ ] All acceptance criteria met
- [ ] Spec success criteria all satisfied
- [ ] Lint/typecheck/build clean
- [ ] Ready for code review

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `useSearchParams` conflicts with server component `page.tsx` | High | Use client-side only in `DocumentaryGallery` (already `"use client"`), pass initial image from page via prop or use `useEffect` with `useSearchParams` inside `DocumentaryGallery` |
| `<Image fill>` in Dialog may overflow `DialogContent` max-width | Medium | Set explicit `max-w-4xl` on DialogContent; use `object-contain` on image; container with `overflow-auto` |
| Modal width too narrow on desktop for large images | Medium | Increase `max-w-` on DialogContent; test with largest image in set |
| Like/Buy placeholder visibility vs. clutter | Low | Disabled state with subtle tooltip "Coming soon" to communicate intent |
| Pause/resume state gets out of sync on rapid open/close | Low | Use ref to store previous state; close handler always reads ref before restoring |
| Clipboard API unavailable in some browsers | Low | Fallback: select+copy via hidden textarea (not MVP); error toast already planned |

---

## Open Questions

1. **Modal width:** What max-width? Options: `max-w-4xl` (~56rem), `max-w-5xl` (~64rem), or `max-w-3xl` (~48rem)? Recommend `max-w-4xl` for balance.
2. **Buy/Like button visual:** Should they include tooltips ("Buy prints — coming soon", "Like — coming soon") or just appear disabled? Suggestion: tooltips clarify intent without clutter.
3. **Metadata order:** What should be the display order? Pro: Year, Caption, Organization, Camera, Lens, Exposure, ISO, FocalLength.
4. **Share button placement:** In ImageModal, place Share at far right, Like middle, Buy left? Or all centered? Suggestion: left-to-right: Buy, Like, Share (end aligns with close button).
5. **Should closing by overlay click restore slideshow state?** Yes, same as close button — already in Task 2 if using `onOpenChange`.

---

## Desired Skill Use Per Implementation

Per spec guidance:
- **Tasks 1–3:** `incremental-implementation` (build modal UI then integrate then pause/resume)
- **Tasks 4–5:** `incremental-implementation` (trigger button then wire it)
- **Tasks 6–7:** `incremental-implementation` (URL sync first, deep link second)
- **Tasks 8–10:** `incremental-implementation` (Share implemented first, then disabled buttons added)
- **Tasks 11–12:** `incremental-implementation` (metadata layout then aspect ratio tuning)
- **Tasks 13–15:** `code-review-and-quality` (final QA before commit)
- **Testing:** Manual integration tests; no unit test framework clearly present in repo. If tests exist, use `test-driven-development` per phase.
