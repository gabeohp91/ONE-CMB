// src/data/activities/activityTypes.ts

export type ActivityType = 'meeting' | 'email' | 'phone_call' | 'task_completion' | 'other';

export const activityTypeLabels: Record<ActivityType, string> = {
  meeting: 'Meeting',
  email: 'Email',
  phone_call: 'Phone Call',
  task_completion: 'Task Completion',
  other: 'Other',
};