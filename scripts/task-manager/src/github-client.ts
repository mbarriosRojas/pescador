// GitHub API client for PR generation

import { Octokit } from '@octokit/rest';
import type { StoryItem, GitHubPROptions } from './types.js';

export class GitHubClient {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token || process.env.GITHUB_TOKEN
    });
    
    // Extract owner/repo from git remote or environment
    this.owner = process.env.GITHUB_OWNER || 'mbarriosRojas';
    this.repo = process.env.GITHUB_REPO || 'pescador';
  }

  /**
   * Create a branch for a story
   */
  async createBranch(storyId: string, title: string, baseBranch: string = 'main'): Promise<string> {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const branchName = `feature/${storyId}-${slug}`;

    try {
      // Get the base branch reference
      const { data: ref } = await this.octokit.git.getRef({
        owner: this.owner,
        repo: this.repo,
        ref: `heads/${baseBranch}`
      });

      // Create new branch
      await this.octokit.git.createRef({
        owner: this.owner,
        repo: this.repo,
        ref: `refs/heads/${branchName}`,
        sha: ref.object.sha
      });

      return branchName;
    } catch (error: any) {
      if (error.status === 422) {
        // Branch already exists
        return branchName;
      }
      throw new Error(`Failed to create branch: ${error.message}`);
    }
  }

  /**
   * Generate PR description from story
   */
  generatePRDescription(story: StoryItem): string {
    let description = `## Story: ${story.id}\n\n`;
    description += `${story.description}\n\n`;

    if (story.type === 'user-story') {
      description += `## Acceptance Criteria\n\n`;
      story.acceptance_criteria.forEach((criteria, index) => {
        description += `- [ ] ${criteria}\n`;
      });
      description += '\n';
    }

    if (story.tasks && story.tasks.length > 0) {
      description += `## Tasks\n\n`;
      story.tasks.forEach(task => {
        const checked = task.status === 'completed' ? 'x' : ' ';
        description += `- [${checked}] ${task.title}`;
        if (task.estimate) {
          description += ` (${task.estimate})`;
        }
        description += '\n';
      });
      description += '\n';
    }

    if (story.notes) {
      description += `## Notes\n\n${story.notes}\n\n`;
    }

    description += `---\n`;
    description += `📋 Story file: \`tasks/stories/${story.id}.yaml\`\n`;
    description += `🏷️ Priority: **${story.priority}**\n`;
    if (story.epic) {
      description += `📚 Epic: ${story.epic}\n`;
    }

    return description;
  }

  /**
   * Create a pull request for a story
   */
  async createPullRequest(options: GitHubPROptions): Promise<string> {
    try {
      const { data: pr } = await this.octokit.pulls.create({
        owner: this.owner,
        repo: this.repo,
        title: options.title,
        head: `feature/${options.storyId}`,
        base: options.base || 'main',
        body: options.description,
        draft: false
      });

      // Add labels if provided
      if (options.labels && options.labels.length > 0) {
        await this.octokit.issues.addLabels({
          owner: this.owner,
          repo: this.repo,
          issue_number: pr.number,
          labels: options.labels
        });
      }

      // Assign if provided
      if (options.assignee) {
        await this.octokit.issues.addAssignees({
          owner: this.owner,
          repo: this.repo,
          issue_number: pr.number,
          assignees: [options.assignee]
        });
      }

      return pr.html_url;
    } catch (error: any) {
      throw new Error(`Failed to create PR: ${error.message}`);
    }
  }

  /**
   * Update PR with story changes
   */
  async updatePullRequest(prNumber: number, story: StoryItem): Promise<void> {
    try {
      const description = this.generatePRDescription(story);
      
      await this.octokit.pulls.update({
        owner: this.owner,
        repo: this.repo,
        pull_number: prNumber,
        body: description
      });
    } catch (error: any) {
      throw new Error(`Failed to update PR: ${error.message}`);
    }
  }

  /**
   * Find PR by branch name
   */
  async findPRByBranch(branchName: string): Promise<number | null> {
    try {
      const { data: prs } = await this.octokit.pulls.list({
        owner: this.owner,
        repo: this.repo,
        head: `${this.owner}:${branchName}`,
        state: 'open'
      });

      return prs.length > 0 ? prs[0].number : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if labels exist, create if they don't
   */
  async ensureLabels(labels: string[]): Promise<void> {
    const labelColors: Record<string, string> = {
      'frontend': '0066cc',
      'backend': '00c896',
      'bug': 'ff6b6b',
      'enhancement': '00d4aa',
      'documentation': '5856d6',
      'high-priority': 'ff3860',
      'low-priority': 'b8c4ce',
      'user-story': '0066cc',
      'task': '6c757d',
      'api': '00c896',
      'ui': '0066cc',
      'database': 'ff9500'
    };

    for (const label of labels) {
      try {
        await this.octokit.issues.getLabel({
          owner: this.owner,
          repo: this.repo,
          name: label
        });
      } catch (error: any) {
        if (error.status === 404) {
          // Label doesn't exist, create it
          await this.octokit.issues.createLabel({
            owner: this.owner,
            repo: this.repo,
            name: label,
            color: labelColors[label] || '6c757d',
            description: `Auto-generated label for ${label}`
          });
        }
      }
    }
  }
}
