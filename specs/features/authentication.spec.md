# Authentication Specification

## Purpose
Provides user authentication via OTP (email or phone) using Supabase Auth. Enables personalized experiences, protected actions, and persistent user identity across sessions.

## User Journeys

### Primary Journey: OTP Login
1. User sees AuthCard with method selection (Email/Phone)
2. User enters email or phone number
3. System sends OTP to provided contact
4. User enters received OTP
5. System verifies OTP and creates session
6. User sees UserSessionCard with their profile

### Alternative Journey: Session Persistence
1. Returning user visits site
2. System checks for existing session via AuthContext
3. If valid session exists, user is authenticated automatically
4. User sees personalized greeting in UserSessionCard

### Alternative Journey: Profile Update
1. Authenticated user clicks on display name
2. Edit mode activates with input field
3. User enters new name and confirms
4. System updates profile via AuthService
5. UI reflects updated name immediately

### Alternative Journey: Logout
1. Authenticated user clicks "Logout" button
2. System clears session via AuthService
3. Page reloads to show AuthCard again

## Success Criteria
- [ ] User can authenticate via email OTP
- [ ] User can authenticate via phone OTP
- [ ] Session persists across page reloads
- [ ] User can update display name
- [ ] User can logout successfully
- [ ] Protected actions require authentication
- [ ] Loading states shown during auth operations
- [ ] Error messages displayed for failed operations

## Technical Constraints
Per ARCHITECTURE.md:
- **Components**: `src/components/features/auth-card/`, `src/components/features/protected/`
- **Services**: `src/lib/auth/`
- **Context**: `src/auth/`
- **Types**: `src/lib/auth/auth-types.ts`

### Stack
- Supabase Auth for authentication
- React Context for state management
- shadcn/ui for UI components (Card, Input, Dialog)

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Invalid OTP | Show error, allow retry |
| Expired OTP | Show error, offer resend |
| Network failure | Show connection error, retry option |
| Session expired | Redirect to login |
| Invalid phone format | Validate before submit |
| Invalid email format | Validate before submit |
| User cancels mid-flow | Reset to method selection |

## Dependencies
- Supabase client (`src/lib/supabase/`)
- Toast notifications (`src/hooks/use-toast`)
- UI primitives (`src/components/ui/`)

## Files Reference

| Layer | Location | Purpose |
|-------|----------|---------|
| Components | `src/components/features/auth-card/` | AuthCard, UserSessionCard, inputs |
| Protected | `src/components/features/protected/` | ProtectedAuthWrapper, ProtectedActionDrawer |
| Services | `src/lib/auth/` | AuthService, AuthManager, AuthValidator |
| Context | `src/auth/` | AuthContext, useAuthContext hook |
| Types | `src/lib/auth/auth-types.ts` | User, AuthState, AuthResult types |

## Component Hierarchy
```
AuthProvider (context)
└── ProtectedActionDrawer
    └── ProtectedAuthWrapper
        └── AuthCard
            ├── AuthMethodRenderer
            ├── ContributionSummary
            └── [Input components]
        └── UserSessionCard
            └── ContributionSummary
```

## Status
- [x] Spec created
- [ ] Reviewed
- [x] Implemented
- [ ] Tested
