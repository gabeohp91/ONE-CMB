import { useState, useEffect, useCallback } from 'react';
import { taskService } from '@/services/taskService';
import { Task, TaskCreateRequest, TaskUpdateRequest } from '@/shared/types/models/task';

/**
 * Custom hook for task data management
 * 
 * Note: This is a transitional implementation that will eventually be
 * replaced with React Query. It provides backward compatibility while 
 * we migrate to the new data management approach.
 */
const useTaskData = (filters?: Record<string, any>) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Using stringified filters to compare dependency changes
  const filterKey = JSON.stringify(filters);
  
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getTasks(filters);
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
    } finally {
      setIsLoading(false);
    }
  }, [filterKey]);
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  const addTask = async (task: TaskCreateRequest) => {
    try {
      await taskService.addTask(task);
      return fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
      throw err;
    }
  };
  
  const updateTask = async (id: string, updates: TaskUpdateRequest) => {
    try {
      await taskService.updateTask(id, updates);
      return fetchTasks();
    } catch (err) {
      console.error(`Error updating task ${id}:`, err);
      throw err;
    }
  };
  
  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      return fetchTasks();
    } catch (err) {
      console.error(`Error deleting task ${id}:`, err);
      throw err;
    }
  };
  
  // Add task stats functionality
  const [stats, setStats] = useState<Record<string, number>>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    canceled: 0
  });
  
  const fetchStats = useCallback(async () => {
    try {
      const taskStats = await taskService.getTaskStats();
      setStats(taskStats);
    } catch (err) {
      console.error('Error fetching task stats:', err);
    }
  }, []);
  
  useEffect(() => {
    fetchStats();
  }, [tasks, fetchStats]);

  return { 
    tasks, 
    isLoading, 
    error,
    stats,
    addTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks
  };
};

export default useTaskData;