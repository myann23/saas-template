# Getting Started: From PRD to Parallel Development

This guide walks you through building a SaaS product using this template, from initial idea to parallel development with multiple AI coding agents.

---

## Overview

```
PRD → Project Plan → /setup-issues → Parallel Lanes → Multiple Sub-agents → Ship
```

**Time to first code:** ~10 minutes

---

## Step 1: Write Your Project Plan

Create `docs/project-plan.md` with your product requirements.

### Template

```markdown
# Project Plan (PRD)

## Overview
[What is this project? One paragraph.]

## Problem
[What problem does this solve?]

## Solution
[How does this product solve it?]

## Target User
[Who is this for?]

## Features

### MVP
- [ ] Feature 1: Brief description
- [ ] Feature 2: Brief description
- [ ] Feature 3: Brief description

### v2
- [ ] Feature 4: Brief description
- [ ] Feature 5: Brief description

## Success Metrics
[How do you know if this is working?]

## Business Model
[How does this make money?]
```

### Example: Task Management App

```markdown
# Project Plan (PRD)

## Overview
A simple task management app for solo founders who want to track daily priorities without complex project management tools.

## Problem
Existing tools (Notion, Asana, Jira) are overkill for solo founders. They need something fast and focused.

## Solution
A minimal web app with daily focus lists, quick capture, and weekly review.

## Target User
Solo founders and indie hackers managing their own workload.

## Features

### MVP
- [ ] User authentication with email/password
- [ ] Create and manage tasks with title and status
- [ ] Daily focus view (max 3 tasks)
- [ ] Dashboard with task counts and completion stats
- [ ] Email notifications for daily summary

### v2
- [ ] Team collaboration and sharing
- [ ] Calendar integration
- [ ] Mobile app

## Success Metrics
- Daily active users
- Tasks completed per user per week
- User retention at 30 days

## Business Model
Freemium: Free tier with limits, $9/month for unlimited.
```

### Tips for Good Feature Descriptions

**Do:**
- Keep features atomic (one thing each)
- Use action verbs: "Create", "Send", "Display"
- Include the user benefit implicitly

**Don't:**
- Combine multiple features: "Auth and dashboard" ❌
- Be vague: "Make it better" ❌
- Include implementation details: "Use React Query for caching" ❌

---

## Step 2: Generate Issues with Parallel Lanes

Run the setup command:

```
/setup-issues
```

### What Happens

1. **PARSE** - Reads your `docs/project-plan.md`
2. **ANALYZE** - Detects domains (auth, dashboard, api, etc.)
3. **GROUP** - Clusters related features into lanes
4. **PREVIEW** - Shows the parallelization plan

### Example Output

```
SETUP-ISSUES PREVIEW
====================

Source: docs/project-plan.md
Features found: 5 (MVP: 5, v2: 0 shown)

PARALLELIZATION PLAN
--------------------
Lane A (auth):
  1. [MVP] User authentication with email/password

Lane B (database + ui):
  2. [MVP] Create and manage tasks with title and status
  3. [MVP] Daily focus view (max 3 tasks)
     └─ depends on: Task management

Lane C (dashboard):
  4. [MVP] Dashboard with task counts and completion stats

Lane D (notifications):
  5. [MVP] Email notifications for daily summary

PROPOSED ISSUES
---------------
#1 User authentication with email/password
   Labels: feature, lane-a, auth
   Milestone: MVP
   Acceptance Criteria:
   - [ ] Sign up form with email validation
   - [ ] Login form with error handling
   - [ ] Session persistence across refreshes

[...more issues...]

Ready to create 5 issues? (yes/no)
```

### Confirm Creation

Type `yes` to create the issues:

```
Creating labels...
✓ lane-a, lane-b, lane-c, lane-d created

Creating issues...
✓ #1: User authentication (lane-a, MVP)
✓ #2: Task management (lane-b, MVP)
✓ #3: Daily focus view (lane-b, MVP)
✓ #4: Dashboard (lane-c, MVP)
✓ #5: Email notifications (lane-d, MVP)

SETUP COMPLETE - 5 issues created
```

---

## Step 3: Understand Your Lanes

After setup, you have issues grouped by independence:

| Lane | Domain | Issues | Can Parallel With |
|------|--------|--------|-------------------|
| A | auth | #1 | B, C, D |
| B | database/ui | #2, #3 | A, C, D |
| C | dashboard | #4 | A, B, D |
| D | notifications | #5 | A, B, C |

**Key insight:** Lanes A, B, C, D can all be worked on simultaneously because they don't share files or dependencies.

### View Issues by Lane

```bash
gh issue list --label lane-a
gh issue list --label lane-b
gh issue list --label lane-c
gh issue list --label lane-d
```

---

## Step 4: Work in Parallel

You have two options for parallel development:

### Option A: Single Session (Sequential)

Work on one issue at a time:

```
/issue 1    # Complete auth
/issue 2    # Then tasks
/issue 4    # Then dashboard
```

**Best for:** Learning, small projects, when you want full control.

### Option B: Multiple Sessions (Parallel)

Open multiple Claude Code sessions, one per lane:

**Terminal 1 (Lane A - Auth):**
```
/issue 1
```

**Terminal 2 (Lane B - Tasks):**
```
/issue 2
# then /issue 3 after #2 is done
```

