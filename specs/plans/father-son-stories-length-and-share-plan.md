# Implementation Plan: Father-Son Stories Length and Share

## Overview
Implement two scoped improvements for the `fathers-and-figures` submissions flow: raise the father-son story length cap from 500 to 2500 characters across UI and API validation, and add a story-sharing flow that opens the correct story inside the existing in-page carousel while also improving carousel interaction on smaller screens.

## Architecture Decisions
- Reuse the shared `MAX_FATHER_SON_STORY_LENGTH` constant as the single source of truth for both client and server validation.
- Keep the browsing experience in the existing page carousel rather than introducing a second modal or detail route.
- Implement story-specific links using a stable story target and wire page load state so the correct carousel slide becomes active for a shared URL.
- Extend the existing carousel with touch drag or swipe handling instead of replacing it.
- Keep the share action local to the submission card UI and use existing toast patterns for success/error feedback.

## Dependency Graph
- Shared constant update
  - API validation
  - New-story input counter and submit gating
  - Edit-story input counter and save gating
- Carousel controllable active slide
  - Shared URL parsing
  - Manual deep-link verification
- Touch gesture support
  - Mobile carousel navigation
- Share action UI
  - Clipboard interaction
  - User feedback toast

## Task List

### Phase 1: Foundation

## Task 1: Raise the shared story length limit

**Description:** Update the shared story-length constant and ensure server-side create and update validation both continue to rely on it.

**Acceptance criteria:**
- [ ] The shared story-length constant is `2500`.
- [ ] Story creation API validation rejects text longer than `2500`.
- [ ] Story update API validation rejects text longer than `2500`.

**Verification:**
- [ ] Code check: all father-son story validation references resolve to the shared constant.
- [ ] Manual check: error messages now reference `2500` if the limit is exceeded.

**Dependencies:** None

**Files likely touched:**
- `src/lib/utils/constants.ts`
- `src/app/api/father-son-stories/route.ts`
- `src/app/api/father-son-stories/[storyId]/route.ts`

**Estimated scope:** Small: 3 files

## Task 2: Update story input and edit UI for the new limit

**Description:** Ensure new-story and edit-story interfaces display the new limit and continue blocking empty or over-limit submissions using the shared constant.

**Acceptance criteria:**
- [ ] The create-story counter shows `/2500`.
- [ ] The edit-story counter shows `/2500`.
- [ ] Existing save/submit gating still prevents empty or over-limit stories.

