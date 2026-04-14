# Feature Inventory

## Purpose

This document is a raw-material inventory of the product and engineering work represented in the `jaybhim_affirma` codebase. It is intentionally more exhaustive and implementation-aware than a README or resume entry. The goal is to preserve concrete evidence of scope, product thinking, and technical execution so the project can later be translated into recruiter-friendly bullets, portfolio case studies, interview stories, or role-specific resumes.

The project is not only a digital portfolio. It is a multi-page interactive publishing platform for visual storytelling, participatory art experiences, multilingual editorial presentation, and authenticated visitor interaction.

---

## High-Level Product Scope

### What the project is

The application is a `Next.js` App Router site that presents multiple bodies of artistic work through distinct interfaces instead of forcing all content into one generic gallery template. Different projects receive different browsing metaphors depending on the form of the work: slideshow, flipbook, draggable art canvas, synchronized video gallery, editorial text layout, and hybrid visual-text compositions.

### What makes the project broader than a typical portfolio

- It includes custom interaction models for different works rather than one repeated layout.
- It supports authenticated participation by visitors through OTP login.
- It includes social engagement primitives such as likes and comments.
- It includes a participatory storytelling flow where users can create and submit their own story cards.
- It includes multilingual metadata and language-aware content presentation.
- It includes engagement analytics endpoints backed by database RPCs.
- It has a documented architecture and evidence of deliberate refactoring for maintainability.
- It includes real-time owner notifications via Telegram for visitor tracking, engagement events, and auth activity.

---

## Core Platform Features

### Multi-project content platform

The site is organized as a single platform containing multiple distinct projects, each with its own route, metadata, thumbnail, date range, descriptions, acknowledgements, and in some cases custom media configuration.

The page registry acts like a lightweight content-management layer:

- central registry of all projects
- stable slugs and IDs
- short and long descriptions
- search keywords for discovery
- bilingual copy support in several entries
- date metadata for archival framing
- acknowledgements attached per work
- project-specific extras such as media sources or page lists

This gives the site a CMS-like foundation even where content is hand-authored in code.

Relevant files:
- `src/data/pages-registry.ts`
- `src/lib/metadata.ts`
- `src/lib/hooks/use-page-metadata.ts`

### Metadata-driven navigation and discovery

Navigation is not hardcoded page by page. The application derives menu and navigation structures from centralized metadata, which improves consistency and makes the platform easier to extend as new work is added.

Capabilities include:

- generating dropdown-menu items from the page registry
- ordering pages consistently by stable numeric ID
- exposing search content and descriptions inside navigation
- carrying date information into browsing UI
- allowing content discovery by title, description, and keyword

This is more mature than a simple navbar with a few links because the navigation system behaves like a discovery surface for the body of work.

Relevant files:
- `src/lib/metadata.ts`
- `src/components/features/header/DropdownMenu/menuConfig.ts`
- `src/components/features/header/DropdownMenu/hooks/useMenuFilter.ts`

### Fuzzy search in navigation

The project includes fuzzy search for browsing work across the portfolio using `Fuse.js`. Search considers multiple fields with weighted matching rather than relying on exact string match.

Behavior includes:

- title weighted most heavily
- description weighted second
- deep keyword/search metadata weighted third
- tolerant matching with threshold tuning
- returning ranked filtered results as the user types

This is a strong product-level feature because it treats the archive as searchable content instead of a static personal site.

Relevant files:
- `src/components/features/header/DropdownMenu/hooks/useMenuFilter.ts`

### Multilingual content support

Several projects carry both English and Marathi descriptions, and the platform includes a language switch UI for readers to move between language contexts.

What is notable here:

- bilingual metadata is modeled directly in the page registry
- language choice is surfaced in UI rather than hidden
- the site acknowledges multilingual readership as part of the content experience

This is valuable recruiter material because it shows attention to localization and audience accessibility beyond default English-only assumptions.

Relevant files:
- `src/data/pages-registry.ts`
- `src/components/features/page-title/LanguageSwitch.tsx`

---

## Project-Specific Experience Design

### 1. Documentary Portfolio: slideshow gallery with keyboard navigation

The documentary portfolio uses a dedicated gallery experience rather than a simple image grid.

Features include:

- full-screen immersive image viewing
- animated transitions between images using `framer-motion`
- previous/next navigation
- autoplay slideshow behavior
- keyboard navigation via left/right arrow keys
- thumbnail strip for direct navigation
- preview-image presentation tuned for visual impact