**Terminal 3 (Lane C - Dashboard):**
```
/issue 4
```

**Terminal 4 (Lane D - Notifications):**
```
/issue 5
```

**Best for:** Speed, larger projects, when you have the compute budget.

### Option C: Sub-Agent Workers (Advanced)

Use the Task tool to spawn autonomous workers:

```
Spawn 4 Task agents in parallel, one for each lane:

Lane A Worker:
"Work on issue #1 (User authentication). Follow the /issue workflow:
ASSESS → PLAN → CREATE → TEST → DEPLOY. Commit with 'closes #1' when done."

Lane B Worker:
"Work on issues #2, then #3 in order. Follow /issue workflow for each.
#3 depends on #2, so complete #2 first."

Lane C Worker:
"Work on issue #4 (Dashboard). Follow /issue workflow."

Lane D Worker:
"Work on issue #5 (Email notifications). Follow /issue workflow."
```

**Best for:** Maximum parallelization, when features are truly independent.

---

## Step 5: The Issue Workflow

Each `/issue <number>` follows this workflow:

```
ASSESS → RESEARCH → PLAN → CREATE → TEST → DEPLOY
```

### ASSESS
- Fetch issue details
- Determine complexity (simple vs complex)

### RESEARCH (complex only)
- Find affected files
- Check existing patterns
- Create scratchpad with findings

### PLAN
- Break into small tasks
- Check for prior art in scratchpads
- Document approach

### CREATE
- Implement in small steps
- Commit after each meaningful change
- Keep commits atomic

### TEST
- Run test suite
- Visual testing for UI
- Fix failures before proceeding

### DEPLOY
- Final commit with `closes #<number>`
- Push to main
- Update scratchpad with learnings

---

## Step 6: Handle Dependencies

Within a lane, issues may depend on each other:

```
Lane B:
  #2: Task management (do first)
  #3: Daily focus view (depends on #2)
```

**Rule:** Complete issues in order within a lane. The lane label tells you they're related.

### Cross-Lane Dependencies

Occasionally, lanes may have cross-dependencies discovered during development:

```
#4 Dashboard needs auth → depends on #1 (Lane A)
```

**Solutions:**
1. **Wait:** Pause Lane C until Lane A completes
2. **Mock:** Build dashboard with mock auth, integrate later
3. **Regroup:** Move #4 to Lane A if tightly coupled

---

## Step 7: Track Progress

### View All Issues
```bash
gh issue list
```

### View by Status
```bash
gh issue list --state open
gh issue list --state closed
```

### View by Lane
```bash
gh issue list --label lane-a --state all
```

### Check Completion
```bash
# How many done?
gh issue list --state closed --json number | jq length

# How many remaining?
gh issue list --state open --json number | jq length
```

---

## Quick Reference

### Commands

| Command | Purpose |
|---------|---------|
| `/setup-issues` | Generate issues from project plan |
| `/issue <n>` | Work on a specific issue |
| `/triage-issues` | Review and prioritize open issues |
| `/plan` | Create implementation plan |
| `/code-review` | Review uncommitted changes |
| `/verify` | Run lint, build, tests |
| `/checkpoint` | Save workflow state |

### Workflow Summary

```
1. Write docs/project-plan.md
2. Run /setup-issues
3. Confirm issue creation
4. Work lanes in parallel:
   - /issue 1 (Lane A)
   - /issue 2 (Lane B)
   - /issue 4 (Lane C)
   - etc.
5. Merge and ship
```

### Lane Labels

| Label | Color | Purpose |
|-------|-------|---------|
| `lane-a` | Purple | First parallel track |
| `lane-b` | Green | Second parallel track |
| `lane-c` | Orange | Third parallel track |
| `lane-d` | Yellow | Fourth parallel track |

---

## Troubleshooting

### "No features found"
Ensure features are listed as checkboxes under `### MVP` or `### v2`:
```markdown
### MVP
- [ ] Feature name here
```

### "gh not authenticated"
Run `gh auth login` and follow the prompts.

### Issues created in wrong lanes
Re-run `/setup-issues` with more specific feature names, or manually relabel:
```bash
gh issue edit 5 --remove-label lane-a --add-label lane-b
```

### Circular dependency detected
Break the cycle by splitting one feature into smaller pieces, or combine them into one issue.

### Sub-agent conflicts
If two agents try to edit the same file:
1. Stop one agent
2. Let the other complete
3. Resume with fresh context

---

## Next Steps

After MVP is complete:

1. **Add v2 features** to `docs/project-plan.md`
2. **Run `/setup-issues`** again to create v2 issues
3. **Continue parallel development**

For ongoing maintenance:
- Use `/triage-issues` weekly to prioritize
- Create issues for bugs as they arise
- Keep scratchpads updated for institutional memory

---

## Example: Full Session

```bash
# 1. Create project plan
code docs/project-plan.md   # Write your PRD

# 2. Generate issues
/setup-issues
> yes

# 3. Start parallel work (4 terminals)

# Terminal 1
/issue 1   # Auth

# Terminal 2
/issue 2   # Tasks
/issue 3   # Focus view (after #2 done)

# Terminal 3
/issue 4   # Dashboard

# Terminal 4
/issue 5   # Notifications

# 4. All issues closed → MVP complete!
gh issue list --state open   # Should be empty
```

---

**You're ready to build.** Start with Step 1: Write your project plan.
