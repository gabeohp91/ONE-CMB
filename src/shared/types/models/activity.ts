/**
 * Activity type definitions
 */
export type ActivityType = 
  | 'task_created' 
  | 'task_updated' 
  | 'task_completed' 
  | 'task_comment'
  | 'project_created'
  | 'project_updated'
  | 'document_shared'
  | 'meeting_scheduled'
  | 'notification'
  | 'approval_request'
  | 'approval_granted'
  | 'approval_denied';

/**
 * Activity direction types
 */
export type ActivityDirection = 'incoming' | 'outgoing';

/**
 * Activity status types
 */
export type ActivityStatus = 'pending' | 'in-progress' | 'completed' | 'canceled' | 'approved' | 'rejected';

/**
 * Activity model definition
 */
export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  details?: Record<string, any>;
  direction: ActivityDirection; 
  status: ActivityStatus;
  relatedId?: string;
  relatedType?: string;
  recipientId?: string;
  recipientName?: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  requiresAction: boolean;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  completedAt?: string;
}

/**
 * Activity create request
 */
export interface ActivityCreateRequest {
  type: ActivityType;
  title: string;
  description?: string;
  details?: Record<string, any>;
  direction: ActivityDirection;
  status?: ActivityStatus;
  relatedId?: string;
  relatedType?: string;
  recipientId?: string;
  senderId?: string;
  requiresAction?: boolean;
  dueDate?: string;
}