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

## Issue-Based Development

GitHub Issues are the source of truth for all technical work. Use Notion for business/marketing tasks.

### Workflow
1. Check open issues: `gh issue list`
2. Work on an issue: `gh issue view <number>` then implement
3. Reference in commits: `"Fix bug (closes #42)"`
4. Create new issues: `gh issue create` or ask Claude

### Labels
`feature` `bug` `improvement` `blocked` `mvp` `v2`

### Milestones
MVP → v2 → Backlog

## Project Structure
[Fill in as the project evolves]
