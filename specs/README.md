# Specs Directory

This directory contains specifications for features in the Jaybhim Affirma project.

## Structure

```
specs/
├── features/     # Feature specifications (what + why)
├── plans/        # Technical implementation plans (how)
└── tasks/        # Granular task breakdowns (steps)
```

## Workflow

### For New Features
1. **Specify**: Use `/specify` to create a feature spec
2. **Plan**: Use `/plan` to create a technical plan
3. **Tasks**: Use `/tasks` to break down into actionable items
4. **Implement**: Work through tasks one by one

### For Existing Features
1. Use `/specify` with "existing" flag to document current behavior
2. Store spec in `features/` for future reference
3. Use as baseline for enhancements or bug fixes

### For Bug Fixes
1. Reference the relevant spec
2. Identify deviation from expected behavior
3. Fix code OR update spec (if behavior was intentional)

## Spec Format

Each feature spec includes:
- **Purpose**: What problem does this solve?
- **User Journeys**: How users interact with it
- **Success Criteria**: Measurable definition of "done"
- **Technical Constraints**: Limitations from ARCHITECTURE.md
- **Edge Cases**: Unusual scenarios to handle
- **Dependencies**: Other features/services required

## Naming Convention

- Features: `[feature-name].spec.md`
- Plans: `[feature-name].plan.md`
- Tasks: `[feature-name].tasks.md`

## Status Tracking

Each spec includes a status checklist:
- [ ] Spec created
- [ ] Reviewed
- [ ] Implemented
- [ ] Tested

Update status as work progresses.
