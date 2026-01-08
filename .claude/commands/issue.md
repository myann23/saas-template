# Work on GitHub Issue

Analyze and fix GitHub issue: $ARGUMENTS

Follow these steps:

## PLAN

1. Use `gh issue view $ARGUMENTS` to get the issue details
2. Understand the problem described in the issue
3. Ask clarifying questions if necessary
4. Understand the prior art for this issue:
   - Search `docs/scratchpads/` for previous thoughts related to this issue
   - Search PRs via `gh pr list --search` to find history on this issue
   - Search the codebase for relevant files
5. Think harder about how to break the issue down into a series of small, manageable tasks
6. Document your plan in a new scratchpad:
   - Save to `docs/scratchpads/issue-$ARGUMENTS-{slug}.md`
   - Include a link to the issue

## CREATE

- Solve the issue in small, manageable steps, according to your plan
- Commit your changes after each step

## TEST

- Use Claude Chrome browser extension to test UI changes visually
- Run the project's test suite to ensure you haven't broken anything
- If the tests are failing, fix them
- Ensure that all tests are passing before moving on to the next step

## DEPLOY

- Commit final changes with message: "Description (closes #$ARGUMENTS)"
- Push to main

---

Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.

If things go off track after 2-3 corrections, start fresh with `/clear` rather than continuing to correct.
