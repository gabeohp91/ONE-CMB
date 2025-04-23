import React from 'react';

export type StatusType = 'completed' | 'in-progress' | 'open' | 'cancelled' | 'pending' | string;

export interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children, className = '' }) => {
  const getColorClass = (status: StatusType): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'open':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClass(status)} ${className}`}
    >
      {children}
    </span>
  );
};

export default StatusBadge;