# /checkpoint - Workflow State Management

Create and verify named snapshots of your work progress.

## Usage

```
/checkpoint [action] [name]
```

## Actions

| Action | Description |
|--------|-------------|
| `create <name>` | Create named checkpoint |
| `verify <name>` | Compare current state against checkpoint |
| `list` | Show all checkpoints |
| `clear` | Remove old checkpoints (keeps last 5) |

## Create Checkpoint

1. Run `/verify quick` to ensure clean state
2. Create git stash or commit with checkpoint name
3. Log to `.claude/checkpoints.log`:
   ```
   2024-01-25-14:30 | feature-start | a1b2c3d
   ```
4. Report checkpoint created

## Verify Checkpoint

Compare current state to a saved checkpoint:

```
CHECKPOINT COMPARISON: feature-start
====================================
Files changed: 8
Tests: +12 passed / -0 failed
Coverage: +5% (82% → 87%)
Build: PASS
```

## List Checkpoints

Shows all checkpoints with:
- Name
- Timestamp
- Git SHA
- Status (current, behind, ahead)

## Typical Workflow

```
[Start Feature]
    │
    ├── /checkpoint create "feature-start"
    │
[Implement Core]
    │
    ├── /checkpoint create "core-done"
    │
[Add Tests]
    │
    ├── /checkpoint verify "core-done"
    │
[Refactor]
    │
    ├── /checkpoint create "refactor-done"
    │
[Open PR]
    │
    └── /checkpoint verify "feature-start"
```

## Use Cases

- **Long features** - Track progress across sessions
- **Risky refactors** - Easy rollback point
- **Before experiments** - Save known-good state
- **PR preparation** - Compare total changes

---

$ARGUMENTS: action (create|verify|list|clear), name (string)
