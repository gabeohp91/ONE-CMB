import { QueryClient } from 'react-query';

/**
 * Global React Query client configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch data when window regains focus
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
      retry: 1, // Only retry failed requests once
      onError: (error) => {
        // Global error handler for queries
        console.error('Query error:', error);
      },
    },
    mutations: {
      onError: (error) => {
        // Global error handler for mutations
        console.error('Mutation error:', error);
      },
    },
  },
});

/**
 * Utility function to invalidate multiple queries at once
 */
export const invalidateQueries = (queryKeys: string[]) => {
  queryKeys.forEach(key => {
    queryClient.invalidateQueries(key);
  });
};

/**
 * Predefined query keys for consistent cache management
 */
export const queryKeys = {
  users: 'users',
  user: (id: string) => ['user', id],
  currentUser: 'currentUser',
  
  tasks: 'tasks',
  task: (id: string) => ['task', id],
  tasksByProject: (projectId: string) => ['tasks', { projectId }],
  tasksByAssignee: (assigneeId: string) => ['tasks', { assigneeId }],
  
  projects: 'projects',
  project: (id: string) => ['project', id],
  
  activities: 'activities',
  activity: (id: string) => ['activity', id],
  activitiesByUser: (userId: string) => ['activities', { userId }],
  
  resources: 'resources',
  resource: (id: string) => ['resource', id],
  resourcesByType: (type: string) => ['resources', { type }],
};