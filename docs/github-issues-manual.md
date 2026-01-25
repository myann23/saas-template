# GitHub Issues Quick Reference

Your technical task management lives in GitHub Issues. Business/marketing tasks stay in Notion.

---

## Daily Workflow

### Starting a session
```
what are the open issues?
```

### Working on something
```
work on issue 15
```
Or use: `/issue 15`

### After completing work
Commits auto-close issues when you include `closes #15`:
```
git commit -m "Add dark mode (closes #15)"
```

### Adding new tasks
```
create an issue for: Add export to PDF feature
```

### Reviewing priorities
```
triage the open issues
```
Or use: `/triage-issues`

---

## Quick Commands

| Task | Command |
|------|---------|
| List open issues | `gh issue list` |
| View issue details | `gh issue view 15` |
| Create issue | `gh issue create` |
| Close issue | `gh issue close 15` |
| Add comment | `gh issue comment 15 -b "message"` |
| Filter by label | `gh issue list --label feature` |
| Filter by milestone | `gh issue list --milestone MVP` |

---

## Labels

| Label | Use for |
|-------|---------|
| `feature` | New functionality |
| `bug` | Something broken |
| `improvement` | Enhance existing feature |
| `blocked` | Waiting on something external |
| `mvp` | MVP milestone |
| `v2` | Version 2 milestone |

---

## Milestones

- **MVP** - Must-have for launch
- **v2** - Post-launch improvements
- **Backlog** - Future ideas

---

## GitHub vs Notion

| GitHub Issues | Notion Tasks |
|---------------|--------------|
| Code features | Marketing campaigns |
| Bug fixes | Business strategy |
| Technical improvements | Admin tasks |
| Repo-specific work | Cross-project work |

---

## New Project Setup

When starting a new project, ask Claude:
```
set up GitHub Issues for [project-name]
```

This will:
1. Create issue templates
2. Add labels (feature, bug, improvement, blocked, mvp, v2)
3. Create milestones (MVP, v2, Backlog)
4. Update CLAUDE.md

Or manually:
1. Copy `.github/ISSUE_TEMPLATE/` from TextMuncher
2. Run label commands (see below)
3. Add issue workflow section to CLAUDE.md

### Label setup for new repo
```bash
gh label create feature --color 0E8A16 --repo myann23/REPO
gh label create improvement --color A2EEEF --repo myann23/REPO
gh label create blocked --color B60205 --repo myann23/REPO
gh label create mvp --color FBCA04 --repo myann23/REPO
gh label create v2 --color C5DEF5 --repo myann23/REPO
```

### Milestone setup for new repo
```bash
gh api repos/myann23/REPO/milestones -f title="MVP" -f state="open"
gh api repos/myann23/REPO/milestones -f title="v2" -f state="open"
gh api repos/myann23/REPO/milestones -f title="Backlog" -f state="open"
```

---

## Viewing Issues

1. **Terminal**: `gh issue list`
2. **GitHub web**: github.com/myann23/[repo]/issues
3. **Ask Claude**: "what are the open issues?"
