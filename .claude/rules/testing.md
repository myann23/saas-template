# Testing Rules

These rules are ALWAYS active. Follow them for every feature.

## Minimum Test Coverage: 80%

All new code must maintain or improve test coverage.

## Test Types (ALL Required)

1. **Unit Tests** - Individual functions, utilities, components
2. **Integration Tests** - API endpoints, database operations
3. **E2E Tests** - Critical user flows (Playwright)

## Test-Driven Development

MANDATORY workflow for new features:

```
1. Write test first (RED)
       ↓
2. Run test - it should FAIL
       ↓
3. Write minimal implementation (GREEN)
       ↓
4. Run test - it should PASS
       ↓
5. Refactor (IMPROVE)
       ↓
6. Verify coverage (80%+)
```

## Coverage Requirements

| Code Type | Minimum |
|-----------|---------|
| General code | 80% |
| Financial calculations | 100% |
| Authentication logic | 100% |
| Security-critical code | 100% |
| Core business logic | 100% |

## Test Quality Standards

### DO:
- Test behavior, not implementation
- Include edge cases and error scenarios
- Use descriptive test names
- Keep tests isolated and independent
- Mock external services, not internal code

### DON'T:
- Write tests after implementation (write first!)
- Skip the failing test step
- Over-mock (prefer real implementations)
- Test private methods directly
- Write flaky tests (fix or delete them)

## Test Naming Convention

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid email', () => {})
    it('should throw error for invalid email', () => {})
    it('should hash password before storing', () => {})
  })
})
```

## Troubleshooting Test Failures

1. Use **tdd-guide** agent for guidance
2. Check test isolation (no shared state)
3. Verify mocks are correct
4. Fix implementation, not tests (unless tests are wrong)
5. Run tests in isolation to find conflicts

## Agent Support

- **tdd-guide** - Use PROACTIVELY for new features
- **e2e-runner** - Playwright E2E testing specialist