This reflects deliberate interaction design for editorial photography viewing rather than commodity gallery scaffolding.

Relevant files:
- `src/app/(pages)/documentary-portfolio/page.tsx`
- `src/app/(pages)/documentary-portfolio/components/DocumentaryGallery/DocumentaryGallery.tsx`
- `src/app/(pages)/documentary-portfolio/components/ThumbnailStrip/ThumbnailStrip.tsx`
- `src/app/(pages)/documentary-portfolio/components/PreviewImage/PreviewImage.tsx`
- `src/app/(pages)/documentary-portfolio/components/GalleryControls/GalleryControls.tsx`

### 2. Lunchboxes: interactive flipbook

The `Lunchboxes` project is implemented as a page-flip book experience using `react-pageflip`, allowing the work to be browsed as a photobook rather than a flat gallery.

Features include:

- realistic page-turning metaphor
- image-based book pages
- optimized image loading through `next/image`
- custom book dimensions and shadow rendering
- dedicated project route and hero section

This is a distinct storytelling interface aligned with the medium of the work.

Relevant files:
- `src/app/(pages)/lunchboxes/page.tsx`
- `src/app/(pages)/lunchboxes/ArtCanvas/LunchboxFlipbook.tsx`
- `specs/features/flipbook.spec.md`

### 3. Home Photobook: synchronized video gallery with timeline controls

The `Home // घर` project uses embedded video as a primary narrative surface and pairs it with a running timeline users can seek through.

Features include:

- embedded YouTube-driven gallery presentation
- postMessage-based player control
- play/pause control synchronized with UI state
- seek interactions from custom timeline items
- timeline-aware storytelling model instead of static playback
- listening to player state changes to keep custom controls in sync

This is important resume material because it shows custom integration logic with an external media player and tailored interaction design around narrative sequencing.

Relevant files:
- `src/app/(pages)/home-photobook/page.tsx`
- `src/app/(pages)/home-photobook/ArtCanvas/GallerySection.tsx`
- `src/app/(pages)/home-photobook/ArtCanvas/RunningTimeline.tsx`
- `src/app/(pages)/home-photobook/content.ts`

### 4. Fathers and Figures: draggable art canvas

One of the most distinctive experiences in the codebase is the `Fathers and Figures` art canvas, where visitors can manipulate photo fragments directly.

Features include:

- art-canvas layout rendered as a full interactive surface
- multiple draggable photo pieces
- motion-defined initial placement and animation styles
- drag constraints tied to the canvas container
- project-specific instruction layer
- visual composition as interaction, not just viewing

This is not a normal portfolio gallery. It functions more like a browser-native interactive installation.

Relevant files:
- `src/app/(pages)/fathers-and-figures/page.tsx`
- `src/app/(pages)/fathers-and-figures/ArtCanvas/ArtCanvas.tsx`
- `src/app/(pages)/fathers-and-figures/ArtCanvas/DraggablePhoto.tsx`
- `src/app/(pages)/fathers-and-figures/ArtCanvas/usePhotoStyleHook.ts`
- `src/app/(pages)/fathers-and-figures/ArtCanvas/Instruction.tsx`

### 5. Fathers and Figures: motion-led hero with mouse trail effect

The project includes a custom hero treatment in which pointer movement generates temporary trail images, adding a tactile and atmospheric introduction to the work.

Features include:

- container-aware mouse tracking
- generated visual trail artifacts
- timed cleanup of trail elements
- frequency throttling through counter-based logic
- project-specific image-trail generation

This demonstrates custom motion engineering and a willingness to build interaction primitives specifically in service of the artistic concept.

Relevant files:
- `src/app/(pages)/fathers-and-figures/components/HeroSection/useMouseTrail.ts`
- `src/app/(pages)/fathers-and-figures/components/HeroSection/generateTrailImage.ts`
- `src/app/(pages)/fathers-and-figures/components/HeroSection/TrailingImage.tsx`
- `src/app/(pages)/fathers-and-figures/components/HeroSection/HeroSection.tsx`

---

## Participatory and User-Generated Features

### Make My Card: user-generated visual story cards

The most resume-worthy feature area is the participatory submission flow in `Fathers and Figures`. Visitors are not limited to consuming the work. They can compose and submit their own contribution.

