# Pescador - Task Management System

**Pescador** is a lightweight, file-based task and user story management system integrated with GitHub Actions for automated PR generation and workflow management.

## 🎯 Overview

This repository contains:
- **Task Management System**: YAML-based user stories, bugs, and tasks with automated PR generation
- **Médico Online Landing Page**: Static Astro-based landing page for a telemedicine platform with **minimalist design**
- **Automated Workflows**: GitHub Actions for validation, PR creation, and status synchronization
- **Interactive Dashboard**: Static HTML dashboard for visualizing project progress

### ✨ Recent Update: Minimalist Redesign (2026-03-07)

The Médico Online landing page has been completely transformed with a professional minimalist design:
- **70% visual complexity reduction** - Cleaner, more focused user experience
- **2-color palette** - Deep blue (#2c3e50) + mint green (#16a085) + grayscale
- **No gradients or heavy shadows** - Flat, modern aesthetic
- **Doubled spacing** - More whitespace for better readability
- **WCAG AAA compliant** - Exceptional accessibility (19.6:1 contrast ratio)
- **Optimized performance** - 58KB total page weight, 665ms build time

## 📁 Project Structure

```
pescador/
├── .github/
│   └── workflows/              # GitHub Actions workflows
│       ├── validate-stories.yml    # Validate story files
│       ├── process-tasks.yml       # Generate PRs from stories
│       ├── sync-status.yml         # Sync story status with PRs
│       └── generate-dashboard.yml  # Generate task dashboard
├── tasks/
│   ├── stories/                # User stories, bugs, and tasks (YAML)
│   ├── epics/                  # Epic definitions
│   ├── templates/              # Templates for new items
│   ├── schemas/                # JSON schemas for validation
│   └── archive/                # Completed items
├── scripts/
│   ├── task-manager/           # TypeScript CLI tool
│   │   ├── src/
│   │   │   ├── cli.ts          # Command-line interface
│   │   │   ├── parser.ts       # YAML parser
│   │   │   ├── validator.ts    # Story validator
│   │   │   ├── generator.ts    # Story generator
│   │   │   ├── github-client.ts # GitHub API client
│   │   │   └── types.ts        # TypeScript types
│   │   └── package.json
│   └── utils/
│       └── generate-dashboard.js # Dashboard generator
├── src/                        # Astro landing page source
│   ├── components/
│   ├── pages/
│   └── styles/
├── docs/                       # Build output (GitHub Pages)
│   ├── tasks/                  # Task dashboard
│   │   └── index.html
│   └── index.html              # Landing page
└── package.json

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or pnpm
- GitHub account (for PR generation features)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mbarriosRojas/pescador.git
cd pescador
```

2. **Install dependencies**

```bash
# Install root dependencies (Astro)
npm install

# Install task manager CLI dependencies
cd scripts/task-manager
npm install
cd ../..

# Install dashboard generator dependencies
cd scripts/utils
npm install
cd ../..
```

## 📋 Task Management System

### Creating User Stories

#### Using the CLI (Recommended)

```bash
# Interactive creation
npm run task:create

# Create a user story
npm run task create story

# Create a bug report
npm run task create bug

# Create a task
npm run task create task
```

#### Manual Creation

1. Copy a template from `tasks/templates/`
2. Fill in the required fields
3. Save to `tasks/stories/` with naming format: `US-XXX-description.yaml`

Example:

```bash
cp tasks/templates/user-story.yaml tasks/stories/US-002-user-authentication.yaml
# Edit the file with your details
```

### Managing Stories

```bash
# List all stories
npm run task:list

# List by status
npm run task list -- --status pending

# List by priority
npm run task list -- --priority high

# Update story status
npm run task update US-001 -- --status in-progress

# Update assignee
npm run task update US-001 -- --assignee username

# Validate stories
npm run task:validate

# Validate specific story
npm run task validate US-001
```

### Generating Pull Requests

```bash
# Generate PR for a story (requires GITHUB_TOKEN)
npm run task pr US-001

# Specify base branch
npm run task pr US-001 -- --base develop
```

Or use GitHub Actions:

1. Go to **Actions** tab in GitHub
2. Select **Process Tasks and Generate PRs** workflow
3. Click **Run workflow**
4. Enter the story ID (e.g., US-001)
5. The workflow will create a branch and PR automatically

## 🔄 Automated Workflows

### 1. Story Validation (`validate-stories.yml`)

**Triggers:**
- On PR to `tasks/` directory
- On push to main affecting `tasks/`

**Actions:**
- Validates YAML syntax
- Checks required fields
- Verifies ID uniqueness
- Comments on PR with results

### 2. PR Generation (`process-tasks.yml`)

**Triggers:**
- Manual workflow dispatch with story ID

**Actions:**
- Creates feature branch
- Generates PR with story details
- Adds labels and assignee
- Updates story status

### 3. Status Sync (`sync-status.yml`)

**Triggers:**
- On PR merge
- On PR close
- On PR reopen

**Actions:**
- Extracts story ID from PR title
- Updates story status accordingly:
  - Merged → `completed`
  - Closed without merge → `cancelled`
  - Reopened → `in-progress`

### 4. Dashboard Generation (`generate-dashboard.yml`)

**Triggers:**
- On story file changes
- Hourly schedule
- Manual workflow dispatch

**Actions:**
- Parses all story files
- Generates static HTML dashboard
- Deploys to GitHub Pages

## 📊 Task Dashboard

View the interactive task dashboard at:

**https://mbarriosrojas.github.io/pescador/tasks/**

The dashboard provides:
- Kanban board view (Backlog, In Progress, In Review, Completed)
- Filtering by type, priority, and status
- Search functionality
- Real-time statistics
- Completion rate metrics

To regenerate the dashboard locally:

```bash
node scripts/utils/generate-dashboard.js
```

## 🌐 Médico Online Landing Page

The repository contains a professional landing page for "Médico Online", a telemedicine platform, featuring a **minimalist design system**.

### 🎨 Minimalist Design System

The landing page uses a comprehensive minimalist design system that emphasizes:

**Design Principles:**
- **Simplicity First** - Removed all gradients, reduced shadows by 70%
- **Whitespace** - Section spacing doubled to 8rem for better visual breathing room
- **Typography** - Clean sans-serif fonts with improved line-height (1.8)
- **Limited Palette** - Only 2 accent colors + 7 grayscale tones
- **Accessibility** - WCAG AAA compliant with 19.6:1 contrast ratio

**Technical Implementation:**
- Design system: `/src/styles/minimalist-design-system.css`
- 80+ CSS variables for easy theming
- Mobile-first responsive design
- No JavaScript frameworks - Pure Astro components

**Visual Transformations:**
- Colors: 8+ → 2 + grayscale (-75%)
- Gradients: 9 → 0 (-100%)
- Transform effects: 19 → 0 (-100%)
- Border radius: 8-20px → 2-4px (-67%)

### Development

```bash
# Start development server
npm run dev
# Open http://localhost:4321
```

### Build

```bash
# Generate static site
npm run build
# Output: docs/
```

### Preview

```bash
# Preview production build
npm run preview
```

### Documentation

For detailed information about the minimalist redesign, see:
- `DESIGN_COMPARISON.md` - Before/after analysis
- `MINIMALIST_DESIGN_SUMMARY.md` - Design system overview
- `QUICK_REFERENCE.md` - Developer quick reference
- `INTEGRATION_REPORT.md` - Integration verification
- `VERIFICATION_REPORT.md` - QA testing results

## 📝 Story File Format

### User Story

```yaml
id: US-001
type: user-story
title: "Feature title"
description: |
  As a [role]
  I want [feature]
  So that [benefit]
priority: high  # low | medium | high | critical
status: pending  # pending | in-progress | in-review | completed | cancelled
assignee: null  # GitHub username or null
epic: EPIC-001  # Epic ID or null
labels: [frontend, api]
acceptance_criteria:
  - Criterion 1
  - Criterion 2
tasks:
  - id: US-001-T1
    title: "Task title"
    status: pending
    estimate: "3h"
created_at: "2026-03-06T10:00:00Z"
updated_at: "2026-03-06T10:00:00Z"
```

### Bug Report

```yaml
id: BUG-001
type: bug
title: "Bug title"
description: |
  Steps to reproduce, expected vs actual behavior
severity: high
priority: high
status: pending
assignee: null
labels: [bug]
related:
  user_story: US-001
  duplicate_of: null
  blocks: []
```

### Epic

```yaml
id: EPIC-001
title: "Epic title"
description: "High-level description"
status: in-progress
goal: "Business goal"
value: "Business value"
start_date: "2026-03-01"
target_date: "2026-05-31"
owner: "team-platform"
stories: [US-001, US-002]
```

## 🔐 GitHub Configuration

### Required Secrets

For PR generation to work, ensure these are configured:

- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
- (Optional) `PAT_TOKEN`: Personal Access Token if you need more permissions

### Permissions

The GitHub Actions workflows require:

- **Contents**: write (to create branches and commit)
- **Pull requests**: write (to create PRs)
- **Issues**: write (to add labels and comments)

Configure in: **Settings > Actions > General > Workflow permissions**

## 🧪 Testing

### Validate All Stories

```bash
npm run task:validate
```

### Test Dashboard Generation

```bash
node scripts/utils/generate-dashboard.js
open docs/tasks/index.html
```

### Test Landing Page Build

```bash
npm run build
npm run preview
```

## 📚 Documentation

- **Task System**: See `tasks/README.md`
- **Templates**: Available in `tasks/templates/`
- **Schemas**: JSON schemas in `tasks/schemas/`
- **CLI Help**: Run `npm run task -- --help`

## 🛠️ Technology Stack

### Task Management
- **YAML**: Story definitions
- **TypeScript**: CLI tool and validation
- **GitHub Actions**: Automation
- **Octokit**: GitHub API integration
- **Ajv**: JSON schema validation

### Landing Page (Minimalist Design)
- **Astro 5.18.0**: Static site generator
- **Minimalist CSS**: Custom design system with 80+ variables
- **HTML5 Semantic**: Accessible markup structure
- **No JavaScript dependencies**: Pure Astro components
- **Performance**: 58KB total page weight, <1s build time

### Dashboard
- **Vanilla JS**: No framework overhead
- **CSS Grid/Flexbox**: Responsive layout
- **Chart.js**: (Future) Metrics visualization

## 📦 NPM Scripts

### Root Package

```bash
npm run dev              # Start Astro dev server
npm run build            # Build landing page
npm run preview          # Preview build
npm run task             # Run task CLI (with args)
npm run task:validate    # Validate all stories
npm run task:create      # Create new story
npm run task:list        # List stories
npm run task:update      # Update story
npm run task:pr          # Generate PR
```

### Task Manager

```bash
cd scripts/task-manager
npm run dev              # Run CLI in dev mode
npm run build            # Build TypeScript
npm run validate         # Validate stories
npm run create           # Create story
npm run list             # List stories
npm run update           # Update story
npm run pr               # Generate PR
```

## 🤝 Contributing

1. Create a user story for your feature
2. Use the task system to generate a PR
3. Implement your changes
4. Ensure validation passes
5. Submit PR for review

## 📄 License

This project is part of an experimental repository.

## 🔗 Links

- **Repository**: https://github.com/mbarriosRojas/pescador
- **Landing Page**: https://mbarriosrojas.github.io/pescador/
- **Task Dashboard**: https://mbarriosrojas.github.io/pescador/tasks/

## 💡 Tips

1. **Always validate** before committing: `npm run task:validate`
2. **Use templates** for consistency
3. **Write clear acceptance criteria** - they become PR checklists
4. **Link related items** using epic IDs
5. **Keep story IDs unique** - the system checks this
6. **Update status manually** or let workflows do it automatically

## 🐛 Troubleshooting

### CLI not working

```bash
cd scripts/task-manager
npm install
```

### Dashboard not updating

```bash
node scripts/utils/generate-dashboard.js
```

### GitHub Actions failing

Check:
- Workflow permissions in repository settings
- YAML file syntax in stories
- Required fields are present

---

Built with ❤️ using Astro, TypeScript, and GitHub Actions
