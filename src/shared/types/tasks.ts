// src/shared/types/tasks.ts

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignee?: string; // Employee ID
  category?: string;
  attachments?: string[]; // URLs or file paths
  comments?: TaskComment[];
}

export interface TaskComment {
  id: string;
  author: string; // Employee ID
  content: string;
  createdAt: Date;
}

export interface TaskCategory {
  id: string;
  name: string;
  description?: string;
}

export interface TaskStats {
  total: number;
  open: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}