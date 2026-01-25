# /verify - Codebase Verification

Run comprehensive checks to validate code quality before commits or PRs.

## Usage

```
/verify [mode]
```

## Modes

| Mode | Checks | Use Case |
|------|--------|----------|
| `quick` | Build + Types | Fast iteration |
| `full` | All checks (default) | Before commits |
| `pre-commit` | Commit-relevant only | Git hooks |
| `pre-pr` | Full + Security scan | Before opening PR |

## Check Pipeline

Runs sequentially, stops on first failure:

1. **Build** - `npm run build` / `pnpm build`
   - Stops immediately if build fails

2. **Type Check** - `tsc --noEmit`
   - Reports errors with file:line locations

3. **Lint** - `npm run lint`
   - Code style violations

4. **Test** - `npm test`
   - Pass rate and coverage metrics

5. **Audit** - Debug statement scan
   - Finds console.log in source files
   - Lists uncommitted changes

## Output Format

```
VERIFICATION SUMMARY
====================
Build:     ✓ PASS
Types:     ✓ PASS (0 errors)
Lint:      ⚠ WARN (3 warnings)
Tests:     ✓ PASS (42/42, 87% coverage)
Audit:     ✗ FAIL (2 console.log found)

Ready for PR: NO
-----------------
Fix: Remove console.log statements before committing
```

## Integration

Use in your workflow:
- After `/tdd` - Verify implementation
- Before `/code-review` - Ensure clean state
- Before `git push` - Final validation

---

$ARGUMENTS: mode (quick|full|pre-commit|pre-pr)
