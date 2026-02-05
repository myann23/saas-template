# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Project Overview
[Fill in: What is this project? What problem does it solve?]

## Tech Stack
[Fill in: What technologies are you using?]

**Framework recommendation:** Use Next.js (App Router) for any web app with public-facing pages. Next.js provides SSR/SSG out of the box, making SEO trivial from day one. Avoids painful migrations later. Only use Vite for internal tools where SEO doesn't matter.

## Development
[Fill in: How to run the project locally]

```bash
# Example
npm install
npm run dev
```

## Code Quality

Run these checks after implementing code, before committing:

```bash
npm run lint      # Style/syntax issues
npm run build     # TypeScript + bundle errors
```

If the project has tests:
```bash
npm test          # Unit/integration tests
```

**When to run:**
- After completing a feature or fix (before commit)
- After resolving merge conflicts
- Before pushing to remote

**Skip for:** Documentation-only changes, config tweaks

## Issue-Based Development

GitHub Issues are the source of truth for all technical work. Use Notion for business/marketing tasks.

### Starting a New Project

1. Write your PRD in `docs/project-plan.md`
2. Run `/setup-issues` to generate issues with parallel lanes
3. Confirm creation when prompted
4. Work on lanes in parallel (see below)

### Parallel Lanes

`/setup-issues` groups related features into independent **lanes** that can be worked on simultaneously:

```
Lane A (auth): #1 User auth, #2 Password reset
Lane B (dashboard): #3 Layout, #4 Charts
Lane C (api): #5 Endpoints
```

- **Different lanes** → work in parallel (no conflicts)
- **Same lane** → work sequentially (dependencies exist)
- Filter by lane: `gh issue list --label lane-a`

### Daily Workflow

1. Check open issues: `gh issue list` (or by lane: `--label lane-a`)
2. Work on an issue: `/issue <number>`
3. Reference in commits: `"Fix bug (closes #42)"`
4. Create new issues: `gh issue create` or `/setup-issues` for bulk

### Labels

**Type labels:** `feature` `bug` `improvement` `blocked`

**Lane labels:** `lane-a` `lane-b` `lane-c` `lane-d` (for parallel work)

**Category labels:** (customize per project, e.g., `setup` `database` `ui` `api` `auth`)

### Issue Templates

Always use the templates in `.github/ISSUE_TEMPLATE/` when creating issues:

| Template | Use For | Auto-Label |
|----------|---------|------------|
| `feature.md` | New functionality | `feature` |
| `bug.md` | Something broken | `bug` |
| `improvement.md` | Enhance existing | `improvement` |

**Creating issues via CLI:**
```bash
# Use the template structure in the body
gh issue create --title "Add user auth" --label feature --label auth --body "$(cat <<'EOF'
## Summary
Add user authentication with email/password.

## User Story
As a user, I want to log in so that my data is saved.

## Acceptance Criteria
- [ ] Sign up form
- [ ] Login form
- [ ] Session persistence

## Technical Notes
Use Supabase Auth or NextAuth.js
EOF
)"
```

### Milestones
MVP → v2 → Backlog

### Working on Issues
Use `/issue <number>` to work on a GitHub issue. This command follows a 4-phase workflow:
1. **PLAN** - Understand the issue, search for prior art, document plan in scratchpad
2. **CREATE** - Implement in small steps, commit after each step
3. **TEST** - Run tests, fix failures, verify UI with Chrome extension
4. **DEPLOY** - Final commit with `closes #<number>`, push to main

### Scratchpads
`docs/scratchpads/` stores planning artifacts for issues. These create institutional memory:
- Search here for prior art on similar problems
- Plans are named `issue-{number}-{slug}.md`
- Include implementation steps and link to the issue

## Project Structure
[Fill in as the project evolves]
