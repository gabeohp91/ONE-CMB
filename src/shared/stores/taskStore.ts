import { create } from 'zustand';
import { Task, TaskCreateRequest, TaskUpdateRequest } from '../types/models';
import apiClient from '../services/apiClient';
import { queryClient, queryKeys } from '@/lib/react-query';

// Define the task store state shape
interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
  
  // Filter state
  filter: {
    status?: string;
    priority?: string;
    assigneeId?: string;
    project?: string;
    search?: string;
  };
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  selectTask: (task: Task | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filter: Partial<TaskState['filter']>) => void;
  
  // Async actions
  fetchTasks: (filter?: Partial<TaskState['filter']>) => Promise<Task[]>;
  fetchTask: (id: string) => Promise<Task | null>;
  createTask: (task: TaskCreateRequest) => Promise<Task | null>;
  updateTask: (id: string, updates: TaskUpdateRequest) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;
  
  // Helper methods
  getFilteredTasks: () => Task[];
}

/**
 * Task store for task management
 */
export const useTaskStore = create<TaskState>()((set, get) => ({
  // State
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  filter: {},
  
  // Actions
  setTasks: (tasks) => set({ tasks }),
  
  selectTask: (task) => set({ selectedTask: task }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setFilter: (filter) => set(state => ({ 
    filter: { ...state.filter, ...filter } 
  })),
  
  // Async actions
  fetchTasks: async (filter) => {
    const { setLoading, setTasks, setError } = get();
    
    // Merge filter with current filter if provided
    if (filter) {
      get().setFilter(filter);
    }
    
    setLoading(true);
    try {
      // In a real app, you'd include the filter in the API request
      const currentFilter = get().filter;
      
      // Convert filter to query params
      const params = new URLSearchParams();
      Object.entries(currentFilter).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await apiClient.get(`/tasks?${params}`);
      const tasks = response.data;
      
      setTasks(tasks);
      return tasks;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch tasks');
      return [];
    } finally {
      setLoading(false);
    }
  },
  
  fetchTask: async (id) => {
    const { setLoading, selectTask, setError } = get();
    
    setLoading(true);
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      const task = response.data;
      
      selectTask(task);
      return task;
    } catch (error) {
      console.error(`Failed to fetch task ${id}:`, error);
      setError(error instanceof Error ? error.message : `Failed to fetch task ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  },
  
  createTask: async (taskData) => {
    const { setLoading, setError, fetchTasks } = get();
    
    setLoading(true);
    try {
      const response = await apiClient.post('/tasks', taskData);
      const newTask = response.data;
      
      // Refresh the task list
      await fetchTasks();
      
      // Invalidate related React Query cache
      queryClient.invalidateQueries(queryKeys.tasks);
      
      return newTask;
    } catch (error) {
      console.error('Failed to create task:', error);
      setError(error instanceof Error ? error.message : 'Failed to create task');
      return null;
    } finally {
      setLoading(false);
    }
  },
  
  updateTask: async (id, updates) => {
    const { setLoading, setError, fetchTasks, tasks } = get();
    
    setLoading(true);
    try {
      const response = await apiClient.patch(`/tasks/${id}`, updates);
      const updatedTask = response.data;
      
      // Update local state optimistically
      set({
        tasks: tasks.map(task => 
          task.id === id ? { ...task, ...updatedTask } : task
        )
      });
      
      // Invalidate related React Query cache
      queryClient.invalidateQueries(queryKeys.tasks);
      queryClient.invalidateQueries(queryKeys.task(id));
      
      return updatedTask;
    } catch (error) {
      console.error(`Failed to update task ${id}:`, error);
      setError(error instanceof Error ? error.message : `Failed to update task ${id}`);
      
      // Refresh tasks to revert optimistic update on error
      await fetchTasks();
      return null;
    } finally {
      setLoading(false);
    }
  },
  
  deleteTask: async (id) => {
    const { setLoading, setError, tasks } = get();
    
    setLoading(true);
    try {
      await apiClient.delete(`/tasks/${id}`);
      
      // Update local state optimistically
      set({
        tasks: tasks.filter(task => task.id !== id)
      });
      
      // Invalidate related React Query cache
      queryClient.invalidateQueries(queryKeys.tasks);
      
      return true;
    } catch (error) {
      console.error(`Failed to delete task ${id}:`, error);
      setError(error instanceof Error ? error.message : `Failed to delete task ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  },
  
  // Helper methods
  getFilteredTasks: () => {
    const { tasks, filter } = get();
    
    return tasks.filter(task => {
      // Filter by status
      if (filter.status && task.status !== filter.status) {
        return false;
      }
      
      // Filter by priority
      if (filter.priority && task.priority !== filter.priority) {
        return false;
      }
      
      // Filter by assignee
      if (filter.assigneeId && task.assigneeId !== filter.assigneeId) {
        return false;
      }
      
      // Filter by project
      if (filter.project && task.project !== filter.project) {
        return false;
      }
      
      // Filter by search term
      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        return (
          task.name.toLowerCase().includes(searchTerm) ||
          (task.description?.toLowerCase().includes(searchTerm) || false)
        );
      }
      
      return true;
    });
  },
}));