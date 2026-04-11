# Navigation Specification

## Purpose
Provides site-wide navigation with a responsive header, dropdown menus, and mobile-friendly menu system. Enables users to explore the portfolio and access all content areas.

## User Journeys

### Primary Journey: Desktop Navigation
1. User sees Header component at top of page
2. Site identity links are visible (logo/title)
3. Navigation links show available sections
4. User clicks a link to navigate
5. Active state indicates current page

### Alternative Journey: Dropdown Menu
1. User hovers/clicks on menu trigger
2. Dropdown menu opens with animation
3. Menu shows categorized content cards
4. User can search/filter menu items
5. User clicks card to navigate
6. Menu closes after selection

### Alternative Journey: Mobile Navigation
1. User on mobile viewport sees hamburger icon
2. User taps to open menu
3. Full-screen menu appears
4. User scrolls through options
5. User taps to navigate or close

### Alternative Journey: Page Status Tracking
1. User navigates between pages
2. NavigationProgressBar shows progress
3. CurrentTabLink highlights active section
4. PageNavigationStatus updates accordingly

## Success Criteria
- [ ] Header visible on all pages
- [ ] Logo links to home
- [ ] Navigation links work correctly
- [ ] Dropdown menu displays all content
- [ ] Search/filter works in menu
- [ ] Mobile menu is accessible
- [ ] Active page state is visible
- [ ] Smooth transitions and animations
- [ ] Accessible via keyboard

## Technical Constraints
Per ARCHITECTURE.md:
- **Components**: `src/components/features/header/`
- **Sub-components**: Navigation/, DropdownMenu/, MenuBar/, menuContext/

### Stack
- Framer Motion for animations
- React Context for menu state
- shadcn/ui primitives for base elements

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Deep nesting | Breadcrumb or back button |
| Missing page | 404 handling |
| Slow navigation | Show loading state |
| Touch device | Touch-friendly targets |
| Screen reader | ARIA labels present |

## Dependencies
- MenuContextProvider (`src/components/features/header/menuContext/`)
- Framer Motion for animations
- Next.js Link for routing

## Files Reference

| Layer | Location | Purpose |
|-------|----------|---------|
| Components | `src/components/features/header/Header.tsx` | Main wrapper |
| Components | `src/components/features/header/MenuBar/` | Menu bar layout |
| Components | `src/components/features/header/Navigation/` | Nav links & controls |
| Components | `src/components/features/header/DropdownMenu/` | Dropdown content |
| Context | `src/components/features/header/menuContext/` | Menu state |

## Component Hierarchy
```
Header
└── MenuBarWrapper
    ├── MenuItems
    ├── NavigationLinks
    ├── MenuToggleControl
    ├── CurrentTabLink
    ├── HoverLink
    └── SiteIdentityLinks
```

## Menu Features
- **SearchBar**: Filter menu items by text
- **CardsGrid**: Display content cards
- **ImagePreviews**: Preview images for items
- **EmptyState**: Shown when no results

## Status
- [x] Spec created
- [ ] Reviewed
- [x] Implemented
- [ ] Tested
