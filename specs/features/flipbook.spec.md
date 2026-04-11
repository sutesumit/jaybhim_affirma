# Flipbook Specification

## Purpose
Provides an interactive photobook experience with page-flip animations, allowing users to browse through image collections in a book-like interface.

## User Journeys

### Primary Journey: Browse Photobook
1. User navigates to photobook page
2. Flipbook component loads with images
3. User sees book spread (two pages visible)
4. User can scroll horizontally through pages
5. Navigation buttons allow prev/next movement
6. Images load progressively

### Alternative Journey: Page Flip Animation
1. User interacts with PageFlip component
2. Realistic page flip animation plays
3. Shadow effects enhance depth perception
4. Page settles into new position
5. User continues browsing

## Success Criteria
- [ ] Pages display in spread format (2-up)
- [ ] Horizontal scroll with snap points
- [ ] Navigation controls (prev/next)
- [ ] Page flip animation (HTMLFlipBook variant)
- [ ] Images load with proper aspect ratios
- [ ] Responsive across screen sizes
- [ ] Smooth scrolling behavior
- [ ] Accessible navigation buttons

## Technical Constraints
Per ARCHITECTURE.md:
- **Components**: Currently in `src/app/my_components/shared/flipbook/` (to be migrated to `src/components/features/flipbook/`)
- **Third-party**: `react-pageflip` library

### Stack
- react-pageflip for flip animation
- Next.js Image for optimized loading
- CSS scroll-snap for navigation

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Missing image | Show placeholder or skip |
| Slow network | Progressive loading |
| Mobile viewport | Single page view option |
| Many pages | Lazy loading for performance |
| Touch interaction | Swipe gestures work |

## Dependencies
- react-pageflip package
- Next.js Image component
- Page images in `/public/` directory

## Files Reference

| Layer | Location | Purpose |
|-------|----------|---------|
| Components | `src/app/my_components/shared/flipbook/flipbook.tsx` | Scroll-based viewer |
| Components | `src/app/my_components/shared/flipbook/PageFlip.tsx` | Flip animation viewer |

## Component Variants

### Flipbook (Scroll-based)
- Horizontal scroll container
- Snap-to-page behavior
- Even/odd page pairing
- Custom navigation buttons

### PageFlip (Animation-based)
- HTMLFlipBook wrapper
- Realistic page curl effect
- Shadow rendering
- Event callbacks on flip

## Migration Note
The flipbook components currently reside in `my_components/shared/` and should be migrated to `src/components/features/flipbook/` per ARCHITECTURE.md guidelines.

## Status
- [x] Spec created
- [ ] Reviewed
- [x] Implemented (needs migration)
- [ ] Tested