The flow includes:

- interactive card-writing UI
- capture of the live art canvas as a visual background
- canvas-to-image conversion using `html2canvas` utilities
- temporary background preview state
- story text and optional signature entry
- authenticated submission through a protected flow
- story persistence to Supabase-backed storage

This combines frontend interactivity, media capture, auth gating, and backend persistence in one cohesive user experience.

Relevant files:
- `src/app/(pages)/fathers-and-figures/components/MakeMyCard/hooks/useCanvasOperations.ts`
- `src/utils/html2CanvasUtils.ts`
- `src/utils/index.ts`
- `src/app/(pages)/fathers-and-figures/components/MakeMyCard/components/inputStory/WriteMyCard.tsx`
- `src/app/(pages)/fathers-and-figures/components/MakeMyCard/components/inputStory/SubmitStoryButton.tsx`
- `src/app/(pages)/fathers-and-figures/components/MakeMyCard/components/cardBackground/CardCanvas.tsx`
- `src/app/(pages)/fathers-and-figures/components/MakeMyCard/components/cardBackground/StoryCanvasCard.tsx`

### Story submissions gallery

Submitted stories are displayed back to users in a dedicated submissions area, giving the project a community-contribution layer.

Capabilities include:

- fetching all submitted stories from an API route
- surfacing the current user’s own story prominently
- editing existing submissions
- deleting submissions with confirmation
- refresh controls for fetching the latest data
- carousel presentation of submitted stories
- empty states and loading states
- animated entry of story cards

This pushes the site beyond a static author-centric portfolio into a moderated or at least structured participatory environment.

Relevant files:
- `src/app/(pages)/fathers-and-figures/components/Submissions/Submissions.tsx`
- `src/app/(pages)/fathers-and-figures/components/Submissions/hooks/useStories.ts`
- `src/app/(pages)/fathers-and-figures/components/Submissions/components/SubmissionCard.tsx`
- `src/lib/stories/story-service.ts`
- `src/app/api/father-son-stories/route.ts`
- `src/app/api/father-son-stories/[storyId]/route.ts`

### Protected interactions that resume after authentication

The project includes a reusable pattern for wrapping actions that require login. If a user is not authenticated, the system opens an auth drawer instead of simply failing. Once authentication succeeds, the intended action resumes.

This pattern is used to avoid dead-end UX in participatory features.

Capabilities include:

- intercepting protected clicks
- distinguishing between action mode and view mode
- drawer-based auth prompt
- post-auth continuation of the original action
- reusability across multiple feature areas

This is a strong sign of product maturity because it preserves momentum in the user journey.

Relevant files:
- `src/components/features/protected/ProtectedActionDrawer.tsx`
- `src/components/features/protected/ProtectedAuthWrapper.tsx`

---

## Authentication and Identity Features

### OTP authentication via email or phone

The project implements OTP authentication using Supabase Auth, with support for both email and phone-based login.

Capabilities include:

- user chooses login method
- input validation and sanitization for phone and email
- OTP sending through dedicated API route
- OTP verification through dedicated API route
- loading and error handling throughout the flow
- resend and contact-change flows in the UI

This is materially more advanced than a simple social login button because it includes custom flow orchestration and multiple auth paths.

Relevant files:
- `src/app/api/auth/send-otp/route.ts`
- `src/app/api/auth/verify-otp/route.ts`
- `src/components/features/auth-card/AuthCard.tsx`
- `src/components/features/auth-card/hooks/useAuthFlow.ts`
- `specs/features/authentication.spec.md`

### Session persistence and auth context

After verification, the app stores a secure auth cookie and reconstructs session state on future visits.

Capabilities include:

- httpOnly auth cookie
- session persistence across reloads
- token expiration checks
- authenticated user retrieval in server contexts
- app-wide auth context for frontend feature gating

This makes authenticated participation feel continuous instead of one-off.

Relevant files:
- `src/lib/auth/auth-manager.ts`
- `src/auth/AuthContext.tsx`
- `src/auth/useAuthContext.ts`

### Default profile creation and editable display names

The auth system does not stop at sign-in. It also bootstraps a user identity layer.

Capabilities include:

- automatic profile creation on first verification
- default display-name generation from email or phone
- profile lookup and reuse for returning users
- editable display name via authenticated API route
- cookie refresh after profile change

