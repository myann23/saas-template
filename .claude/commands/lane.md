# /lane - Work Through All Issues in a Lane

Process all open issues in a lane sequentially without stopping.

## Usage

```
/lane <lane-letter>
```

Examples:
- `/lane a` - Work through all issues in lane-a
- `/lane b` - Work through all issues in lane-b

---

## Process

### 1. FETCH LANE ISSUES

Get all open issues in the lane, ordered by issue number (dependencies first):

```bash
gh issue list --label lane-$ARGUMENTS --state open --json number,title,labels --jq '.[] | "\(.number): \(.title)"'
```

If no issues found, report "Lane $ARGUMENTS is clear - no open issues."

### 2. WORK THROUGH EACH ISSUE

For each issue in the lane (in order):

```
┌─────────────────────────────────────────┐
│ ISSUE #N: [Title]                       │
├─────────────────────────────────────────┤
│ 1. ASSESS - Fetch details, check deps   │
│ 2. RESEARCH - (if complex)              │
│ 3. PLAN - Break down tasks              │
│ 4. CREATE - Implement in small commits  │
│ 5. TEST - Run /verify quick (MANDATORY) │
│ 6. DEPLOY - Commit with closes #N, push │
├─────────────────────────────────────────┤
│ ✓ Issue #N complete                     │
│ → Moving to next issue in lane...       │
└─────────────────────────────────────────┘
```

**Do NOT stop between issues.** Continue automatically to the next one.

### 3. COMPLETE LANE

After all issues are done:

```
LANE $ARGUMENTS COMPLETE
========================
Issues completed: #1, #2, #3
Total: 3 issues
Time: [duration]

All issues in lane-$ARGUMENTS are now closed.
```

---

## Rules

### Continue Without Stopping
- After completing an issue, immediately start the next one
- No user confirmation needed between issues
- Only stop if blocked or if an error can't be resolved

### Mandatory Testing
- Run `/verify quick` (or `npm run lint && npm run build && npm test`) after each issue
- If tests fail, fix before moving to next issue
- Never skip testing

### Dependency Order
- Issues are processed in number order (lowest first)
- Lower-numbered issues in the same lane are typically dependencies
- If an issue explicitly depends on another that's not done, skip and note it

### When to Stop
Stop and report if:
- A test failure can't be fixed after 2-3 attempts
- An issue is blocked by external factors
- A merge conflict requires manual resolution
- You encounter a security issue that needs review

---

## Progress Reporting

After each issue, output a brief status:

```
✓ #1 User authentication - DONE
  → Commits: 3 | Tests: passing | Pushed to main

Starting #2 Password reset...
```

---

## Example Session

```
/lane a

LANE A: 3 open issues
========================
#1: User authentication
#2: Password reset (depends on #1)
#5: Session management (depends on #1)

Starting #1: User authentication...
[... ASSESS, PLAN, CREATE, TEST, DEPLOY ...]
✓ #1 complete - pushed to main

Starting #2: Password reset...
[... ASSESS, PLAN, CREATE, TEST, DEPLOY ...]
✓ #2 complete - pushed to main

Starting #5: Session management...
[... ASSESS, PLAN, CREATE, TEST, DEPLOY ...]
✓ #5 complete - pushed to main

LANE A COMPLETE
===============
Issues completed: #1, #2, #5
All tests passing.
```

---

## Parallel Lanes

To work on multiple lanes simultaneously, open separate terminals:

```bash
# Terminal 1        # Terminal 2        # Terminal 3
/lane a             /lane b             /lane c
```

Each lane runs independently without conflicts.

---

$ARGUMENTS: lane letter (a, b, c, or d)
