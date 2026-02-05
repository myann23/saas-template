# SaaS Template

A Claude Code-powered development framework for building SaaS products with parallel AI coding agents.

## What This Is

This is not a starter kit with pre-built features. It's a **development methodology** that includes:

- Claude Code commands (`/setup-issues`, `/issue`, `/plan`, `/tdd`)
- GitHub issue templates and workflows
- Parallel development with lane-based grouping
- Security and testing rules (always active)
- Documentation structure

## Quick Start

```
PRD → /setup-issues → Parallel Lanes → Ship
```

**Time to first code:** ~10 minutes

### 1. Write Your Project Plan

Create `docs/project-plan.md` with your features:

```markdown
## Features

### MVP
- [ ] User authentication with email/password
- [ ] Task management with CRUD
- [ ] Dashboard with stats

### v2
- [ ] Team collaboration
- [ ] Mobile app
```

### 2. Generate Parallel Issues

```
/setup-issues
```

This parses your plan, groups related features into **lanes**, and creates GitHub issues:

```
Lane A (auth): #1 User authentication
Lane B (tasks): #2 Task management, #3 Dashboard
Lane C (api): #4 API endpoints
```

### 3. Work in Parallel

Open multiple terminals, one per lane:

```bash
# Terminal 1          # Terminal 2          # Terminal 3
/issue 1              /issue 2              /issue 4
                      /issue 3 (after #2)
```

Lanes are independent - work on all of them simultaneously.

## Documentation

| Doc | Purpose |
|-----|---------|
| [Getting Started](docs/getting-started.md) | Full walkthrough from PRD to parallel development |
| [GitHub Issues Manual](docs/github-issues-manual.md) | Issue workflow and commands |
| [Project Plan](docs/project-plan.md) | Your product requirements (template) |

## Commands

| Command | Purpose |
|---------|---------|
| `/setup-issues` | Generate issues from project plan with lane grouping |
| `/issue <n>` | Work on a specific issue (full workflow) |
| `/plan` | Create implementation plan |
| `/tdd` | Test-driven development |
| `/code-review` | Security and quality review |
| `/verify` | Run lint, build, tests |
| `/triage-issues` | Prioritize open issues |

## Project Structure

```
.claude/
  commands/       # Claude Code commands
  agents/         # Specialized AI agents
  rules/          # Security & testing rules (always active)
.github/
  ISSUE_TEMPLATE/ # Issue templates (feature, bug, improvement)
docs/
  getting-started.md    # Start here
  project-plan.md       # Your PRD
  github-issues-manual.md
  scratchpads/          # Planning artifacts per issue
  technical/            # Architecture docs
  marketing/            # GTM strategy
```

## License

MIT
