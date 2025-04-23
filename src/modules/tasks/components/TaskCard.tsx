tsx
import React from 'react';

interface Task {
  title: string;
  // Add other task properties as needed
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
    </div>
  );
};

export default TaskCard;