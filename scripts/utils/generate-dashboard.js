#!/usr/bin/env node

// Generate static HTML dashboard from task files

import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import yaml from 'js-yaml';

const STORIES_DIR = 'tasks/stories';
const EPICS_DIR = 'tasks/epics';
const OUTPUT_DIR = 'docs/tasks';

async function loadStories() {
  try {
    const files = await readdir(STORIES_DIR);
    const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    
    const stories = [];
    for (const file of yamlFiles) {
      const content = await readFile(join(STORIES_DIR, file), 'utf-8');
      const story = yaml.load(content);
      stories.push(story);
    }
    
    return stories;
  } catch (error) {
    console.error('Error loading stories:', error);
    return [];
  }
}

async function loadEpics() {
  try {
    const files = await readdir(EPICS_DIR);
    const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    
    const epics = [];
    for (const file of yamlFiles) {
      const content = await readFile(join(EPICS_DIR, file), 'utf-8');
      const epic = yaml.load(content);
      epics.push(epic);
    }
    
    return epics;
  } catch (error) {
    console.error('Error loading epics:', error);
    return [];
  }
}

function generateHTML(stories, epics) {
  const statusCounts = {
    pending: 0,
    'in-progress': 0,
    'in-review': 0,
    completed: 0,
    cancelled: 0
  };

  const priorityCounts = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  };

  stories.forEach(story => {
    statusCounts[story.status] = (statusCounts[story.status] || 0) + 1;
    priorityCounts[story.priority] = (priorityCounts[story.priority] || 0) + 1;
  });

  const totalStories = stories.length;
  const completedStories = statusCounts.completed || 0;
  const completionRate = totalStories > 0 ? ((completedStories / totalStories) * 100).toFixed(1) : 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pescador - Task Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary: #3b8fd9;
      --secondary: #26d9a3;
      --danger: #ff7b7b;
      --warning: #ffb84d;
      --success: #26d9a3;
      --gray-100: #0f1419;
      --gray-200: #1a1f26;
      --gray-300: #2d3540;
      --gray-700: #9198a1;
      --gray-900: #e6edf3;
      --bg-primary: #0f1419;
      --bg-secondary: #1a1f26;
      --bg-card: #242b35;
      --bg-elevated: #2d3540;
      --border-color: #3d4753;
      --border-subtle: #2d3540;
      --text-primary: #e6edf3;
      --text-secondary: #9198a1;
      --text-tertiary: #6e7681;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: var(--text-primary);
      background: var(--bg-primary);
    }

    .header {
      background: linear-gradient(135deg, #1a2332, #1e3a3a);
      color: white;
      padding: 2rem 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .header h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .header p {
      opacity: 0.9;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .stat-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      border-left: 4px solid var(--primary);
      border: 1px solid var(--border-subtle);
    }

    .stat-card h3 {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .stat-card .value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary);
    }

    .filters {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      border: 1px solid var(--border-subtle);
      margin-bottom: 2rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-group label {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    select, input {
      padding: 0.5rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      font-size: 0.875rem;
      background: var(--bg-card);
      color: var(--text-primary);
      cursor: pointer;
      transition: border-color 0.2s;
    }

    select:hover, input:hover {
      border-color: var(--primary);
    }

    select:focus, input:focus {
      outline: none;
      border-color: var(--primary);
    }

    .kanban {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .column {
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid var(--border-subtle);
    }

    .column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: var(--bg-card);
      border-radius: 8px;
      margin-bottom: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .column-count {
      background: var(--bg-elevated);
      color: var(--text-secondary);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
    }

    .story-card {
      background: var(--bg-card);
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 0.75rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    }

    .story-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      background: var(--bg-elevated);
    }

    .story-id {
      font-weight: 700;
      color: var(--primary);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .story-title {
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--text-primary);
    }

    .story-meta {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .badge-low { background: var(--bg-elevated); color: var(--text-secondary); }
    .badge-medium { background: rgba(255, 184, 77, 0.2); color: #ffb84d; border: 1px solid rgba(255, 184, 77, 0.3); }
    .badge-high { background: rgba(255, 123, 123, 0.2); color: #ff7b7b; border: 1px solid rgba(255, 123, 123, 0.3); }
    .badge-critical { background: var(--danger); color: var(--bg-primary); font-weight: 700; }

    .badge-user-story { background: rgba(59, 143, 217, 0.2); color: var(--primary); border: 1px solid rgba(59, 143, 217, 0.3); }
    .badge-bug { background: rgba(255, 123, 123, 0.2); color: var(--danger); border: 1px solid rgba(255, 123, 123, 0.3); }
    .badge-task { background: var(--bg-elevated); color: var(--text-secondary); }

    .empty-column {
      text-align: center;
      padding: 2rem;
      color: var(--text-tertiary);
      font-style: italic;
    }

    footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-subtle);
    }

    footer a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
    }

    footer a:hover {
      color: var(--primary);
    }

    @media (max-width: 768px) {
      .kanban {
        grid-template-columns: 1fr;
      }
      
      .stats {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <h1>📋 Pescador Task Dashboard</h1>
      <p>Task and User Story Management System</p>
    </div>
  </header>

  <main class="container">
    <div class="stats">
      <div class="stat-card">
        <h3>Total Stories</h3>
        <div class="value">${totalStories}</div>
      </div>
      <div class="stat-card">
        <h3>Completed</h3>
        <div class="value">${completedStories}</div>
      </div>
      <div class="stat-card">
        <h3>In Progress</h3>
        <div class="value">${statusCounts['in-progress'] || 0}</div>
      </div>
      <div class="stat-card">
        <h3>Completion Rate</h3>
        <div class="value">${completionRate}%</div>
      </div>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label for="filterType">Type:</label>
        <select id="filterType" onchange="applyFilters()">
          <option value="all">All</option>
          <option value="user-story">User Stories</option>
          <option value="bug">Bugs</option>
          <option value="task">Tasks</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="filterPriority">Priority:</label>
        <select id="filterPriority" onchange="applyFilters()">
          <option value="all">All</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="searchInput">Search:</label>
        <input type="text" id="searchInput" placeholder="Search stories..." oninput="applyFilters()">
      </div>
    </div>

    <div class="kanban">
      <div class="column">
        <div class="column-header">
          <span>📝 Backlog</span>
          <span class="column-count">${statusCounts.pending || 0}</span>
        </div>
        <div id="pending-stories">
          ${generateStoryCards(stories.filter(s => s.status === 'pending'))}
        </div>
      </div>

      <div class="column">
        <div class="column-header">
          <span>🚀 In Progress</span>
          <span class="column-count">${statusCounts['in-progress'] || 0}</span>
        </div>
        <div id="in-progress-stories">
          ${generateStoryCards(stories.filter(s => s.status === 'in-progress'))}
        </div>
      </div>

      <div class="column">
        <div class="column-header">
          <span>👀 In Review</span>
          <span class="column-count">${statusCounts['in-review'] || 0}</span>
        </div>
        <div id="in-review-stories">
          ${generateStoryCards(stories.filter(s => s.status === 'in-review'))}
        </div>
      </div>

      <div class="column">
        <div class="column-header">
          <span>✅ Completed</span>
          <span class="column-count">${statusCounts.completed || 0}</span>
        </div>
        <div id="completed-stories">
          ${generateStoryCards(stories.filter(s => s.status === 'completed'))}
        </div>
      </div>
    </div>
  </main>

  <footer>
    <p>Generated on ${new Date().toLocaleString()}</p>
    <p>Pescador Task Management System • <a href="../index.html">Back to Main Site</a></p>
  </footer>

  <script>
    const allStories = ${JSON.stringify(stories)};

    function applyFilters() {
      const typeFilter = document.getElementById('filterType').value;
      const priorityFilter = document.getElementById('filterPriority').value;
      const searchText = document.getElementById('searchInput').value.toLowerCase();

      let filtered = allStories;

      if (typeFilter !== 'all') {
        filtered = filtered.filter(s => s.type === typeFilter);
      }

      if (priorityFilter !== 'all') {
        filtered = filtered.filter(s => s.priority === priorityFilter);
      }

      if (searchText) {
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(searchText) ||
          s.id.toLowerCase().includes(searchText) ||
          s.description.toLowerCase().includes(searchText)
        );
      }

      updateKanban(filtered);
    }

    function updateKanban(stories) {
      const statuses = ['pending', 'in-progress', 'in-review', 'completed'];
      
      statuses.forEach(status => {
        const statusStories = stories.filter(s => s.status === status);
        const container = document.getElementById(\`\${status}-stories\`);
        container.innerHTML = generateStoryCardsHTML(statusStories);
      });
    }

    function generateStoryCardsHTML(stories) {
      if (stories.length === 0) {
        return '<div class="empty-column">No stories</div>';
      }

      return stories.map(story => \`
        <div class="story-card" data-id="\${story.id}">
          <div class="story-id">\${story.id}</div>
          <div class="story-title">\${story.title}</div>
          <div class="story-meta">
            <span class="badge badge-\${story.type}">\${story.type}</span>
            <span class="badge badge-\${story.priority}">\${story.priority}</span>
            \${story.assignee ? \`<span class="badge">@\${story.assignee}</span>\` : ''}
          </div>
        </div>
      \`).join('');
    }
  </script>
</body>
</html>`;
}

function generateStoryCards(stories) {
  if (stories.length === 0) {
    return '<div class="empty-column">No stories</div>';
  }

  return stories.map(story => `
    <div class="story-card" data-id="${story.id}">
      <div class="story-id">${story.id}</div>
      <div class="story-title">${story.title}</div>
      <div class="story-meta">
        <span class="badge badge-${story.type}">${story.type}</span>
        <span class="badge badge-${story.priority}">${story.priority}</span>
        ${story.assignee ? `<span class="badge">@${story.assignee}</span>` : ''}
      </div>
    </div>
  `).join('');
}

async function main() {
  console.log('Loading stories and epics...');
  const stories = await loadStories();
  const epics = await loadEpics();
  
  console.log(`Loaded ${stories.length} stories and ${epics.length} epics`);
  
  console.log('Generating dashboard HTML...');
  const html = generateHTML(stories, epics);
  
  const outputPath = join(OUTPUT_DIR, 'index.html');
  await writeFile(outputPath, html, 'utf-8');
  
  console.log(`Dashboard generated: ${outputPath}`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
