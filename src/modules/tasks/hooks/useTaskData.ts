ts
// src/modules/tasks/hooks/useTaskData.ts
import { useState, useEffect } from 'react';

const useTaskData = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch tasks from an API
    // For now, we simulate loading with a timeout
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return { tasks, loading };
};

export default useTaskData;