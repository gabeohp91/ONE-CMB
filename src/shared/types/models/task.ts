/**
 * Task status types
 * 
 * Note: Previously we had inconsistent status values across the codebase.
 * We've standardized on these values.
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'canceled';

// Legacy status type used for backward compatibility with older components
// TODO: Remove this once the migration is complete
export type LegacyTaskStatus = 'open' | 'in-progress' | 'completed' | 'cancelled';

/**
 * Task priority levels
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Task category definition
 * Moved from tasks/types.ts
 */
export interface TaskCategory {
  id: string;
  name: string;
  description?: string;
}

/**
 * Task statistics
 * Moved from tasks/types.ts
 */
export interface TaskStats {
  total: number;
  pending: number;  // renamed from 'open'
  inProgress: number;
  completed: number;
  canceled: number;  // standardized spelling
}

/**
 * Task comment model
 */
export interface TaskComment {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

/**
 * Task model definition
 * 
 * This is the canonical Task model for the application. It consolidates
 * previous definitions from various locations.
 */
export interface Task {
  id: string;
  name: string;  // Note: some legacy components may still use 'title'
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;  // ISO date string format
  progress: number;
  project: string;
  assigneeId?: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  attachments?: string[];
  comments?: TaskComment[];
}

/**
 * Task creation request 
 */
export interface TaskCreateRequest {
  name: string;
  description?: string;
  status?: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  project: string;
  assigneeId?: string;
  category?: string;
}

/**
 * Task update request
 */
export interface TaskUpdateRequest {
  name?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  progress?: number;
  project?: string;
  assigneeId?: string;
  category?: string;
}

/**
 * Utility functions for working with tasks
 */

/**
 * Converts legacy task status to the standardized format
 */
export function normalizeLegacyStatus(status: LegacyTaskStatus): TaskStatus {
  switch (status) {
    case 'open': return 'pending';
    case 'in-progress': return 'in-progress'; 
    case 'completed': return 'completed';
    case 'cancelled': return 'canceled';
    default: return 'pending';
  }
}

/**
 * Converts a task from the legacy format to the standardized format
 * This helps with backward compatibility during the transition
 */
export function normalizeTask(legacyTask: {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  status?: TaskStatus | LegacyTaskStatus;
  priority?: TaskPriority;
  dueDate?: string | Date;
  [key: string]: any;
}): Task {
  // Create a base task with required fields
  const normalizedTask: Partial<Task> = {
    id: legacyTask.id,
    name: legacyTask.name || legacyTask.title || 'Untitled Task',
    description: legacyTask.description || '',
    priority: legacyTask.priority || 'medium',
    progress: legacyTask.progress || 0,
    project: legacyTask.project || 'default',
    createdAt: legacyTask.createdAt || new Date().toISOString(),
    updatedAt: legacyTask.updatedAt || new Date().toISOString(),
  };

  // Handle status normalization
  if (legacyTask.status) {
    const status = legacyTask.status as LegacyTaskStatus;
    normalizedTask.status = ['open', 'in-progress', 'completed', 'cancelled'].includes(status)
      ? normalizeLegacyStatus(status)
      : (legacyTask.status as TaskStatus);
  } else {
    normalizedTask.status = 'pending';
  }

  // Handle date conversion
  if (legacyTask.dueDate) {
    normalizedTask.dueDate = legacyTask.dueDate instanceof Date
      ? legacyTask.dueDate.toISOString()
      : legacyTask.dueDate;
  } else {
    // Default to 1 week from now
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    normalizedTask.dueDate = oneWeekFromNow.toISOString();
  }

  // Copy remaining fields
  Object.entries(legacyTask).forEach(([key, value]) => {
    if (!normalizedTask.hasOwnProperty(key) && value !== undefined) {
      (normalizedTask as any)[key] = value;
    }
  });

  return normalizedTask as Task;
}