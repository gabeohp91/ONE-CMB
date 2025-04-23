import React from 'react';
import { StatusBadge, StatusType } from '../atoms/StatusBadge';
import { PriorityBadge, PriorityType } from '../atoms/PriorityBadge';
import { ProgressBar } from '../atoms/ProgressBar';

export interface TaskStatusDisplayProps {
  status: StatusType;
  priority: PriorityType;
  progress: number;
  dueDate?: string;
  className?: string;
}

export const TaskStatusDisplay: React.FC<TaskStatusDisplayProps> = ({
  status,
  priority,
  progress,
  dueDate,
  className = '',
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <StatusBadge status={status}>{status}</StatusBadge>
        <PriorityBadge priority={priority} />
        {dueDate && (
          <span className="text-xs text-gray-500">Due: {dueDate}</span>
        )}
      </div>
      <ProgressBar progress={progress} status={status} />
    </div>
  );
};

export default TaskStatusDisplay;