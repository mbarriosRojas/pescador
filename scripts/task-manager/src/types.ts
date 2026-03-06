// Type definitions for the task management system

export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'pending' | 'in-progress' | 'in-review' | 'completed' | 'cancelled';
export type ItemType = 'user-story' | 'bug' | 'task';

export interface Task {
  id: string;
  title: string;
  status: Status;
  estimate?: string;
}

export interface UserStory {
  id: string;
  type: 'user-story';
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string | null;
  epic: string | null;
  labels: string[];
  acceptance_criteria: string[];
  tasks: Task[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Bug {
  id: string;
  type: 'bug';
  title: string;
  description: string;
  severity: Priority;
  priority: Priority;
  status: Status;
  assignee: string | null;
  labels: string[];
  related: {
    user_story: string | null;
    duplicate_of: string | null;
    blocks: string[];
  };
  tasks: Task[];
  notes?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface TaskItem {
  id: string;
  type: 'task';
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string | null;
  epic: string | null;
  labels: string[];
  checklist: Array<{
    item: string;
    completed: boolean;
  }>;
  estimate?: string;
  dependencies: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Epic {
  id: string;
  title: string;
  description: string;
  status: Status;
  goal: string;
  value: string;
  start_date: string;
  target_date: string;
  completed_date: string | null;
  owner: string;
  stakeholders: string[];
  stories: string[];
  metrics: Array<{
    metric: string;
    target: string;
    current: string;
  }>;
  total_stories: number;
  completed_stories: number;
  in_progress_stories: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type StoryItem = UserStory | Bug | TaskItem;

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface GitHubPROptions {
  storyId: string;
  title: string;
  description: string;
  labels: string[];
  assignee: string | null;
  base?: string;
}
