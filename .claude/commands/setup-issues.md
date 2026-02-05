# /setup-issues - Generate GitHub Issues from Project Plan

Parse `docs/project-plan.md` and create structured, parallelizable GitHub issues.

## Usage

```
/setup-issues [mode]
```

| Mode | Description |
|------|-------------|
| (none) | Preview proposed issues and lanes (default) |
| `create` | Create issues after confirmation |
| `plan-only` | Show parallelization plan without issue details |

---

## Process

### Phase 1: PARSE

1. Read `docs/project-plan.md`
2. Extract features from `### MVP` and `### v2` sections
3. Parse each checkbox item: `- [ ] Feature name`
4. Capture any sub-bullets as description/context

**If file not found:** Stop and instruct user to create it from the template.

### Phase 2: ANALYZE

For each feature, detect:

**Domain** (from keywords in feature name):
| Domain | Keywords |
|--------|----------|
| `auth` | login, signup, password, session, oauth, jwt, user, account |
| `api` | endpoint, api, rest, graphql, webhook, route |
| `dashboard` | dashboard, admin, panel, overview, metrics, analytics |
| `database` | database, schema, migration, model, query, table, prisma |
| `ui` | component, button, form, modal, page, layout, style |
| `payments` | payment, stripe, billing, subscription, invoice, checkout |
| `notifications` | email, notification, alert, message, sms |
| `settings` | settings, config, preferences, profile |

**Files likely affected** (infer from domain + Next.js conventions):
- auth → `app/auth/`, `app/api/auth/`, `lib/auth/`
- api → `app/api/`, `lib/api/`
- dashboard → `app/dashboard/`, `components/dashboard/`
- database → `prisma/`, `lib/db/`
- ui → `components/`, `components/ui/`
- payments → `app/api/payments/`, `lib/payments/`

### Phase 3: GROUP

Cluster features into **lanes** for parallel work:

**Rules:**
- Same domain → same lane
- Explicit dependency ("requires X", "after Y") → same lane
- Different domains with no overlap → separate lanes

**Within each lane:** Order by dependencies (if A depends on B, B comes first)

**Lane labels:** `lane-a`, `lane-b`, `lane-c`, `lane-d` (max 4 lanes)

### Phase 4: PREVIEW

Display the parallelization plan:

```
SETUP-ISSUES PREVIEW
====================

Source: docs/project-plan.md
Features found: X (MVP: Y, v2: Z)

PARALLELIZATION PLAN
--------------------
Lane A (auth):
  1. [MVP] User authentication
  2. [MVP] Password reset
     └─ depends on: User authentication

Lane B (dashboard):
  3. [MVP] Dashboard layout
  4. [MVP] Data visualization
     └─ depends on: Dashboard layout

Lane C (independent):
  5. [MVP] Email notifications

PROPOSED ISSUES
---------------
#1 User authentication
   Labels: feature, lane-a, auth
   Milestone: MVP
   Acceptance Criteria:
   - [ ] Sign up form with validation
   - [ ] Login form with error handling
   - [ ] Session persistence

[...continue for each issue...]

Ready to create X issues? (yes/no)
```

### Phase 5: CONFIRM

**STOP and wait for explicit user approval.**

Only proceed to CREATE phase if user responds with: `yes`, `y`, `proceed`, or `confirm`

If user says `no` or wants changes, adjust the plan and re-preview.

### Phase 6: CREATE

1. **Ensure labels exist:**
   ```bash
   gh label create lane-a --color 7057FF --description "Parallelization lane A" --force
   gh label create lane-b --color 0E8A16 --description "Parallelization lane B" --force
   gh label create lane-c --color D93F0B --description "Parallelization lane C" --force
   gh label create lane-d --color FBCA04 --description "Parallelization lane D" --force
   ```

2. **Ensure milestones exist:**
   ```bash
   gh api repos/{owner}/{repo}/milestones --method POST -f title="MVP" -f state="open" 2>/dev/null || true
   gh api repos/{owner}/{repo}/milestones --method POST -f title="v2" -f state="open" 2>/dev/null || true
   ```

3. **Create issues:**
   ```bash
   gh issue create --title "Feature name" \
     --label feature --label lane-a --label auth \
     --milestone MVP \
     --body "$(cat <<'EOF'
   ## Summary
   [One sentence description]

   ## User Story
   As a [user], I want [feature] so that [benefit].

   ## Acceptance Criteria
   - [ ] Criterion 1
   - [ ] Criterion 2

   ## Files Likely Affected
   - [ ] path/to/file1
   - [ ] path/to/file2

   ## Technical Notes
   Part of Lane A (auth domain). Can be worked in parallel with Lane B and C.

   ## Milestone
   MVP
   EOF
   )"
   ```

4. **Output summary:**
   ```
   SETUP COMPLETE
   ==============
   Created X issues

   PARALLEL WORK GUIDE
   -------------------
   Lane A: gh issue list --label lane-a
   Lane B: gh issue list --label lane-b
   Lane C: gh issue list --label lane-c

   Start with: /issue <number> for any lane

   Or spawn parallel agents (copy these prompts):

   [Lane A Worker Prompt]
   [Lane B Worker Prompt]
   ```

---

## Acceptance Criteria Templates

Generate criteria based on feature type:

| Feature Type | Keywords | Criteria Pattern |
|--------------|----------|------------------|
| Form/Input | form, input, field | Validates required fields, Shows errors, Success state |
| Auth | login, signup, auth | User can sign up, User can log in, Session persists |
| CRUD | create, add, edit, delete, manage | Can create, Can list, Can update, Can delete |
| UI Component | button, modal, component | Renders correctly, Responsive, Accessible |
| API | endpoint, api, route | Returns correct status, Validates input, Handles errors |

---

## Parallel Work Prompts

After creating issues, output ready-to-use Task tool prompts:

```markdown
## Lane A Worker

Work on issues labeled `lane-a` in dependency order:
1. `gh issue view <first-issue>`
2. Follow /issue workflow: ASSESS → PLAN → CREATE → TEST → DEPLOY
3. Commit with `closes #<number>`
4. Move to next issue in lane
5. Stop and report if blocked

Issues in this lane:
- #1: User authentication
- #2: Password reset (depends on #1)
```

---

## Error Handling

| Error | Response |
|-------|----------|
| `project-plan.md` not found | "Create docs/project-plan.md first. See template in repo." |
| No features found | "No features found. Add features as `- [ ] Feature name` under ### MVP or ### v2" |
| `gh` not authenticated | "Run `gh auth login` first" |
| Circular dependency | "Warning: Circular dependency between X and Y. Review and break the cycle." |

---

## Integration

After setup:
- Filter by lane: `gh issue list --label lane-a`
- Work on issues: `/issue <number>`
- Triage: `/triage-issues`
- Check progress: `gh issue list --state all --label lane-a`

---

$ARGUMENTS: mode (preview/create/plan-only)
