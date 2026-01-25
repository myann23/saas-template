# Security Rules

These rules are ALWAYS active. Follow them for every code change.

## Mandatory Security Checks

Before ANY commit:
- [ ] No hardcoded secrets (API keys, passwords, tokens)
- [ ] All user inputs validated
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (sanitized HTML output)
- [ ] CSRF protection enabled
- [ ] Authentication/authorization verified
- [ ] Rate limiting on all endpoints
- [ ] Error messages don't leak sensitive data

## Secret Management

```typescript
// NEVER: Hardcoded secrets
const apiKey = "sk-proj-xxxxx"  // ❌

// ALWAYS: Environment variables
const apiKey = process.env.OPENAI_API_KEY  // ✓

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## Input Validation

```typescript
// ALWAYS validate user input
function processUserInput(input: unknown) {
  // 1. Type check
  if (typeof input !== 'string') {
    throw new Error('Invalid input type')
  }

  // 2. Sanitize
  const sanitized = input.trim().slice(0, MAX_LENGTH)

  // 3. Validate format
  if (!ALLOWED_PATTERN.test(sanitized)) {
    throw new Error('Invalid input format')
  }

  return sanitized
}
```

## Database Queries

```typescript
// NEVER: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`  // ❌

// ALWAYS: Parameterized queries
const query = 'SELECT * FROM users WHERE id = $1'  // ✓
const result = await db.query(query, [userId])
```

## Security Response Protocol

If security issue found:
1. **STOP** immediately
2. Use **security-reviewer** agent
3. Fix CRITICAL issues before continuing
4. Rotate any exposed secrets
5. Review entire codebase for similar issues
6. Add tests to prevent regression

## Forbidden Patterns

- `eval()` with user input
- `innerHTML` with unsanitized data
- `dangerouslySetInnerHTML` without sanitization
- Storing passwords in plain text
- Logging sensitive data (passwords, tokens, PII)
- Disabling HTTPS in production
- Using `*` in CORS origins for production
