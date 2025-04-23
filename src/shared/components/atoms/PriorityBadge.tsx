import React from 'react';

export type PriorityType = 'high' | 'medium' | 'low' | string;

export interface PriorityBadgeProps {
  priority: PriorityType;
  children?: React.ReactNode;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ 
  priority, 
  children, 
  className = '' 
}) => {
  const getColorClass = (priority: PriorityType): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClass(priority)} ${className}`}
    >
      {children || priority}
    </span>
  );
};

export default PriorityBadge;