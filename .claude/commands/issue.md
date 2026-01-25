# Work on GitHub Issue

Work on GitHub issue #$ARGUMENTS

## ASSESS

1. Fetch issue details: `gh issue view $ARGUMENTS`
2. Determine complexity:
   - **Simple**: One-file fix, typo, small bug, clear solution → skip to PLAN
   - **Complex**: Multiple files, new feature, unclear approach, unfamiliar area → do RESEARCH first

## RESEARCH (complex issues only)

Use the Task tool to spawn an Explore subagent:

```
Analyze issue #$ARGUMENTS for this codebase. Find:
1. Files likely affected by this change
2. Existing patterns for similar functionality
3. Related tests and testing conventions
4. Dependencies or integrations to consider

Return a concise context summary (under 500 words).
```

Create scratchpad at `docs/scratchpads/issue-$ARGUMENTS-{slug}.md` and save research findings.

## PLAN

1. Check `docs/scratchpads/` for previous work on similar issues
2. Search PRs: `gh pr list --search "keywords"`
3. Break down into small, manageable tasks
4. Append plan to scratchpad (or create scratchpad if skipped research)

## CREATE

- Implement in small steps according to your plan
- Commit after each meaningful change
- Keep commits focused and atomic

## TEST

- Run the project's test suite
- Test UI changes visually (use browser/screenshot tools)
- Fix any failures before proceeding
- All tests must pass before moving on

## DEPLOY

- Final commit with message: `"Description (closes #$ARGUMENTS)"`
- Push to main
- Append completion summary to scratchpad: what was done, any gotchas for future reference

## If Blocked

- Add comment: `gh issue comment $ARGUMENTS -b "Blocked: [reason]"`
- For complex work, post progress updates to the issue

---

Use `gh` CLI for all GitHub operations.
If things go off track after 2-3 corrections, `/clear` and start fresh.
