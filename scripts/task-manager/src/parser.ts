// YAML parser for story files

import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename } from 'path';
import yaml from 'js-yaml';
import type { StoryItem, Epic } from './types.js';

export class StoryParser {
  private storiesDir: string;
  private epicsDir: string;

  constructor(rootDir?: string) {
    // Find workspace root (where tasks/ directory exists)
    const workspaceRoot = rootDir || this.findWorkspaceRoot();
    this.storiesDir = join(workspaceRoot, 'tasks', 'stories');
    this.epicsDir = join(workspaceRoot, 'tasks', 'epics');
  }

  private findWorkspaceRoot(): string {
    let current = process.cwd();
    const root = '/';
    
    // Search up to 5 levels
    for (let i = 0; i < 5; i++) {
      const tasksPath = join(current, 'tasks');
      if (existsSync(tasksPath)) {
        return current;
      }
      
      if (current === root) break;
      current = join(current, '..');
    }
    
    // Default to current directory if not found
    return process.cwd();
  }

  /**
   * Parse a single story file
   */
  async parseStory(filePath: string): Promise<StoryItem> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const story = yaml.load(content) as StoryItem;
      return story;
    } catch (error) {
      throw new Error(`Failed to parse story file ${filePath}: ${error}`);
    }
  }

  /**
   * Parse a single epic file
   */
  async parseEpic(filePath: string): Promise<Epic> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const epic = yaml.load(content) as Epic;
      return epic;
    } catch (error) {
      throw new Error(`Failed to parse epic file ${filePath}: ${error}`);
    }
  }

  /**
   * Get all story files
   */
  async getAllStories(): Promise<StoryItem[]> {
    try {
      const files = await readdir(this.storiesDir);
      const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      
      const stories = await Promise.all(
        yamlFiles.map(file => this.parseStory(join(this.storiesDir, file)))
      );
      
      return stories;
    } catch (error) {
      throw new Error(`Failed to read stories directory: ${error}`);
    }
  }

  /**
   * Get all epic files
   */
  async getAllEpics(): Promise<Epic[]> {
    try {
      const files = await readdir(this.epicsDir);
      const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      
      const epics = await Promise.all(
        yamlFiles.map(file => this.parseEpic(join(this.epicsDir, file)))
      );
      
      return epics;
    } catch (error) {
      throw new Error(`Failed to read epics directory: ${error}`);
    }
  }

  /**
   * Find story by ID
   */
  async findStory(id: string): Promise<{ story: StoryItem; filePath: string } | null> {
    try {
      const files = await readdir(this.storiesDir);
      const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      
      for (const file of yamlFiles) {
        const filePath = join(this.storiesDir, file);
        const story = await this.parseStory(filePath);
        if (story.id === id) {
          return { story, filePath };
        }
      }
      
      return null;
    } catch (error) {
      throw new Error(`Failed to find story ${id}: ${error}`);
    }
  }

  /**
   * Find epic by ID
   */
  async findEpic(id: string): Promise<{ epic: Epic; filePath: string } | null> {
    try {
      const files = await readdir(this.epicsDir);
      const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      
      for (const file of yamlFiles) {
        const filePath = join(this.epicsDir, file);
        const epic = await this.parseEpic(filePath);
        if (epic.id === id) {
          return { epic, filePath };
        }
      }
      
      return null;
    } catch (error) {
      throw new Error(`Failed to find epic ${id}: ${error}`);
    }
  }

  /**
   * Get story file path from ID
   */
  getStoryFilePath(id: string, title: string): string {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return join(this.storiesDir, `${id}-${slug}.yaml`);
  }

  /**
   * Get epic file path from ID
   */
  getEpicFilePath(id: string, title: string): string {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return join(this.epicsDir, `${id}-${slug}.yaml`);
  }
}
