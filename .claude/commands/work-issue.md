# Work on GitHub Issue

Work on GitHub issue #$ARGUMENTS

## Process
1. Fetch issue details: `gh issue view $ARGUMENTS`
2. Read and understand the requirements and acceptance criteria
3. Plan the implementation approach
4. Implement the feature/fix
5. Test thoroughly
6. Commit with message referencing the issue: `"Description (closes #$ARGUMENTS)"`
7. Push changes

## Rules
- Don't close the issue until all acceptance criteria are met
- If blocked, add a comment to the issue: `gh issue comment $ARGUMENTS -b "Blocked: [reason]"`
- For complex work, update issue with progress comments
