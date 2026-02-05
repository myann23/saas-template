# Triage Open Issues

Review and organize open GitHub issues for this repo.

## Process

1. **List all open issues:** `gh issue list --state open --limit 50`

2. **Group by lane** (if lanes exist):
   ```bash
   gh issue list --label lane-a --state open
   gh issue list --label lane-b --state open
   gh issue list --label lane-c --state open
   gh issue list --label lane-d --state open
   ```

3. **For each issue, assess:**
   - Is it well-defined? (clear acceptance criteria)
   - What's the priority? (critical, high, medium, low)
   - What milestone? (MVP, v2, Backlog)
   - What lane? (for parallel work planning)

4. **Add missing labels** where needed

5. **Suggest next actions** based on:
   - Dependencies (what unblocks other work)
   - Lane status (which lanes are clear to start)
   - Impact (user value)
   - Effort (quick wins vs. big lifts)

## Output

Provide recommendations organized by lane:

```
TRIAGE SUMMARY
==============

Lane A (auth): 2 open issues
  → Ready to start: #1 User auth
  → Blocked by #1: #2 Password reset

Lane B (dashboard): 1 open issue
  → Ready to start: #3 Dashboard layout

Lane C (api): CLEAR (all issues closed)

RECOMMENDED NEXT:
- Start Lane A and Lane B in parallel
- Lane A: /issue 1
- Lane B: /issue 3
```
