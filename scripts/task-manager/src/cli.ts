#!/usr/bin/env node

// CLI interface for task management

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { StoryParser } from './parser.js';
import { StoryValidator } from './validator.js';
import { StoryGenerator } from './generator.js';
import { GitHubClient } from './github-client.js';
import type { Priority, Status, UserStory, Bug, TaskItem } from './types.js';

const program = new Command();

program
  .name('task')
  .description('CLI tool for managing tasks and user stories')
  .version('1.0.0');

// CREATE command
program
  .command('create')
  .description('Create a new story, bug, or task')
  .argument('[type]', 'Type: story, bug, or task')
  .action(async (type) => {
    const parser = new StoryParser();
    const generator = new StoryGenerator();

    if (!type) {
      const { itemType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'itemType',
          message: 'What would you like to create?',
          choices: ['User Story', 'Bug Report', 'Task', 'Epic']
        }
      ]);
      type = itemType.toLowerCase().replace(' ', '-');
    }

    try {
      if (type.includes('story') || type === 'story') {
        await createUserStory(parser, generator);
      } else if (type === 'bug') {
        await createBug(parser, generator);
      } else if (type === 'task') {
        await createTask(parser, generator);
      } else if (type === 'epic') {
        await createEpic(parser, generator);
      } else {
        console.log(chalk.red(`Unknown type: ${type}`));
        console.log('Valid types: story, bug, task, epic');
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// LIST command
program
  .command('list')
  .description('List all stories')
  .option('-s, --status <status>', 'Filter by status')
  .option('-p, --priority <priority>', 'Filter by priority')
  .option('-t, --type <type>', 'Filter by type')
  .option('-e, --epic <epic>', 'Filter by epic')
  .action(async (options) => {
    const parser = new StoryParser();
    
    try {
      let stories = await parser.getAllStories();

      // Apply filters
      if (options.status) {
        stories = stories.filter(s => s.status === options.status);
      }
      if (options.priority) {
        stories = stories.filter(s => s.priority === options.priority);
      }
      if (options.type) {
        stories = stories.filter(s => s.type === options.type);
      }
      if (options.epic) {
        stories = stories.filter(s => s.epic === options.epic);
      }

      console.log(chalk.bold(`\nFound ${stories.length} stories:\n`));

      stories.forEach(story => {
        const statusColor = getStatusColor(story.status);
        const priorityColor = getPriorityColor(story.priority);
        
        console.log(
          chalk.bold(story.id) + 
          ' ' + 
          chalk[statusColor](story.status.toUpperCase()) +
          ' ' +
          chalk[priorityColor](`[${story.priority}]`) +
          ' ' +
          story.title
        );
        
        if (story.assignee) {
          console.log(chalk.gray(`  Assigned to: ${story.assignee}`));
        }
        console.log('');
      });
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// VALIDATE command
program
  .command('validate')
  .description('Validate all stories')
  .argument('[id]', 'Story ID to validate (optional)')
  .action(async (id) => {
    const parser = new StoryParser();
    const validator = new StoryValidator();

    try {
      if (id) {
        // Validate single story
        const result = await parser.findStory(id);
        if (!result) {
          console.log(chalk.red(`Story ${id} not found`));
          process.exit(1);
        }

        const validation = await validator.validateStory(result.story);
        
        if (validation.valid) {
          console.log(chalk.green(`✓ Story ${id} is valid`));
        } else {
          console.log(chalk.red(`✗ Story ${id} has errors:`));
          validation.errors.forEach(err => {
            console.log(chalk.red(`  - ${err.field}: ${err.message}`));
          });
          process.exit(1);
        }
      } else {
        // Validate all stories
        const stories = await parser.getAllStories();
        const results = await validator.validateAll(stories);

        let hasErrors = false;
        results.forEach((validation, storyId) => {
          if (validation.valid) {
            console.log(chalk.green(`✓ ${storyId}`));
          } else {
            hasErrors = true;
            console.log(chalk.red(`✗ ${storyId}`));
            validation.errors.forEach(err => {
              console.log(chalk.red(`  - ${err.field}: ${err.message}`));
            });
          }
        });

        if (hasErrors) {
          process.exit(1);
        } else {
          console.log(chalk.green(`\n✓ All ${stories.length} stories are valid`));
        }
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// UPDATE command
program
  .command('update')
  .description('Update a story')
  .argument('<id>', 'Story ID')
  .option('-s, --status <status>', 'Update status')
  .option('-a, --assignee <assignee>', 'Update assignee')
  .option('-p, --priority <priority>', 'Update priority')
  .action(async (id, options) => {
    const parser = new StoryParser();
    const generator = new StoryGenerator();

    try {
      const result = await parser.findStory(id);
      if (!result) {
        console.log(chalk.red(`Story ${id} not found`));
        process.exit(1);
      }

      let updated = false;
      const { story, filePath } = result;

      if (options.status) {
        story.status = options.status as Status;
        updated = true;
      }
      if (options.assignee) {
        story.assignee = options.assignee;
        updated = true;
      }
      if (options.priority) {
        story.priority = options.priority as Priority;
        updated = true;
      }

      if (updated) {
        story.updated_at = new Date().toISOString();
        await generator.saveStory(filePath, story);
        console.log(chalk.green(`✓ Updated ${id}`));
      } else {
        console.log(chalk.yellow('No changes specified'));
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// PR command
program
  .command('pr')
  .description('Generate a pull request for a story')
  .argument('<id>', 'Story ID')
  .option('-b, --base <branch>', 'Base branch (default: main)')
  .action(async (id, options) => {
    const parser = new StoryParser();
    const github = new GitHubClient();

    try {
      const result = await parser.findStory(id);
      if (!result) {
        console.log(chalk.red(`Story ${id} not found`));
        process.exit(1);
      }

      const { story } = result;

      console.log(chalk.blue(`Creating PR for ${id}...`));

      // Create branch
      const branchName = await github.createBranch(story.id, story.title, options.base);
      console.log(chalk.green(`✓ Created branch: ${branchName}`));

      // Ensure labels exist
      await github.ensureLabels(story.labels);

      // Generate PR description
      const description = github.generatePRDescription(story);

      // Create PR
      const prUrl = await github.createPullRequest({
        storyId: story.id,
        title: `[${story.id}] ${story.title}`,
        description,
        labels: story.labels,
        assignee: story.assignee,
        base: options.base
      });

      console.log(chalk.green(`✓ Created PR: ${prUrl}`));

      // Update story status
      if (story.status === 'pending') {
        story.status = 'in-progress';
        story.updated_at = new Date().toISOString();
        const generator = new StoryGenerator();
        await generator.saveStory(result.filePath, story);
        console.log(chalk.green(`✓ Updated story status to in-progress`));
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();

// Helper functions

async function createUserStory(parser: StoryParser, generator: StoryGenerator) {
  const stories = await parser.getAllStories();
  const existingIds = stories.map(s => s.id);
  const nextId = generator.getNextId(existingIds, 'US');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Story title:',
      validate: (input) => input.length >= 5 || 'Title must be at least 5 characters'
    },
    {
      type: 'input',
      name: 'role',
      message: 'As a (role):',
      default: 'user'
    },
    {
      type: 'input',
      name: 'want',
      message: 'I want (feature):',
      validate: (input) => input.length > 0 || 'Required'
    },
    {
      type: 'input',
      name: 'benefit',
      message: 'So that (benefit):',
      validate: (input) => input.length > 0 || 'Required'
    },
    {
      type: 'list',
      name: 'priority',
      message: 'Priority:',
      choices: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    {
      type: 'input',
      name: 'assignee',
      message: 'Assignee (GitHub username, or leave empty):',
    },
    {
      type: 'input',
      name: 'labels',
      message: 'Labels (comma-separated):',
    }
  ]);

  const description = `As a ${answers.role}\nI want ${answers.want}\nSo that ${answers.benefit}`;
  
  const story = generator.generateUserStory(
    nextId,
    answers.title,
    description,
    {
      priority: answers.priority as Priority,
      assignee: answers.assignee || null,
      labels: answers.labels ? answers.labels.split(',').map((l: string) => l.trim()) : []
    }
  );

  const filePath = parser.getStoryFilePath(story.id, story.title);
  await generator.saveStory(filePath, story);

  console.log(chalk.green(`\n✓ Created user story: ${story.id}`));
  console.log(chalk.gray(`  File: ${filePath}`));
}

async function createBug(parser: StoryParser, generator: StoryGenerator) {
  const stories = await parser.getAllStories();
  const existingIds = stories.map(s => s.id);
  const nextId = generator.getNextId(existingIds, 'BUG');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Bug title:',
      validate: (input) => input.length >= 5 || 'Title must be at least 5 characters'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      validate: (input) => input.length >= 10 || 'Description must be at least 10 characters'
    },
    {
      type: 'list',
      name: 'severity',
      message: 'Severity:',
      choices: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    {
      type: 'input',
      name: 'assignee',
      message: 'Assignee (GitHub username, or leave empty):',
    }
  ]);

  const bug = generator.generateBug(
    nextId,
    answers.title,
    answers.description,
    {
      severity: answers.severity as Priority,
      priority: answers.severity as Priority,
      assignee: answers.assignee || null
    }
  );

  const filePath = parser.getStoryFilePath(bug.id, bug.title);
  await generator.saveStory(filePath, bug);

  console.log(chalk.green(`\n✓ Created bug: ${bug.id}`));
  console.log(chalk.gray(`  File: ${filePath}`));
}

async function createTask(parser: StoryParser, generator: StoryGenerator) {
  const stories = await parser.getAllStories();
  const existingIds = stories.map(s => s.id);
  const nextId = generator.getNextId(existingIds, 'TASK');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Task title:',
      validate: (input) => input.length >= 5 || 'Title must be at least 5 characters'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      validate: (input) => input.length >= 10 || 'Description must be at least 10 characters'
    },
    {
      type: 'list',
      name: 'priority',
      message: 'Priority:',
      choices: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    {
      type: 'input',
      name: 'estimate',
      message: 'Estimate (e.g., 3h, 2d):',
    },
    {
      type: 'input',
      name: 'assignee',
      message: 'Assignee (GitHub username, or leave empty):',
    }
  ]);

  const task = generator.generateTask(
    nextId,
    answers.title,
    answers.description,
    {
      priority: answers.priority as Priority,
      estimate: answers.estimate || undefined,
      assignee: answers.assignee || null
    }
  );

  const filePath = parser.getStoryFilePath(task.id, task.title);
  await generator.saveStory(filePath, task);

  console.log(chalk.green(`\n✓ Created task: ${task.id}`));
  console.log(chalk.gray(`  File: ${filePath}`));
}

async function createEpic(parser: StoryParser, generator: StoryGenerator) {
  const epics = await parser.getAllEpics();
  const existingIds = epics.map(e => e.id);
  const nextId = generator.getNextId(existingIds, 'EPIC');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Epic title:',
      validate: (input) => input.length >= 5 || 'Title must be at least 5 characters'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      validate: (input) => input.length >= 10 || 'Description must be at least 10 characters'
    },
    {
      type: 'input',
      name: 'goal',
      message: 'Business goal:',
    },
    {
      type: 'input',
      name: 'owner',
      message: 'Owner (team or person):',
    }
  ]);

  const epic = generator.generateEpic(
    nextId,
    answers.title,
    answers.description,
    {
      goal: answers.goal,
      owner: answers.owner
    }
  );

  const filePath = parser.getEpicFilePath(epic.id, epic.title);
  await generator.saveEpic(filePath, epic);

  console.log(chalk.green(`\n✓ Created epic: ${epic.id}`));
  console.log(chalk.gray(`  File: ${filePath}`));
}

function getStatusColor(status: Status): 'gray' | 'yellow' | 'blue' | 'green' | 'red' {
  switch (status) {
    case 'pending': return 'gray';
    case 'in-progress': return 'yellow';
    case 'in-review': return 'blue';
    case 'completed': return 'green';
    case 'cancelled': return 'red';
    default: return 'gray';
  }
}

function getPriorityColor(priority: Priority): 'gray' | 'yellow' | 'red' {
  switch (priority) {
    case 'low': return 'gray';
    case 'medium': return 'yellow';
    case 'high': return 'red';
    case 'critical': return 'red';
    default: return 'gray';
  }
}