**Verification:**
- [ ] Manual check: both counters reflect `2500`.
- [ ] Manual check: valid-length stories remain submittable and over-limit stories remain blocked.

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/(pages)/fathers-and-figures/components/MakeMyCard/components/inputStory/WriteMyCard.tsx`
- `src/app/(pages)/fathers-and-figures/components/Submissions/components/SubmissionCard.tsx`
- `src/app/(pages)/fathers-and-figures/components/MakeMyCard/components/submitDrawer/SubmitDrawer.tsx`

**Estimated scope:** Medium: 3 files

### Checkpoint: Foundation
- [ ] Shared limit is consistently `2500` across API and UI.
- [ ] No existing create/edit behavior regresses.

### Phase 2: Carousel Foundation

## Task 3: Make the carousel externally targetable by story

**Description:** Refactor the carousel integration just enough to allow the active slide to be derived from a story target in the page URL while preserving current button navigation.

**Acceptance criteria:**
- [ ] The submissions experience can derive an intended story target from the current page URL.
- [ ] The carousel can open with the targeted story as the active visible slide.
- [ ] Existing previous/next and dot navigation continue to work.

**Verification:**
- [ ] Manual check: opening the page with a targeted story URL shows that story first.
- [ ] Manual check: loading the page without a story target still opens the default first slide.

**Dependencies:** None

**Files likely touched:**
- `src/components/ui/carousel.tsx`
- `src/app/(pages)/fathers-and-figures/components/Submissions/Submissions.tsx`
- `src/app/(pages)/fathers-and-figures/components/Submissions/components/SubmissionCard.tsx`

**Estimated scope:** Medium: 3 files

## Task 4: Add touch drag or swipe support to the carousel

**Description:** Improve the existing carousel interaction on smaller screens by allowing touch drag or swipe gestures to move between story cards without removing the existing button controls.

**Acceptance criteria:**
- [ ] Users can navigate between slides with touch drag or swipe gestures on smaller screens.
- [ ] Existing button and dot navigation continue to work.
- [ ] Swipe handling does not cause accidental slide changes on minor taps.

**Verification:**
- [ ] Manual check: swipe left and right changes slides on a touch-sized viewport.
- [ ] Manual check: tap-only interactions do not unintentionally advance the carousel.

**Dependencies:** Task 3

**Files likely touched:**
- `src/components/ui/carousel.tsx`

**Estimated scope:** Small: 1 file

### Checkpoint: Carousel Foundation
- [ ] Shared URLs can select the correct active story.
- [ ] Mobile navigation is improved without regressing existing controls.
- [ ] Story browsing still works for owners and non-owners.

### Phase 3: Share Flow

## Task 5: Add per-card share action and clipboard copy behavior

**Description:** Add a share button to each submission card that copies a story-specific URL for the current page and relies on the new carousel targeting behavior to open the correct story.

**Acceptance criteria:**
- [ ] Each submission card exposes a share action.
- [ ] Activating the share action copies a URL for the current page that targets the current story.
- [ ] Users receive visible success or failure feedback after the copy attempt.

**Verification:**
- [ ] Manual check: copied text matches the current page URL plus the story-specific target.
- [ ] Manual check: opening the copied URL shows the intended story as the active slide.
- [ ] Manual check: success toast appears on copy success and error feedback appears on failure.

**Dependencies:** Task 3

**Files likely touched:**
- `src/app/(pages)/fathers-and-figures/components/Submissions/components/SubmissionCard.tsx`
- `src/app/(pages)/fathers-and-figures/components/Submissions/hooks/useStories.ts`
- `src/lib/stories/story-service.ts`

**Estimated scope:** Medium: 3 files

### Checkpoint: Share Flow
- [ ] Shared links copy correctly for multiple cards.
- [ ] Opening a shared link lands on the intended story slide.
- [ ] Edit/delete controls still work for owners.
- [ ] Non-owners can still share stories.

### Phase 4: Verification

## Task 6: Run validation and document any remaining limitation

**Description:** Verify the feature against the updated spec with project commands and record any remaining limitation, especially around touch behavior and deep-link targeting.

**Acceptance criteria:**
- [ ] Relevant manual checks for length and share behavior are completed.
- [ ] Relevant manual checks for touch carousel behavior are completed.
- [ ] Project validation commands are run successfully, or failures are documented accurately.
- [ ] Any remaining limitation around story deep-linking or touch navigation is explicitly noted.

**Verification:**
- [ ] Lint passes: `npm run lint`
- [ ] Build passes: `npm run build`
- [ ] Manual check: copied shared URL opens the intended active story slide.

**Dependencies:** Tasks 1-5

**Files likely touched:**
- No code changes required unless verification reveals a bug

**Estimated scope:** Small: 0-1 files

### Checkpoint: Complete
- [ ] All success criteria from the spec are satisfied or explicitly called out as deferred.
- [ ] The implementation is ready for code review.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| URL-targeted slide selection could fight with the carousel's internal default state | Medium | Refactor the carousel to accept an explicit initial or controlled active index |
| Touch gestures may feel too sensitive or interfere with taps | Medium | Use a clear swipe threshold and verify on touch-sized viewports |
| Share behavior may fail in unsupported clipboard contexts | Low | Use existing toast/error patterns and provide clear failure feedback |
| Validation may drift between create and edit paths | Medium | Keep all checks tied to the shared constant and verify both API routes |

## Open Questions
- Which URL shape should we standardize on for story targeting in the existing page: hash-based, query-based, or a hybrid mapping between them?
