// Story and PR generator

import { writeFile } from 'fs/promises';
import yaml from 'js-yaml';
import type { UserStory, Bug, TaskItem, Epic, StoryItem } from './types.js';

export class StoryGenerator {
  /**
   * Generate a new user story with defaults
   */
  generateUserStory(
    id: string,
    title: string,
    description: string,
    options: Partial<UserStory> = {}
  ): UserStory {
    const now = new Date().toISOString();
    
    return {
      id,
      type: 'user-story',
      title,
      description,
      priority: options.priority || 'medium',
      status: options.status || 'pending',
      assignee: options.assignee || null,
      epic: options.epic || null,
      labels: options.labels || [],
      acceptance_criteria: options.acceptance_criteria || [],
      tasks: options.tasks || [],
      notes: options.notes || '',
      created_at: now,
      updated_at: now
    };
  }

  /**
   * Generate a new bug with defaults
   */
  generateBug(
    id: string,
    title: string,
    description: string,
    options: Partial<Bug> = {}
  ): Bug {
    const now = new Date().toISOString();
    
    return {
      id,
      type: 'bug',
      title,
      description,
      severity: options.severity || 'medium',
      priority: options.priority || 'medium',
      status: options.status || 'pending',
      assignee: options.assignee || null,
      labels: options.labels || ['bug'],
      related: options.related || {
        user_story: null,
        duplicate_of: null,
        blocks: []
      },
      tasks: options.tasks || [],
      notes: options.notes || '',
      created_at: now,
      updated_at: now
    };
  }

  /**
   * Generate a new task with defaults
   */
  generateTask(
    id: string,
    title: string,
    description: string,
    options: Partial<TaskItem> = {}
  ): TaskItem {
    const now = new Date().toISOString();
    
    return {
      id,
      type: 'task',
      title,
      description,
      priority: options.priority || 'medium',
      status: options.status || 'pending',
      assignee: options.assignee || null,
      epic: options.epic || null,
      labels: options.labels || [],
      checklist: options.checklist || [],
      estimate: options.estimate,
      dependencies: options.dependencies || [],
      notes: options.notes || '',
      created_at: now,
      updated_at: now
    };
  }

  /**
   * Generate a new epic with defaults
   */
  generateEpic(
    id: string,
    title: string,
    description: string,
    options: Partial<Epic> = {}
  ): Epic {
    const now = new Date().toISOString();
    
    return {
      id,
      title,
      description,
      status: options.status || 'pending',
      goal: options.goal || '',
      value: options.value || '',
      start_date: options.start_date || '',
      target_date: options.target_date || '',
      completed_date: null,
      owner: options.owner || '',
      stakeholders: options.stakeholders || [],
      stories: options.stories || [],
      metrics: options.metrics || [],
      total_stories: 0,
      completed_stories: 0,
      in_progress_stories: 0,
      notes: options.notes || '',
      created_at: now,
      updated_at: now
    };
  }

  /**
   * Save story to YAML file
   */
  async saveStory(filePath: string, story: StoryItem): Promise<void> {
    const yamlContent = yaml.dump(story, {
      indent: 2,
      lineWidth: 100,
      noRefs: true
    });
    
    await writeFile(filePath, yamlContent, 'utf-8');
  }

  /**
   * Save epic to YAML file
   */
  async saveEpic(filePath: string, epic: Epic): Promise<void> {
    const yamlContent = yaml.dump(epic, {
      indent: 2,
      lineWidth: 100,
      noRefs: true
    });
    
    await writeFile(filePath, yamlContent, 'utf-8');
  }

  /**
   * Get next available ID for a type
   */
  getNextId(existingIds: string[], prefix: 'US' | 'BUG' | 'TASK' | 'EPIC'): string {
    const numbers = existingIds
      .filter(id => id.startsWith(prefix))
      .map(id => {
        const match = id.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      });
    
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
    const nextNumber = maxNumber + 1;
    
    return `${prefix}-${nextNumber.toString().padStart(3, '0')}`;
  }
}
