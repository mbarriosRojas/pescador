// Validator for story files

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { StoryItem, ValidationResult, ValidationError } from './types.js';

export class StoryValidator {
  private ajv: Ajv;
  private schemaPath: string;

  constructor(rootDir?: string) {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    const workspaceRoot = rootDir || this.findWorkspaceRoot();
    this.schemaPath = join(workspaceRoot, 'tasks', 'schemas');
  }

  private findWorkspaceRoot(): string {
    let current = process.cwd();
    const root = '/';
    
    for (let i = 0; i < 5; i++) {
      const tasksPath = join(current, 'tasks');
      if (existsSync(tasksPath)) {
        return current;
      }
      
      if (current === root) break;
      current = join(current, '..');
    }
    
    return process.cwd();
  }

  /**
   * Validate a user story
   */
  async validateStory(story: StoryItem): Promise<ValidationResult> {
    const errors: ValidationError[] = [];

    // Basic validation
    if (!story.id) {
      errors.push({ field: 'id', message: 'ID is required' });
    } else {
      // Validate ID format
      const idPattern = /^(US|BUG|TASK)-[0-9]{3,}$/;
      if (!idPattern.test(story.id)) {
        errors.push({ 
          field: 'id', 
          message: 'ID must match format: US-XXX, BUG-XXX, or TASK-XXX' 
        });
      }
    }

    if (!story.title || story.title.length < 5) {
      errors.push({ 
        field: 'title', 
        message: 'Title is required and must be at least 5 characters' 
      });
    }

    if (!story.description || story.description.length < 10) {
      errors.push({ 
        field: 'description', 
        message: 'Description is required and must be at least 10 characters' 
      });
    }

    if (!['low', 'medium', 'high', 'critical'].includes(story.priority)) {
      errors.push({ 
        field: 'priority', 
        message: 'Priority must be: low, medium, high, or critical' 
      });
    }

    if (!['pending', 'in-progress', 'in-review', 'completed', 'cancelled'].includes(story.status)) {
      errors.push({ 
        field: 'status', 
        message: 'Status must be: pending, in-progress, in-review, completed, or cancelled' 
      });
    }

    // Type-specific validation
    if (story.type === 'user-story') {
      if (!story.acceptance_criteria || story.acceptance_criteria.length === 0) {
        errors.push({ 
          field: 'acceptance_criteria', 
          message: 'At least one acceptance criterion is required for user stories' 
        });
      }
    }

    // Validate tasks
    if (story.tasks && story.tasks.length > 0) {
      story.tasks.forEach((task, index) => {
        if (!task.id || !task.id.startsWith(story.id)) {
          errors.push({ 
            field: `tasks[${index}].id`, 
            message: `Task ID must start with ${story.id}` 
          });
        }
        if (!task.title || task.title.length < 5) {
          errors.push({ 
            field: `tasks[${index}].title`, 
            message: 'Task title must be at least 5 characters' 
          });
        }
      });
    }

    // Validate timestamps
    if (story.created_at) {
      if (!this.isValidISODate(story.created_at)) {
        errors.push({ 
          field: 'created_at', 
          message: 'created_at must be a valid ISO 8601 date' 
        });
      }
    }

    if (story.updated_at) {
      if (!this.isValidISODate(story.updated_at)) {
        errors.push({ 
          field: 'updated_at', 
          message: 'updated_at must be a valid ISO 8601 date' 
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if a string is a valid ISO 8601 date
   */
  private isValidISODate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString.includes('T');
  }

  /**
   * Validate multiple stories and check for duplicate IDs
   */
  async validateAll(stories: StoryItem[]): Promise<Map<string, ValidationResult>> {
    const results = new Map<string, ValidationResult>();
    const ids = new Set<string>();

    for (const story of stories) {
      const result = await this.validateStory(story);
      
      // Check for duplicate IDs
      if (ids.has(story.id)) {
        result.valid = false;
        result.errors.push({ 
          field: 'id', 
          message: `Duplicate ID: ${story.id} already exists` 
        });
      } else {
        ids.add(story.id);
      }

      results.set(story.id, result);
    }

    return results;
  }
}
