---
description: Generate detailed feature specifications from descriptions or existing code
---

You are creating a detailed feature specification. Follow this workflow:

## Input Required
Ask the user for:
1. **Feature name** (e.g., "authentication", "likes", "comments")
2. **Brief description** of what the feature should do
3. **Is this for existing code or a new feature?**

## Workflow

### Step 1: Discovery (for existing features)
If documenting existing code:
1. Search `src/components/features/$1/` for components
2. Search `src/lib/$1/` for business logic
3. Search `src/app/api/$1/` for API routes
4. Read the main files to understand current behavior
5. Note any gaps between code and expected behavior

### Step 2: Generate Specification
Create a spec file at `specs/features/$1.spec.md` with:

```markdown
# [$1] Specification

## Purpose
[What problem does this solve? Why does it exist?]

## User Journeys

### Primary Journey
1. User does X
2. System responds with Y
3. [Continue steps...]

### Alternative Journeys
- [Edge case 1]
- [Edge case 2]

## Success Criteria
- [ ] Criterion 1 (measurable)
- [ ] Criterion 2 (measurable)
- [ ] Criterion 3 (measurable)

## Technical Constraints
Reference ARCHITECTURE.md for:
- Layer placement (components/features/, lib/, etc.)
- Import conventions
- Tech stack limitations

## Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| [Case 1] | [Response] |
| [Case 2] | [Response] |

## Dependencies
- [Other features this depends on]
- [External services required]

## Files Reference
| Layer | Location |
|-------|----------|
| Components | `src/components/features/$1/` |
| Services | `src/lib/$1/` |
| API Routes | `src/app/api/$1/` |
| Types | `src/types/$1.ts` |

## Status
- [ ] Spec created
- [ ] Reviewed
- [ ] Implemented
- [ ] Tested
```

### Step 3: Validate
1. Ensure spec aligns with ARCHITECTURE.md layer conventions
2. Check for consistency with existing specs in `specs/features/`
3. Verify file references match actual project structure

## Output
- Create the spec file at `specs/features/$1.spec.md`
- Summarize what was documented
- List any questions or ambiguities found

## Reference Files
- `ARCHITECTURE.md` - Technical constraints and layer conventions
- `specs/README.md` - Spec format guidelines
- Existing specs in `specs/features/` - For consistency
