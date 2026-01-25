# /code-review - Security & Quality Review

Review uncommitted changes for security vulnerabilities and code quality issues.

## Process

1. **Identify Changes** - Run `git diff --name-only HEAD`
2. **Review Each File** - Check against security and quality criteria
3. **Generate Report** - Organized by severity
4. **Enforce Standards** - Block commits with critical issues

## Review Categories

### Security (CRITICAL)
- Hardcoded credentials (API keys, passwords, tokens)
- SQL injection risks (string concatenation in queries)
- XSS vulnerabilities (unescaped user input)
- Missing input validation
- Insecure dependencies (outdated, vulnerable)
- Path traversal risks (user-controlled file paths)
- CSRF vulnerabilities
- Authentication bypasses

### Code Quality (HIGH)
- Large functions (>50 lines)
- Large files (>800 lines)
- Deep nesting (>4 levels)
- Missing error handling (try/catch)
- console.log statements
- TODO/FIXME without tickets
- Missing tests for new code

### Performance (MEDIUM)
- Inefficient algorithms (O(n²) when O(n log n) possible)
- Unnecessary re-renders in React
- Missing memoization
- N+1 query patterns

### Best Practices (MEDIUM)
- Poor variable naming (x, tmp, data)
- Magic numbers without explanation
- Missing JSDoc for public APIs
- Accessibility issues

## Output Format

For each issue:
```
[CRITICAL] Hardcoded API key
File: src/api/client.ts:42
Issue: API key exposed in source code
Fix: Move to environment variable

const apiKey = "sk-abc123";  // ❌ Bad
const apiKey = process.env.API_KEY;  // ✓ Good
```

## Approval Criteria

- ✅ **Approve**: No CRITICAL or HIGH issues
- ⚠️ **Warning**: MEDIUM issues only (can merge with caution)
- ❌ **Block**: CRITICAL or HIGH issues found

## Golden Rule

**Never approve code with security vulnerabilities!**

---

**Agent**: Uses `code-reviewer` agent from `.claude/agents/code-reviewer.md`