This is useful for recruiter narratives because it shows ownership of identity, UX, and persistence details rather than only wiring auth credentials.

Relevant files:
- `src/app/api/auth/verify-otp/route.ts`
- `src/app/api/auth/profile/route.ts`
- `src/components/features/auth-card/UserSessionCard.tsx`

---

## Community and Engagement Features

### Per-page likes system

The site includes a page-specific likes system tied to authentication. This allows visitors to leave a lightweight signal of appreciation on individual works.

Capabilities include:

- get like count by page path
- determine whether the current user has liked a page
- explicit `like`, `unlike`, and `toggle` intent handling
- persistence in Supabase
- count refresh after updates
- unauthenticated view with authenticated action gating

The likes feature is implemented as a real product module rather than a superficial counter.

Relevant files:
- `src/app/api/likes/route.ts`
- `src/lib/likes/like-service.ts`
- `src/components/features/likes/LikeCounter.tsx`
- `src/components/features/likes/OdometerCount.tsx`
- `src/components/features/likes/hooks/useLikes.ts`
- `specs/features/likes.spec.md`

### Animated reaction feedback

The likes feature is enhanced with motion and counter animation instead of plain number updates.

Capabilities include:

- animated heart interaction states
- odometer-style count transitions
- visual feedback for like/unlike changes
- support for optimistic-feeling interaction patterns

This matters because it shows polish and interaction design, not just backend CRUD.

Relevant files:
- `src/components/features/likes/LikeCounter.tsx`
- `src/components/features/likes/OdometerCount.tsx`

### Comments system with anonymity support

The project includes a full comments system attached to individual page paths.

Capabilities include:

- fetch comments by page
- create comments as authenticated user
- edit own comments
- delete own comments
- standalone and overlay display modes
- loading, refresh, and error states
- anonymous posting option
- relative timestamp formatting

This is a substantial feature area on its own and meaningfully expands the project beyond publishing into community interaction.

Relevant files:
- `src/app/api/comments/route.ts`
- `src/app/api/comments/[id]/route.ts`
- `src/lib/comments/comment-service.ts`
- `src/components/features/comments/CommentsSection.tsx`
- `src/components/features/comments/hooks/useComments.ts`
- `specs/features/comments.spec.md`

### Privacy-preserving comment display

The comments system includes privacy-aware behavior beyond a simple anonymous checkbox.

Capabilities include:

- masking anonymous comments for other viewers
- hiding anonymous user IDs to reduce correlation risk
- masking phone numbers and emails in author formatting
- retaining editability for a user’s own contributions

This shows evidence of thoughtful implementation around identity and privacy.

Relevant files:
- `src/app/api/comments/route.ts`
- `src/lib/comments/comment-service.ts`

### Versioning and soft-delete patterns

The comments feature includes more sophistication than basic insert/delete operations.

Observed behavior includes:

- soft-delete semantics through `deleted_at`
- insert of initial record into `comment_versions`
- non-destructive data handling patterns

This is strong raw material for speaking about maintainability, auditability, or safer content-management approaches.

Relevant files:
- `src/app/api/comments/route.ts`
- `src/app/api/comments/[id]/route.ts`

---

## Real-Time Telegram Notifications

The project includes a Telegram-based notification system that alerts the site owner of visitor activity, engagement events, and authentication actions in real-time.

The notification system delivers push-style alerts through a Telegram bot using the grammy library, operating on a fire-and-forget basis to avoid impacting request latency.

Capabilities include:

- visitor arrival notifications with referrer, IP, and user-agent context
- like event notifications with page path and count
- comment notifications including edit and delete actions
- story submission notifications
- OTP verification success notifications
- logout event notifications
- TelegramNotifier interface with noop fallback for development mode
- Grammy bot singleton with lazy initialization
- HTML message escaping for secure rendering
- contact masking for privacy
- message length clamping for Telegram API compatibility
- request context extraction (IP, user agent, referrer)

The system is designed as non-blocking—notifications are sent asynchronously after the API response completes, preserving the user's request experience.

Relevant files:
- `src/lib/telegram/bot.ts`
- `src/lib/notifications/telegram-notifier.ts`
- `src/lib/notifications/formatters.ts`
- `src/lib/notifications/helpers.ts`
- `src/lib/notifications/types.ts`
- `src/app/api/likes/route.ts`
- `src/app/api/comments/route.ts`
- `src/app/api/comments/[id]/route.ts`
- `src/app/api/auth/verify-otp/route.ts`
- `src/app/api/father-son-stories/route.ts`

