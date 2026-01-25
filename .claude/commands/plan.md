# /plan - Implementation Planning

Invoke the planner agent to create a comprehensive implementation plan before coding.

## Process

1. **Restate Requirements** - Clarify objectives in plain language
2. **Identify Risks** - Flag potential blockers and dependencies
3. **Create Step Plan** - Break into phases with specific actions
4. **Wait for Confirmation** - Do NOT proceed until user approves

## When to Use

- Starting new features
- Architectural changes
- Complex refactoring
- Multi-file changes
- Unclear requirements

## Workflow

The planner agent will:
1. Restate requirements clearly
2. Break implementation into phases with specific actions
3. Map component dependencies
4. Flag risks and potential blockers
5. Estimate complexity levels
6. Present the plan awaiting your confirmation

## Approval

You must respond with "yes", "proceed", or similar affirmative before implementation starts.

Alternative responses:
- Request modifications to specific phases
- Propose a different approach
- Ask clarifying questions

## Integration

After plan approval, use:
- `/tdd` - Test-driven implementation
- `/build-fix` - Resolve build errors
- `/code-review` - Review completed work

---

**Agent**: Uses `planner` agent from `.claude/agents/planner.md`
