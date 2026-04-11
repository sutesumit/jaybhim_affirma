# Spec: Father-Son Stories Length and Share

## Assumptions I'm Making
1. The feature lives on the existing `fathers-and-figures` page and should not introduce a new standalone story details page.
2. The maximum story length should be raised consistently across create, edit, and server validation paths from `500` to `2500`.
3. The new share action should copy a direct URL to a specific story on the existing page using a story-specific URL target, and opening that URL should activate the correct in-page carousel slide.
4. The share action should be available on each visible story card, not only for the author of the story.
5. The submissions carousel should support touch drag or swipe interaction on smaller screens in addition to button navigation.
6. Existing visual patterns should be preserved; this is a scoped enhancement, not a redesign of the submissions experience.

## Objective
Improve the father-son-stories experience by allowing longer story submissions and making individual stories easier to share. Users should be able to write stories up to 2500 characters, browse submissions comfortably on smaller screens with swipe/drag support, and open a shared link directly into the intended story within the existing submissions carousel.

## Tech Stack
- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase-backed API routes for story persistence

## Commands
Build: `npm run build`
Lint: `npm run lint`
Dev: `npm run dev`

## Project Structure
- `src/app/(pages)/fathers-and-figures/` -> page-specific UI for the feature
- `src/app/api/father-son-stories/` -> create and list story API routes
- `src/app/api/father-son-stories/[storyId]/route.ts` -> update and delete story API route
- `src/lib/stories/` -> client-side story service calls
- `src/lib/utils/constants.ts` -> shared story length constant
- `src/types/stories.ts` -> story request and response types
- `specs/features/` -> feature specifications

## Code Style
Keep changes small and local to the story feature. Reuse shared constants and existing toast/button patterns rather than introducing a second source of truth.

```ts
if (trimmedText.length > MAX_FATHER_SON_STORY_LENGTH) {
  return NextResponse.json(
    { success: false, error: `Story exceeds maximum length of ${MAX_FATHER_SON_STORY_LENGTH} characters` },
    { status: 400 }
  );
}
```

## Testing Strategy
- Validate the longer limit through shared constant usage in create and edit flows.
- Verify the API rejects stories longer than 2500 characters and accepts stories at or below the limit.
- Verify the UI character counters show `/2500` for both new-story and edit-story experiences.
- Verify the carousel responds to touch drag or swipe gestures on smaller screens.
- Verify the share action copies a URL containing a story-specific target for the current page.
- Verify the copied link can reopen the page and activate the intended story slide.
- Run build and lint after implementation. Add automated tests only where the surrounding feature already has a practical test pattern.

## Boundaries
- Always: keep limit validation centralized through the shared constant, preserve current author-only edit/delete permissions, support both button and touch navigation for the carousel, and show user feedback for share success or failure.
- Ask first: adding a new dependency, creating a brand-new route/page for stories, or introducing a separate modal/story-detail browsing surface.
- Never: change unrelated feature styling, alter database schema, or weaken story ownership/auth rules.

## Success Criteria
- Story creation accepts input up to 2500 characters and rejects anything above that limit.
- Story editing accepts input up to 2500 characters and rejects anything above that limit.
- All visible story counters and limit messaging reflect `2500` rather than `500`.
- The submissions carousel remains button-navigable and also supports touch drag or swipe navigation on smaller screens.
- Every submission card exposes a share action that copies a direct URL for that card.
- The direct URL is derived from the current site origin/path and includes a stable story-specific target.
- Opening the copied URL on the fathers-and-figures page activates the intended story as the visible carousel slide.
- Existing refresh, edit, and delete behaviors continue to work as before.

## Open Questions
- Which URL shape should we prefer for story deep-linking in the existing page: hash-based (`#story-{id}`), query-based (`?story={id}`), or a hybrid where one drives the other internally?
