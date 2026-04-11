# Comments System Specification

## Purpose
Enables users to leave comments on content pages, fostering community engagement. Supports anonymous posting, editing, deletion, and threaded display of comments.

## User Journeys

### Primary Journey: Post a Comment
1. User navigates to a page with CommentsSection
2. User sees existing comments and input field
3. User types comment in textarea
4. User toggles anonymous option (optional)
5. User submits comment
6. If not authenticated, ProtectedActionDrawer opens
7. After auth, comment is posted
8. Comment appears in list immediately

### Alternative Journey: Edit Own Comment
1. Authenticated user sees edit icon on their comments
2. User clicks edit, enters edit mode
3. User modifies comment text
4. User saves or cancels changes
5. Comment updates in place

### Alternative Journey: Delete Own Comment
1. Authenticated user sees delete icon on their comments
2. User clicks delete
3. Confirmation dialog appears
4. User confirms deletion
5. Comment is removed from list

### Alternative Journey: Refresh Comments
1. User clicks refresh button
2. Loading spinner appears
3. Comments are re-fetched from server
4. List updates with latest data

## Success Criteria
- [ ] Users can post comments on any page
- [ ] Comments are associated with page path
- [ ] Anonymous posting option works
- [ ] Users can edit their own comments
- [ ] Users can delete their own comments
- [ ] Delete requires confirmation
- [ ] Comments display in chronological order
- [ ] Authentication required to comment
- [ ] Error states handled gracefully
- [ ] Loading states shown during operations

## Technical Constraints
Per ARCHITECTURE.md:
- **Components**: `src/components/features/comments/`
- **Services**: `src/lib/comments/`
- **Hooks**: `src/components/features/comments/hooks/`
- **Types**: `src/types/comments.ts`

### Stack
- Supabase Database for comment storage
- shadcn/ui ConfirmDialog for deletions
- Auto-resize textarea for input

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Empty comment | Disable submit button |
| Very long comment | Allow but truncate display |
| Network failure | Show error, keep text in input |
| Session expired | Prompt re-authentication |
| Concurrent edits | Last write wins |
| Deleted user comments | Show "deleted" placeholder |

## Dependencies
- Authentication system (`src/components/features/auth-card/`)
- Toast notifications (`src/hooks/use-toast`)
- Auto-resize textarea hook (`src/hooks/use-auto-resize-textarea`)
- Supabase client (`src/lib/supabase/`)

## Files Reference

| Layer | Location | Purpose |
|-------|----------|---------|
| Components | `src/components/features/comments/CommentsSection.tsx` | Main container |
| Components | `src/components/features/comments/CommentInput.tsx` | Input field |
| Components | `src/components/features/comments/CommentsList.tsx` | List display |
| Components | `src/components/features/comments/CommentItem.tsx` | Individual comment |
| Components | `src/components/features/comments/CommentContent.tsx` | Comment body |
| Components | `src/components/features/comments/AnonymousToggle.tsx` | Anon switch |
| Hooks | `src/components/features/comments/hooks/useComments.ts` | State & actions |
| Services | `src/lib/comments/comment-service.ts` | Database operations |
| Types | `src/types/comments.ts` | Comment data types |

## Display Modes
- **overlay**: Compact mode for drawers/modals
- **standalone**: Full mode with gradient wrapper

## Status
- [x] Spec created
- [ ] Reviewed
- [x] Implemented
- [ ] Tested
