# Task Management System

This directory contains the task and user story management system for the Pescador project.

## Directory Structure

```
tasks/
├── stories/          # User stories, bugs, and tasks (YAML files)
├── epics/            # Epic definitions
├── templates/        # Templates for creating new items
├── schemas/          # JSON schemas for validation
├── archive/          # Completed and archived items
└── README.md         # This file
```

## Creating New Items

### User Story

1. Copy the template:
   ```bash
   cp tasks/templates/user-story.yaml tasks/stories/US-XXX-my-feature.yaml
   ```

2. Edit the file with your story details

3. Ensure you fill in all required fields:
   - `id`: Unique identifier (US-001, US-002, etc.)
   - `title`: Clear, concise title
   - `description`: User story format (As a... I want... So that...)
   - `priority`: low | medium | high | critical
   - `status`: pending | in-progress | in-review | completed | cancelled
   - `acceptance_criteria`: List of testable criteria

4. Commit and push:
   ```bash
   git add tasks/stories/US-XXX-my-feature.yaml
   git commit -m "Add user story: My Feature"
   git push
   ```

### Bug Report

```bash
cp tasks/templates/bug.yaml tasks/stories/BUG-XXX-issue-name.yaml
```

### Task

```bash
cp tasks/templates/task.yaml tasks/stories/TASK-XXX-task-name.yaml
```

### Epic

```bash
cp tasks/templates/epic.yaml tasks/epics/EPIC-XXX-epic-name.yaml
```

## Using the CLI Tool

Once the CLI is set up, you can use these commands:

```bash
# Create new user story interactively
npm run task create story

# List all stories
npm run task list

# List pending stories
npm run task list --status pending

# Update story status
npm run task update US-001 --status in-progress

# Generate PR for a story
npm run task pr US-001

# Validate all stories
npm run task validate

# Archive completed stories
npm run task archive --quarter 2026-Q1
```

## Automated Workflows

When you push a story to the repository:

1. **Validation Workflow** runs automatically to check YAML syntax and required fields
2. You can **manually trigger PR generation** via GitHub Actions
3. When a PR is merged, **status sync workflow** updates the story automatically
4. **Dashboard is regenerated** with the latest data

## Story Status Lifecycle

```
pending → in-progress → in-review → completed
                          ↓
                      cancelled
```

## Naming Conventions

- **User Stories**: `US-XXX-short-description.yaml` (e.g., `US-001-video-consultation.yaml`)
- **Bugs**: `BUG-XXX-short-description.yaml` (e.g., `BUG-001-login-error.yaml`)
- **Tasks**: `TASK-XXX-short-description.yaml` (e.g., `TASK-001-setup-ci.yaml`)
- **Epics**: `EPIC-XXX-short-description.yaml` (e.g., `EPIC-001-authentication.yaml`)

## Best Practices

1. **Be Specific**: Write clear, testable acceptance criteria
2. **Keep it Small**: Break large stories into smaller, manageable tasks
3. **Link Related Items**: Reference epics, related bugs, and dependencies
4. **Update Regularly**: Keep status current as work progresses
5. **Use Labels**: Tag stories for easy filtering and organization
6. **Estimate Realistically**: Provide honest effort estimates

## Validation Rules

Stories must pass these validations:

- ✅ Valid YAML syntax
- ✅ All required fields present
- ✅ ID follows naming convention
- ✅ Status is a valid value
- ✅ Priority is a valid value
- ✅ At least one acceptance criterion
- ✅ Timestamps in ISO 8601 format
- ✅ Epic ID exists (if specified)
- ✅ No duplicate IDs

## Example Story

See `tasks/stories/US-001-example-feature.yaml` for a complete example.

## Questions?

For CLI usage: Run `npm run task --help`  
For workflow issues: Check `.github/workflows/`  
For schema details: See `tasks/schemas/`
