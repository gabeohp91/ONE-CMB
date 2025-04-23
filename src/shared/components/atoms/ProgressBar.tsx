import React from 'react';

export interface ProgressBarProps {
  progress: number;
  status?: string;
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status,
  showLabel = true,
  className = '',
}) => {
  const getColorClass = (status?: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'in-progress':
        return 'bg-blue-600';
      case 'cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const validProgress = Math.min(Math.max(0, progress), 100);
  
  return (
    <div className={className}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColorClass(status)}`}
          style={{ width: `${validProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-gray-500 mt-1">{validProgress}%</div>
      )}
    </div>
  );
};

export default ProgressBar;