### Visit Tracking and Visitor Analytics

The project includes a visit tracking service that records visitor sessions and provides unique visitor counts through Supabase RPCs.

The visit tracking feature operates alongside the notification system, triggering owner alerts when new visitors arrive.

Capabilities include:

- visit session recording with page path, referrer, and device metadata
- unique visitor identification through browser fingerprint
- Supabase RPC-backed visit state upsertion
- unique daily visitor counting via database function
- fire-and-forget notification trigger on new visits
- visitor analytics available through dedicated API routes

This feature provides the owner with visibility into audience engagement without requiring authentication from visitors.

Relevant files:
- `src/lib/visit/service.ts`
- `src/lib/visit/repository.ts`
- `src/lib/visit/types.ts`
- `src/app/api/visit/route.ts`

---

## Analytics and Personalization Features

### Interaction analytics endpoint

The project includes an endpoint that retrieves engagement analytics through a Supabase RPC, optionally scoped to the current user context.

Capabilities include:

- server-side analytics retrieval
- personalized analytics when a user is authenticated
- RPC-based aggregation in the database layer
- JSON API response for future visualization or UI summary use

This is notable because most portfolio projects stop at display and interaction. This one also captures and exposes engagement data.

Relevant files:
- `src/app/api/interaction-analytics/route.ts`

### Top-user / contribution recognition endpoint

There is also an endpoint for retrieving a top-user or leading contributor view using another Supabase RPC.

Capabilities include:

- fetch top contributor data
- identify whether the current user is the top contributor
- shape response for personalized display logic

This suggests the project is exploring community identity and participation metrics beyond passive content browsing.

Relevant files:
- `src/app/api/top-user/route.ts`

### Contribution summaries in auth UI

The authentication UI includes contribution-summary components, which indicates an intent to connect identity with visible participation status.

This is useful recruiter material because it speaks to product thinking around user motivation, not just implementation detail.

Relevant files:
- `src/components/features/auth-card/components/ContributionSummary.tsx`
- `src/app/api/interaction-analytics/route.ts`
- `src/app/api/top-user/route.ts`

---

## Reusable UI and Experience Infrastructure

### Shared feature modules

The codebase contains reusable feature modules for:

- header/navigation
- footer/session display
- auth card
- protected actions
- likes
- comments
- page titles and language switch
- shared atmospheric components such as cursor treatments and gradients

This indicates the app has been factored into platform-level components rather than being an accumulation of one-off page code.

Relevant files:
- `src/components/features/`

### Shared visual atmosphere components

The platform includes reusable visual system pieces that shape the mood of the site:

- gradient wrappers
- progress indicators
- custom cursor elements
- bio popup
- acknowledgement sections

These are useful to mention when positioning the project as a design-engineering effort rather than a utilitarian web app.

Relevant files:
- `src/components/features/shared/`

### Motion-rich transitions and interaction design

Motion is used extensively across the codebase, not only for decoration but to shape navigation, response, and storytelling.

Observed patterns include:

- animated gallery transitions
- animated hero effects
- animated cards and drawers
- page-load or element-entry choreography
- animated language switching
- animated counters and interaction states

Relevant files:
- multiple components across `src/app/(pages)/...` and `src/components/features/...`

---

## Architecture and Engineering Maturity

### Layered architecture

The project includes explicit documentation for a layered architecture separating:

- App Router pages and API routes
- shared UI and feature components
- business logic and service layers
- hooks, utilities, and types

This is evidence that the project evolved beyond quick prototyping into a maintainable codebase with conscious separation of concerns.

Relevant files:
- `ARCHITECTURE.md`

### Feature modularization and refactor work

The architecture document records a substantial reorganization effort:

- migration from ambiguous legacy directories
- creation of `components/features`
- consolidation of Supabase client code
- standardization of barrel exports
- import-path cleanup across dozens of files

This is valuable resume material because it demonstrates codebase stewardship, not just feature shipping.

Relevant files:
- `ARCHITECTURE.md`

### Dedicated service layer for business logic

The codebase includes service abstractions for:

- authentication
- comments
- likes
- stories
- notifications
- visit tracking
- Supabase access

