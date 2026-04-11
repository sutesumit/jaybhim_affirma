---
description: Break down implementation plans into actionable tasks
---

You are breaking down an implementation plan into small, actionable tasks. Follow this workflow:

## Input
- Plan file path: $ARGUMENTS (e.g., `specs/plans/authentication.plan.md`)

## Workflow

### Step 1: Read and Analyze Plan
1. Read the implementation plan at `$ARGUMENTS`
2. Identify all phases and their tasks
3. Note dependencies between tasks
4. Check for existing code that can be reused

### Step 2: Create Task Breakdown
For each task in the plan, create granular subtasks that are:
- **Small**: Completable in 15-30 minutes
- **Reviewable**: Has clear acceptance criteria
- **Testable**: Can be verified independently
- **Atomic**: Doesn't require other tasks to be done first (when possible)

### Step 3: Generate Task File
Create a task file at `specs/tasks/[feature-name].tasks.md` with:

```markdown
# [Feature Name] Tasks

## Reference
- Plan: `$ARGUMENTS`

## Phase 1: Foundation

### 1.1 Types & Interfaces
- [ ] **T1.1.1**: Create types in `src/types/[feature].ts`
  - Acceptance: Types compile without errors
  - Time: 10min

- [ ] **T1.1.2**: Export types from barrel file
  - Acceptance: Can import from `@/types`
  - Time: 2min

### 1.2 Service Layer
- [ ] **T1.2.1**: Create service file `src/lib/[feature]/[feature]-service.ts`
  - Acceptance: File exists with basic structure
  - Time: 15min

- [ ] **T1.2.2**: Implement CRUD functions
  - Acceptance: Functions interact with Supabase correctly
  - Time: 30min

### 1.3 Hooks
- [ ] **T1.3.1**: Create `use[Feature]` hook
  - Acceptance: Hook returns data and actions
  - Time: 25min

---

## Phase 2: UI Components

### 2.1 Main Component
- [ ] **T2.1.1**: Create main component file
  - Acceptance: Component renders without errors
  - Time: 20min

- [ ] **T2.1.2**: Implement UI structure
  - Acceptance: Matches design/wireframe
  - Time: 30min

### 2.2 Sub-components
- [ ] **T2.2.1**: Create sub-components as needed
  - Acceptance: Components render correctly
  - Time: 20min each

### 2.3 Barrel File
- [ ] **T2.3.1**: Create `index.ts` exports
  - Acceptance: Clean imports work
  - Time: 5min

---

## Phase 3: Integration

### 3.1 API Routes
- [ ] **T3.1.1**: Create API route handlers
  - Acceptance: Endpoints respond correctly
  - Time: 20min

### 3.2 Page Integration
- [ ] **T3.2.1**: Integrate component in target page
  - Acceptance: Component works in page context
  - Time: 15min

---

## Summary

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 1. Foundation | X | Xmin |
| 2. UI | X | Xmin |
| 3. Integration | X | Xmin |
| **Total** | **X** | **Xmin** |

## Progress Tracking
- Started: [DATE]
- Completed: 0/X tasks (0%)
```

### Step 4: Validate
1. Ensure each task is truly atomic
2. Verify dependencies are correct
3. Check time estimates are reasonable

## Output
- Create task file at `specs/tasks/[feature-name].tasks.md`
- Summarize total tasks and estimated time
- Suggest starting point

## Reference Files
- `specs/features/*.spec.md` - Source specifications
- `specs/plans/*.plan.md` - Source plans
- `ARCHITECTURE.md` - File location conventions
