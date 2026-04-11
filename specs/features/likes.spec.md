# Likes System Specification

## Purpose
Enables users to express appreciation for content pages through a like/unlike mechanism. Provides visual feedback with animated counters and persistent like state tied to user authentication.

## User Journeys

### Primary Journey: Like a Page
1. User navigates to a content page
2. LikeCounter component displays current like count
3. User clicks the heart icon
4. If not authenticated, ProtectedActionDrawer opens for login
5. After auth, like is registered
6. Counter animates (odometer effect)
7. Heart icon animates (color change + motion)
8. Like state persists for the user

### Alternative Journey: Unlike a Page
1. Authenticated user sees filled heart (liked state)
2. User clicks heart icon again
3. Like is removed
4. Counter decrements with animation
5. Heart returns to outline state

### Alternative Journey: View Likes (Unauthenticated)
1. Unauthenticated user sees like counter
2. User can see the count but cannot interact
3. Clicking prompts authentication drawer

## Success Criteria
- [ ] Like count displays accurately
- [ ] Like state persists per user per page
- [ ] Counter animates on change (odometer effect)
- [ ] Heart animates on like/unlike (framer-motion)
- [ ] Authentication required to like
- [ ] Optimistic UI updates for responsiveness
- [ ] Handles network failures gracefully
- [ ] Works across all content pages

## Technical Constraints
Per ARCHITECTURE.md:
- **Components**: `src/components/features/likes/`
- **Services**: `src/lib/likes/`
- **Hooks**: `src/components/features/likes/hooks/`
- **Types**: `src/types/likes.ts`

### Stack
- Supabase Database for like storage
- Framer Motion for animations
- ProtectedActionDrawer for auth gating

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Page not found | Disable likes, show grayed state |
| Network failure | Show toast, revert optimistic update |
| Rapid clicks | Debounce, prevent duplicate requests |
| Session expired | Prompt re-authentication |
| Concurrent likes | Sync count from server |

## Dependencies
- Authentication system (`src/components/features/auth-card/`)
- ProtectedActionDrawer (`src/components/features/protected/`)
- Supabase client (`src/lib/supabase/`)
- Toast notifications (`src/hooks/use-toast`)
- NotFoundContext (`src/app/context/`)

## Files Reference

| Layer | Location | Purpose |
|-------|----------|---------|
| Components | `src/components/features/likes/LikeCounter.tsx` | Main like UI |
| Components | `src/components/features/likes/OdometerCount.tsx` | Animated counter |
| Hooks | `src/components/features/likes/hooks/useLikes.ts` | Like state & actions |
| Services | `src/lib/likes/like-service.ts` | Database operations |
| Types | `src/types/likes.ts` | Like data types |

## Animation Specs
- **Heart transition**: 0.5s ease [0.22, 1, 0.36, 1]
- **Odometer**: Digit-by-digit roll animation
- **Scale pulse**: 1.12x on interaction
- **Exit animations**: Rotate + fade for unlike

## Status
- [x] Spec created
- [ ] Reviewed
- [x] Implemented
- [ ] Tested