This shows that the project uses a structured frontend/backend boundary instead of binding components directly to data concerns.

Relevant files:
- `src/lib/auth/`
- `src/lib/comments/`
- `src/lib/likes/`
- `src/lib/stories/`
- `src/lib/supabase/`

### Explicit specs as product artifacts

The repository includes feature-level specs for auth, comments, likes, navigation, and flipbook behavior.

This signals a more disciplined approach to development:

- features are named and scoped
- user journeys are described
- success criteria are identified
- edge cases are documented

This can support interview narratives about product thinking and systems design.

Relevant files:
- `specs/features/authentication.spec.md`
- `specs/features/comments.spec.md`
- `specs/features/likes.spec.md`
- `specs/features/navigation.spec.md`
- `specs/features/flipbook.spec.md`

---

## Technical Stack by Capability Area

### Frontend application

- `Next.js` with App Router
- `React`
- `TypeScript`
- `Tailwind CSS`

### Motion and interaction

- `framer-motion`
- `motion`
- `react-pageflip`
- `html2canvas`

### UI primitives and component infrastructure

- `Radix UI`
- `shadcn/ui`
- `Aceternity UI`
- `vaul`

### Data, auth, and backend integration

- `Supabase Auth`
- `Supabase Database`
- RPC-backed analytics endpoints
- `grammy` (Telegram Bot API)

### Notifications

- `grammy` (Telegram Bot API)

### Discovery and search

- `Fuse.js`

---

## Strong Resume Themes Supported by This Repo

### Full-stack interactive storytelling platform

The repo strongly supports describing the project as a full-stack interactive storytelling platform rather than a personal website.

### Participatory product design

The repo supports claims around designing participation systems, including auth-gated contributions, comments, reactions, and user-generated submissions.

### Design engineering

The repo strongly supports positioning around creative frontend engineering, especially custom interaction models for art and editorial work.

### Product-minded frontend engineering

The repo supports claims around shipping polished user journeys, privacy-aware interaction, identity features, and thoughtful action gating.

### Architecture and maintainability

The repo supports claims around refactoring, modularization, service-layer design, and evolving a creative codebase into a scalable system.

---

## Candidate Resume Bullet Material

These are not final polished bullets, but they preserve defensible claims that can later be adapted for different job targets.

- Built a `Next.js` and `Supabase`-based interactive publishing platform for visual art, long-form narratives, and multilingual editorial presentation across multiple custom content experiences.
- Designed and implemented project-specific storytelling interfaces including slideshow galleries, page-flip photobooks, synchronized video timelines, draggable art canvases, and motion-led interactive hero sections.
- Developed authenticated participation flows with email/phone OTP login, persistent sessions, editable user identity, and reusable protected-action patterns that resume user intent after authentication.
- Engineered community interaction systems for per-page likes, anonymous comments, comment editing/deletion, and animated engagement feedback backed by API routes and database persistence.
- Created a participatory story-submission feature that captures live canvas compositions, combines them with user-written text, and publishes contributions into a browsable community gallery.
- Added metadata-driven navigation, fuzzy search, and bilingual content support to improve discoverability and accessibility across a growing archive of artistic work.
- Implemented Supabase RPC-backed engagement analytics and contributor-ranking endpoints to support personalized and community-aware experiences.
- Refactored the codebase into documented feature modules and service layers, improving maintainability, discoverability, and scalability as the platform expanded.
- Implemented a real-time Telegram notification system using grammy with fire-and-forget patterns across 8 API routes to deliver owner alerts for visitor activity, engagement events, and authentication actions without impacting request latency.

---

## Interview Story Angles

This repo can support interview discussions around:

- designing a non-blocking notification system that delivers real-time alerts without degrading user experience
- translating artistic goals into interaction design
- balancing expressive visuals with reusable engineering patterns
- designing auth without harming UX
- implementing participation features in a portfolio context
- handling privacy in public user-generated content
- structuring a growing creative codebase
- choosing different interface metaphors for different content forms
- building product features that preserve narrative intent rather than flattening everything into generic CMS patterns

---

## Future Additions To This Inventory

As the project evolves, this document should be updated when new work lands in any of these areas:

- new routes or project experiences
- new participatory features
- analytics visualization
- admin or moderation capabilities
- publishing workflows
- performance or accessibility improvements
- testing coverage
- deployment, monitoring, or CI/CD details

