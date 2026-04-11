---
description: Create technical implementation plans from specifications
---

You are creating a technical implementation plan from a specification. Follow this workflow:

## Input
- Spec file path: $ARGUMENTS (e.g., `specs/features/authentication.spec.md`)

## Workflow

### Step 1: Read and Analyze Spec
1. Read the spec file at `$ARGUMENTS`
2. Identify all user journeys and success criteria
3. Note technical constraints and dependencies
4. Check ARCHITECTURE.md for layer conventions

### Step 2: Design Technical Approach
For each user journey, determine:
1. **Components needed** (Layer 2: `src/components/features/`)
2. **Services needed** (Layer 3: `src/lib/`)
3. **API routes needed** (Layer 1: `src/app/api/`)
4. **Types needed** (`src/types/`)
5. **Hooks needed** (`src/hooks/` or feature-level)

### Step 3: Create Implementation Plan
Create a plan file at `specs/plans/[feature-name].plan.md` with:

```markdown
# [Feature Name] Implementation Plan

## Overview
[Brief summary of what will be built]

## Reference Spec
- Spec: `$ARGUMENTS`

## Architecture Alignment
Per ARCHITECTURE.md:
- **Layer 1 (App)**: [What goes in app/]
- **Layer 2 (Components)**: [What goes in components/]
- **Layer 3 (Infrastructure)**: [What goes in lib/, hooks/, types/]

## Implementation Phases

### Phase 1: Foundation
**Goal**: [What this phase accomplishes]

| Task | Location | Description |
|------|----------|-------------|
| Create types | `src/types/[feature].ts` | [Type definitions] |
| Create service | `src/lib/[feature]/` | [Service layer] |
| Create hooks | `src/hooks/` or feature-level | [Custom hooks] |

### Phase 2: UI Components
**Goal**: [What this phase accomplishes]

| Task | Location | Description |
|------|----------|-------------|
| Main component | `src/components/features/[feature]/` | [Main UI] |
| Sub-components | `src/components/features/[feature]/components/` | [Sub UI] |
| Barrel file | `src/components/features/[feature]/index.ts` | [Exports] |

### Phase 3: Integration
**Goal**: [What this phase accomplishes]

| Task | Location | Description |
|------|----------|-------------|
| API routes | `src/app/api/[feature]/` | [Endpoints] |
| Page integration | `src/app/(pages)/` | [Page usage] |

## File Structure
```
src/
├── app/
│   └── api/[feature]/
│       └── route.ts
├── components/features/[feature]/
│   ├── [Feature].tsx
│   ├── components/
│   ├── hooks/
│   └── index.ts
├── lib/[feature]/
│   ├── [feature]-service.ts
│   └── index.ts
├── types/
│   └── [feature].ts
└── hooks/
    └── use-[feature].ts
```

## Dependencies
- [External packages needed]
- [Internal features depended on]

## Risk Mitigation
| Risk | Mitigation |
|------|------------|
| [Risk 1] | [How to handle] |

## Testing Strategy
- [ ] Unit tests for services
- [ ] Component tests
- [ ] Integration tests
- [ ] Manual testing checklist

## Status
- [ ] Plan created
- [ ] Plan reviewed
- [ ] Ready for task breakdown
```

### Step 4: Validate
1. Ensure plan follows 3-layer architecture from ARCHITECTURE.md
2. Verify all files are in correct locations
3. Check for missing pieces

## Output
- Create plan at `specs/plans/[feature-name].plan.md`
- Summarize the approach
- Highlight any risks or concerns

## Reference Files
- `ARCHITECTURE.md` - Layer conventions and import patterns
- `specs/features/*.spec.md` - Source specifications
- `GEMINI.md` - Project conventions
