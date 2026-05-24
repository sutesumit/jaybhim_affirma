# Project Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Layer Architecture](#layer-architecture)
4. [Component Organization](#component-organization)
5. [Import Conventions](#import-conventions)
6. [Migration Summary](#migration-summary)
7. [Pros and Cons Analysis](#pros-and-cons-analysis)
8. [Guidelines](#guidelines)
9. [Interaction Flow Patterns](#interaction-flow-patterns)
10. [Future Considerations](#future-considerations)
11. [Conclusion](#conclusion)

---

## Overview

This document describes the refactored architecture of the Jaybhim Affirma project. The codebase is a **Next.js 15 + Supabase** documentary/art portfolio with authentication, interactive features (likes, comments), and multimedia content.

### Tech Stack
- **Framework**: Next.js 15.5.8 (App Router)
- **UI**: React 19, Tailwind CSS, shadcn/ui (Radix UI)
- **Third-party**: aceternity UI components
- **Backend**: Supabase (Auth, Database)
- **Animation**: Framer Motion, Motion
- **Notifications**: Grammy (Telegram Bot API)

---

## Directory Structure

```
src/
├── app/                           # Layer 1: Next.js App Router
│   ├── (pages)/                  # Route groups (features)
│   │   ├── artist-statement/
│   │   ├── documentary-portfolio/
│   │   ├── fathers-and-figures/
│   │   ├── home-photobook/
│   │   ├── homing-home/
│   │   ├── lunchboxes/
│   │   ├── marathi-short-stories/
│   │   └── niranjan-in-a-city/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── comments/
│   │   ├── likes/
│   │   ├── father-son-stories/
│   │   ├── analytics/
│   │   ├── top-user/
│   │   └── visit/
│   ├── context/                  # App-level React contexts
│   ├── my_components/            # Page-specific content (legacy, being phased out)
│   └── globals.css
│
├── components/                   # Layer 2: Shared Components
│   ├── ui/                      # shadcn/ui primitive components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── input.tsx
│   │   ├── toast.tsx
│   │   └── ... (14 files total)
│   │
│   ├── vendor/                  # Third-party wrappers
│   │   └── aceternity-ui/      # aceternity components
│   │       ├── evervault-card.tsx
│   │       ├── link-preview.tsx
│   │       ├── svg-mask-effect.tsx
│   │       └── index.ts
│   │
│   └── features/                # Complete feature modules
│       ├── header/              # Navigation header
│       │   ├── header.tsx
│       │   ├── navigation/
│       │   ├── dropdown-menu/
│       │   ├── menu-context/
│       │   └── index.ts
│       │
│       ├── footer/              # Site footer
│       │   ├── footer.tsx
│       │   ├── account-badge.tsx
│       │   ├── get-history-month-count.ts
│       │   ├── use-session-timer.ts
│       │   └── index.ts
│       │
│       ├── auth-card/           # Authentication UI
│       │   ├── auth-card.tsx
│       │   ├── user-session-card.tsx
│       │   ├── components/
│       │   ├── inputs/
│       │   ├── hooks/
│       │   └── index.ts
│       │
│       ├── protected/           # Auth protection wrappers
│       │   ├── protected-auth-wrapper.tsx
│       │   ├── protected-action-drawer.tsx
│       │   └── index.ts
│       │
│       ├── likes/               # Like functionality
│       │   ├── like-counter.tsx
│       │   ├── odometer-count.tsx
│       │   ├── hooks/
│       │   └── index.ts
│       │
│       ├── comments/            # Comments functionality
│       │   ├── comments-section.tsx
│       │   ├── comment-input.tsx
│       │   ├── comment-item.tsx
│       │   ├── comment-content.tsx
│       │   ├── comments-list.tsx
│       │   ├── anonymous-toggle.tsx
│       │   ├── hooks/
│       │   └── index.ts
│       │
│       ├── page-title/         # Page title & description
│       │   ├── title-description.tsx
│       │   ├── language-switch.tsx
│       │   ├── jumper.tsx
│       │   └── index.ts
│       │
│       ├── flipbook/            # Page flip animation
│       │   ├── flipbook.tsx
│       │   ├── page-flip.tsx
│       │   └── index.ts
│       │
│       ├── shared/              # Shared utilities
│       │   ├── artist-bio-popup.tsx
│       │   ├── separator.tsx
│       │   ├── chakra-cursor.tsx
│       │   ├── cursor-dot.tsx
│       │   ├── gradient-1.tsx
│       │   ├── navigation-progress-bar.tsx
│       │   ├── acknowledgement-section.tsx
│       │   └── index.ts
│       │
│       └── index.ts            # Main barrel file
│
├── lib/                        # Layer 3: Business Logic
│   ├── supabase/              # Supabase clients
│   │   ├── client.ts          # Browser client
│   │   ├── server.ts          # Server client
│   │   └── index.ts
│   │
│   ├── auth/                  # Auth services
│   │   ├── auth-manager.ts
│   │   ├── auth-service.ts
│   │   ├── auth-validator.ts
│   │   └── auth-types.ts
│   │
│   ├── comments/              # Comment service
│   │   ├── comment-service.ts
│   │   └── constants.ts
│   │
│   ├── likes/                 # Like service
│   │   └── like-service.ts
│   │
│   ├── stories/               # Story service
│   │   └── story-service.ts
│   │
│   ├── notifications/        # Telegram notification system
│   │   ├── telegram-notifier.ts
│   │   ├── formatters.ts
│   │   ├── helpers.ts
│   │   └── types.ts
│   │
│   ├── telegram/            # Grammy bot singleton
│   │   ├── bot.ts
│   │   └── middleware/
│   │       └── auth.ts
│   │
│   ├── visit/               # Visit tracking service
│   │   ├── service.ts
│   │   ├── repository.ts
│   │   └── types.ts
│   │
│   ├── utils/                # Utilities
│   │   ├── cn.ts             # classnames utility
│   │   ├── constants.ts
│   │   └── index.ts
│   │
│   └── utils.ts              # Legacy (being migrated)
│
├── hooks/                      # Global React hooks
│   ├── use-toast.ts
│   ├── use-auto-resize-textarea.ts
│   ├── use-download-image.ts
│   ├── use-mouse-position.ts
│   ├── use-random-rotation.ts
│   └── index.ts
│
├── utils/                      # Pure utilities
│   ├── html2canvas-utils.ts
│   └── index.ts
│
├── types/                      # TypeScript definitions
│   ├── analytics.ts
│   ├── comments.ts
│   ├── likes.ts
│   ├── stories.ts
│   └── index.ts
│
└── auth/                       # Auth React components
    ├── auth-context.tsx
    ├── types.ts
    └── index.ts
```

---

## Layer Architecture

The project uses a **3-layer architecture** to separate concerns:

```
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 1: APP LAYER (Next.js App Router)                         │
│  Location: src/app/                                                │
│                                                                     │
│  Contains:                                                         │
│  - Pages (src/app/(pages)/*/)                                     │
│  - API Routes (src/app/api/*/)                                    │
│  - App contexts (src/app/context/*/)                               │
│  - Page-specific components                                        │
│                                                                     │
│  Purpose: Orchestrates features, handles routing, server-side      │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 2: SHARED COMPONENTS                                        │
│  Location: src/components/                                         │
│                                                                     │
│  Contains:                                                         │
│  - ui/ (shadcn/ui primitives)                                     │
│  - vendor/ (third-party wrappers)                                  │
│  - features/ (complete feature modules)                            │
│                                                                     │
│  Purpose: Reusable UI components, isolated from business logic      │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 3: INFRASTRUCTURE                                          │
│  Location: src/lib/, src/hooks/, src/types/, src/auth/, src/utils │
│                                                                     │
│  Contains:                                                         │
│  - lib/ (business logic, services, API clients)                    │
│  - hooks/ (global React hooks)                                     │
│  - types/ (TypeScript definitions)                                  │
│  - auth/ (authentication context)                                   │
│  - utils/ (pure utility functions)                                 │
│                                                                     │
│  Purpose: Business logic, data types, utilities - no UI             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Organization

### Feature Modules (`src/components/features/`)

Each feature is a **self-contained module** with:
- Main component(s)
- Sub-components
- Hooks specific to the feature
- Types (inline or nearby)
- Barrel file (`index.ts`)

Example: `likes/`
```
likes/
├── like-counter.tsx        # Main component
├── odometer-count.tsx      # Sub-component
├── hooks/
│   └── use-likes.ts       # Feature-specific hook
└── index.ts               # Barrel file
```

### UI Primitives (`src/components/ui/`)

shadcn/ui components - **dumb** UI elements with:
- No business logic
- Receive props, render UI
- Composable

### Vendor Components (`src/components/vendor/`)

Third-party UI wrappers:
- aceternity components
- Wrapped for internal use
- Exported via barrel file

---

## Import Conventions

### Recommended Import Paths

```typescript
// UI primitives (shadcn/ui)
import { Button, Card, Dialog } from '@/components/ui'

// Features
import { Header, Footer } from '@/components/features/header'
import { LikeCounter } from '@/components/features/likes'
import { CommentsSection } from '@/components/features/comments'
import { ProtectedAuthWrapper } from '@/components/features/protected'

// Vendor
import { EvervaultCard } from '@/components/vendor/aceternity-ui'

// Lib (business logic)
import { AuthManager } from '@/lib/auth/auth-manager'
import { CommentService } from '@/lib/comments/comment-service'
import { supabase } from '@/lib/supabase'

// Hooks
import { useToast, useMousePosition } from '@/hooks'

// Types
import type { Comment } from '@/types/comments'
import type { FatherSonStory } from '@/types/stories'
```

### What NOT to Import from Where

| Location | Can Import | Should NOT Import |
|----------|------------|-------------------|
| `components/ui/` | UI primitives | Feature components, business logic |
| `components/features/` | Feature components | Other features, services |
| `lib/` | Services, utilities | UI components |
| `hooks/` | Hooks | Services, components |

---

## Migration Summary

### Before (Old Structure)

```
src/
├── _components/           # Third-party (unclear)
├── _hooks/               # Custom hooks (underscore prefix)
├── _utils/              # Utils (underscore prefix)
├── app/
│   ├── my_components/   # "Shared" components (confusing name)
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── AuthCard/
│   │   ├── Likes/
│   │   ├── CommentsSection/
│   │   ├── shared/     # Misc utilities
│   │   └── specific/   # Page-specific content
│   ├── components/     # App-level (1 file)
│   └── context/
├── components/
│   ├── ui/            # shadcn/ui
│   └── auth/          # Auth wrappers (separate)
├── lib/               # Business logic
│   ├── supabase.ts
│   ├── supabase-server.ts  # Duplicate
│   ├── constants.ts
│   └── ...
├── hooks/             # Global hooks
└── types/            # TypeScript types
```

### After (New Structure)

```
src/
├── app/                    # Pages, API, contexts
├── components/
│   ├── ui/               # shadcn/ui (unchanged)
│   ├── vendor/            # NEW: Third-party wrappers
│   │   └── aceternity-ui/
│   └── features/          # NEW: Organized feature modules
│       ├── header/
│       ├── footer/
│       ├── auth-card/
│       ├── protected/
│       ├── likes/
│       ├── comments/
│       ├── page-title/
│       ├── flipbook/
│       └── shared/
├── lib/
│   ├── supabase/         # NEW: Consolidated
│   │   ├── client.ts
│   │   └── server.ts
│   ├── utils/            # NEW: Consolidated
│   │   ├── cn.ts
│   │   └── constants.ts
│   └── ...
├── hooks/                # (expanded)
├── utils/                # NEW: From _utils/
└── types/                # (with barrel file)
```

### Files Changed

| Category | Count | Changes |
|----------|-------|---------|
| Moved directories | 5 | `_components` → `vendor`, `_hooks` → `hooks`, etc. |
| Feature migrations | 9 | `my_components/*` → `features/*` |
| Import fixes | 40+ | Updated all broken import paths |
| Barrel files created | 10+ | Added `index.ts` where missing |
| Build verification | ✅ | Passes successfully |

---

## Pros and Cons Analysis

### Pros of the New Architecture

1. **Clear Layer Separation**
   - App layer handles routing
   - Components layer handles UI
   - Lib layer handles business logic
   - Each layer has distinct responsibility

2. **Improved Discoverability**
   - Features are in `components/features/`
   - UI primitives are in `components/ui/`
   - Third-party wrappers are in `components/vendor/`
   - Easy to find "where things go"

3. **Better Scalability**
   - New features go to `components/features/[feature-name]/`
   - New UI primitives go to `components/ui/`
   - New services go to `lib/`
   - Clear ownership

4. **Barrel Files (index.ts)**
   - Single import point per feature
   - Cleaner imports throughout
   - Easier to audit exports

5. **Removed Confusion**
   - Eliminated underscore prefix (`_components`, `_hooks`, `_utils`)
   - Renamed `my_components` → `features`
   - Consolidated duplicate locations

6. **TypeScript Benefits**
   - Centralized types in `src/types/`
   - Barrel file for easy imports
   - Better type inference

7. **shadcn/ui Compliance**
   - Follows shadcn convention of keeping components in `components/ui/`
   - Vendor prefix for third-party

### Cons / Trade-offs

1. **Breaking Changes**
   - All import paths changed (requires migration effort)
   - Teams may have local branches with old imports
   - Need to update documentation/examples

2. **Learning Curve**
   - New developers need to understand the layer model
   - May take time to remember where things are

3. **Some Legacy Remains**
   - `my_components/specific/` kept for backward compatibility
   - Page-specific content still mixed
   - Gradual migration vs big bang

4. **More Directories**
   - More folders to navigate
   - Some might consider it "over-organized"

5. **Maintenance Overhead**
   - Need to maintain barrel files
   - Must enforce conventions

---

## Guidelines

### Adding a New Feature

1. **Create feature module**:
   ```
   src/components/features/new-feature/
   ├── new-feature.tsx      # Main component
   ├── components/          # Sub-components
   ├── hooks/              # Feature hooks
   ├── types.ts            # Feature types
   └── index.ts            # Barrel file
   ```

2. **Export from main barrel**:
   ```typescript
   // src/components/features/index.ts
   export * from './new-feature'
   ```

3. **Use in pages**:
   ```typescript
   import { NewFeature } from '@/components/features'
   ```

### Adding a New UI Primitive

1. Add to `src/components/ui/` (follow shadcn/ui pattern)

### Adding Business Logic

1. Add service to appropriate `src/lib/` subdirectory
2. Keep UI out of lib layer

### Adding a Global Hook

1. Add to `src/hooks/`
2. Export from `src/hooks/index.ts`

---

## Interaction Flow Patterns

These patterns describe how components communicate, how transient UI state is managed, and how URL state integrates with component state. They apply across features and should be followed consistently.

Reference implementation: `src/app/(pages)/documentary-portfolio/components/DocumentaryGallery/useDocumentaryGalleryController.ts` contains canonical examples of the state and URL synchronization patterns below. `DocumentaryGallery.tsx` wires that controller to Radix Dialog and gallery UI components.

---

### URL-Driven State (Deep Link + Bidirectional Sync)

**When to use:** Any feature where UI state (modal open, tab selection, filter) should be shareable via URL and survive page refresh.

**Pattern:**

```
WRITE: Component state change ──► router.replace(?param=value)
READ:  ?param=value on mount ──► derive initial component state
SYNC:  ?param=value changes ──► update component state (back/forward nav)
```

**Rules:**
- Keep the route reader isolated in one hook and pass the current route value into the owning state controller.
- Use `router.replace()`, not `router.push()`, to avoid polluting browser history with transient UI states.
- Model open, closing, and closed as explicit phases when route updates must wait for exit animations. During `closing`, hold the current URL value until the close completes.
- Let the controller reconcile both directions: route changes dispatch into state, and state changes write the desired route value only when it differs from the current route value.

**Canonical implementation:**
```typescript
// Route hook owns reading and writing the URL query param.
const { selectedImageId, setSelectedImageId } = useGalleryRouteState();

// Controller owns the gallery state machine and receives route state.
const controller = useDocumentaryGalleryController({
  images,
  slideShowInterval: 5000,
  routeImageId: selectedImageId,
  setRouteImageId: setSelectedImageId,
});

// Inside the controller: READ route changes into reducer state.
useEffect(() => {
  dispatch({
    type: "SYNC_FROM_ROUTE",
    imageId: routeImageId,
    index: routeImageId ? imageIndexById.get(routeImageId) ?? null : null,
  });
}, [imageIndexById, routeImageId]);

// Inside the controller: WRITE reducer state back to the URL.
useEffect(() => {
  const desiredImageId =
    state.modalPhase === "open"
      ? state.selectedImageId
      : state.modalPhase === "closed"
        ? null
        : routeImageId;

  if (desiredImageId !== routeImageId) {
    setRouteImageId(desiredImageId);
  }
}, [routeImageId, setRouteImageId, state.modalPhase, state.selectedImageId]);
```

**Avoid:** Multiple components reading `searchParams` independently for the same UI state. Centralize URL <-> state reconciliation in the owning controller.

---

### Transient State Save/Restore

**When to use:** Any overlay or modal that must pause background activity on open and restore it on close — slideshows, autoplay video, polling intervals, animation loops.

**Pattern:**
```
On open:  save previous background state -> pause background work
On close: restore the saved value after the modal reaches the closed phase
```

**Rules:**
- Capture the previous value at the moment the overlay opens.
- Store the saved value in the same state machine that owns the overlay lifecycle, or in a ref for smaller local components.
- Restore only after the close is complete so exit animations and route cleanup do not race each other.
- The saved value must be a primitive read at the moment of capture; do not capture a stale closure variable.

**Canonical implementation:**
```typescript
case "OPEN":
  return {
    ...state,
    modalPhase: "open",
    selectedImageId: action.imageId,
    wasSlideShowPlaying: state.isSlideShowPlaying,
    isSlideShowPlaying: false,
  };

case "CLOSE_COMPLETE":
  return {
    ...state,
    modalPhase: "closed",
    selectedImageId: null,
    isSlideShowPlaying: state.wasSlideShowPlaying,
  };
```

**Edge case:** If the slideshow was already paused before the modal opened, the saved value stores `false`. On close, it restores `false`, so the slideshow correctly stays paused.

---

### Controlled Dialog Integration

**When to use:** Any modal that is opened programmatically (button click, URL deep link, API response) rather than via a `<DialogTrigger>` click target.

**Pattern:**
```
<Dialog open={isDialogOpen} onOpenChange={(open) => !open && requestClose()}>
  <DialogContent onAnimationEnd={completeCloseWhenClosed}>
    {shouldRenderModalContent && selectedContent && <ModalContent data={selectedContent} />}
  </DialogContent>
</Dialog>
```

**Rules:**
- Use the controlled `open` prop (not `DialogTrigger`). The trigger is in a separate component.
- The `onOpenChange` callback fires on overlay click and Escape key; route both to `requestClose()` via `!open && requestClose()`.
- Complete close-side effects from a single `completeClose()` path after the closing animation finishes, with a timeout fallback for missed animation events.
- Always include a `<DialogTitle>` for accessibility. Use `<VisuallyHidden.Root>` from `@radix-ui/react-visually-hidden` if the modal already has a visible title.
- Guard the modal content render behind `shouldRenderModalContent && selectedContent` so data stays mounted during exit animation but unmounts after close completes.

**Avoid:** Mixing controlled and uncontrolled Dialog modes. Pick one: if you need programmatic open, use `open` + `onOpenChange` exclusively; never add a `DialogTrigger` alongside.


---

### Disabled Prop Cascade

**When to use:** When a modal or overlay is active and background UI controls must be non-interactive to prevent confusion.

**Pattern:**
```
Parent (owns modal state)
  │  disabled={modalOpen}
  ▼
GalleryControls
  │  disabled={disabled}
  ▼
IconButton (play, pause, prev, next, info toggles)
  onClick={() => !disabled && handler()}
  disabled={disabled}
```

**Rules:**
- The parent that owns the modal state passes a single `disabled` boolean down through one level of intermediate components.
- Each leaf component guards both its visual state (`opacity-50`) and its click handler (`!disabled && ...`).
- Avoid spreading disabled logic across each leaf independently — the cascade ensures all controls disable in lockstep.

---

### Keyboard Guard (Focus-Based Interception)

**When to use:** When a full-screen interactive surface has global keyboard handlers that should not steal key events from form elements (inputs, textareas, selects).

**Pattern:**
```typescript
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    )
      return;
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [goPrev, goNext]);
```

**Rules:**
- Guard against focus on interactive elements at the **top** of the handler. Do not gate inside individual key branches.
- Arrow keys should navigate both gallery and modal when active — do NOT block navigation when the modal is open.
- Let the Dialog's built-in Radix handling manage Escape — do not add a competing Escape handler.

---

### Layered Close Paths -> Phased Close Handlers

**When to use:** Any modal with multiple exit mechanisms and close animations or URL cleanup.

Close triggers funnel into `requestClose()`. Close completion, URL cleanup, and background-state restoration funnel into `completeClose()`.

| Trigger | Mechanism | How it reaches the handler |
|---------|-----------|---------------------------|
| Close button (X) | User clicks button | Direct `onClick={requestClose}` |
| Overlay click | Radix Dialog built-in | `onOpenChange={(open) => !open && requestClose()}` |
| Escape key | Radix Dialog built-in | `onOpenChange={(open) => !open && requestClose()}` |
| URL parameter cleared | Browser back/forward nav | Route sync dispatches `SYNC_FROM_ROUTE` and enters `closing` |
| Invalid image in URL | External link with bad param | Controller ignores the invalid open and route writer clears it |
| Exit animation ends | Radix DialogContent animation event | `completeClose()` finalizes state |
| Exit animation event is missed | Safety timeout | Timeout dispatches `CLOSE_COMPLETE` |

**Rules:**
- `requestClose()` only starts the close phase.
- `completeClose()` handles closed state, selected-content cleanup, URL clearing, and restoring previous background state.
- Never duplicate close-side-effect logic across multiple handlers.

---

### Fire-and-Forget UX Actions

**When to use:** Non-blocking side effects that should not delay the user's next interaction — clipboard copy, toast notification, analytics pings.

**Pattern:**
```typescript
const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast({ variant: "success", title: "Link Copied", description: "..." });
  } catch {
    toast({ variant: "destructive", title: "Copy Failed", description: "..." });
  }
};
```

**Rules:**
- Use `try/catch` to handle clipboard API failures (some browsers deny permission).
- Always provide both success and failure toast feedback — silent failures degrade trust.
- Use `window.location.href` for the share URL (includes query params for deep linking). Do not hardcode a URL without params.
- Import `useToast` from `@/hooks/use-toast`. Consistent toast variant keys: `"success"` and `"destructive"`.

---

### Pattern Quick Reference

| Situation | Pattern | Key Mechanism |
|-----------|---------|---------------|
| Modal openable via URL | URL-Driven State | Route hook + controller reducer + explicit modal phases |
| Modal pauses background activity | Transient Save/Restore | State machine captures previous value on open and restores on close completion |
| Modal opened by button in another component | Controlled Dialog | `open` + `onOpenChange` props, no `DialogTrigger` |
| Background controls must lock during modal | Disabled Prop Cascade | Parent passes `disabled` boolean to all child controls |
| Full-screen surface has keyboard handlers | Keyboard Guard | Early return in handler when focus is on a form element |
| Multiple ways to close a modal | Phased Close Handlers | Triggers call `requestClose()`; animation/timeout calls `completeClose()` |
| Clipboard + toast feedback | Fire-and-Forget UX | try/catch around clipboard API, both success and error toasts |

---

## Future Considerations

1. **Migrate `my_components/specific/`**
   - Move page-specific content to respective pages
   - Eventually remove `my_components` entirely

2. **Add ESLint rules**
   - Enforce layer separation
   - Prevent circular dependencies

3. **Consider domain-driven design**
   - Group by domain (auth, stories, comments)
   - Could further split `lib/`

4. **Test directory**
   - Add `__tests__` alongside components
   - Or separate `tests/` folder

---

## Conclusion

This architecture provides:
- ✅ **Clear separation of concerns**
- ✅ **Predictable location for any code type**
- ✅ **Scalability for team growth**
- ✅ **Following industry best practices**
- ✅ **Compatible with shadcn/ui conventions**

The refactoring successfully transforms a chaotic structure into a maintainable, discoverable codebase.
