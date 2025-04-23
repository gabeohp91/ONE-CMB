import { useQuery, useMutation, useQueryClient } from 'react-query';
import { taskService } from '@/services/taskService';
import { Task, TaskCreateRequest, TaskUpdateRequest } from '@/shared/types/models/task';
import { queryKeys } from '@/lib/react-query';

/**
 * Hook for fetching tasks with optional filters
 */
export function useTasks(filters?: Record<string, any>) {
  return useQuery(
    [queryKeys.tasks, filters],
    () => taskService.getTasks(filters),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

/**
 * Hook for fetching a single task by ID
 */
export function useTask(id: string) {
  return useQuery(
    queryKeys.task(id),
    () => taskService.getTask(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

/**
 * Hook for creating a new task
 */
export function useCreateTask() {
  const queryClient = useQueryClient();
  
  return useMutation(
    (task: TaskCreateRequest) => taskService.addTask(task),
    {
      onSuccess: () => {
        // Invalidate tasks query to refresh the list
        queryClient.invalidateQueries(queryKeys.tasks);
      }
    }
  );
}

/**
 * Hook for updating an existing task
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, updates }: { id: string; updates: TaskUpdateRequest }) => 
      taskService.updateTask(id, updates),
    {
      onSuccess: (data) => {
        // Update the task in the cache
        queryClient.setQueryData(queryKeys.task(data.id), data);
        // Invalidate the list queries
        queryClient.invalidateQueries(queryKeys.tasks);
      }
    }
  );
}

/**
 * Hook for deleting a task
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();
  
  return useMutation(
    (id: string) => taskService.deleteTask(id),
    {
      onSuccess: (_, id) => {
        // Remove the task from the cache
        queryClient.removeQueries(queryKeys.task(id));
        // Invalidate the list queries
        queryClient.invalidateQueries(queryKeys.tasks);
      }
    }
  );
}

/**
 * Hook for fetching task statistics
 */
export function useTaskStats() {
  return useQuery(
    'taskStats',
    () => taskService.getTaskStats(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}