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

---

## Overview

This document describes the refactored architecture of the Jaybhim Affirma project. The codebase is a **Next.js 15 + Supabase** documentary/art portfolio with authentication, interactive features (likes, comments), and multimedia content.

### Tech Stack
- **Framework**: Next.js 15.5.8 (App Router)
- **UI**: React 19, Tailwind CSS, shadcn/ui (Radix UI)
- **Third-party**: aceternity UI components
- **Backend**: Supabase (Auth, Database)
- **Animation**: Framer Motion, Motion

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
│   │   └── top-user/
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
