# /tdd - Test-Driven Development

Enforce test-driven development with RED → GREEN → REFACTOR cycle.

## Core Workflow

1. **Scaffold** - Define types and interfaces first
2. **RED** - Write failing tests before implementation
3. **GREEN** - Write minimal code to pass tests
4. **REFACTOR** - Improve code while keeping tests green
5. **VERIFY** - Confirm 80%+ coverage

## When to Use

- New features
- New functions/components
- Bug fixes (write reproducing test first!)
- Refactoring existing code
- Critical business logic

## The Cycle

```
┌─────────────────────────────────────┐
│                                     │
│   RED: Write a failing test         │
│         ↓                           │
│   GREEN: Make it pass (minimal)     │
│         ↓                           │
│   REFACTOR: Improve the code        │
│         ↓                           │
│   (repeat)                          │
│                                     │
└─────────────────────────────────────┘
```

## Rules

### DO:
- Write tests before implementation
- Verify tests fail before writing code
- Keep implementations minimal
- Run tests after every change
- Include edge cases and error scenarios
- Test behavior, not implementation details

### DON'T:
- Write code before tests exist
- Skip running the failing test
- Over-engineer the solution
- Implement beyond what tests require
- Over-mock (prefer real implementations)

## Coverage Requirements

| Code Type | Minimum Coverage |
|-----------|------------------|
| General | 80% |
| Financial calculations | 100% |
| Authentication logic | 100% |
| Security-critical code | 100% |
| Core business logic | 100% |

## Test Types

1. **Unit Tests** - Individual functions, isolated
2. **Integration Tests** - API endpoints, database operations
3. **E2E Tests** - Critical user flows (Playwright)

## Integration

Works with:
- `/plan` - Plan before implementing
- `/build-fix` - Fix compilation errors
- `/code-review` - Review test quality
- `/verify` - Check coverage meets threshold

---

**Agent**: Uses `tdd-guide` agent for enforcement
