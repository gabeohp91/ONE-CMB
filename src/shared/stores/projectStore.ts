import { create } from 'zustand';
import { Project, ProjectCreateRequest, ProjectUpdateRequest } from '../types/models';
import apiClient from '../services/apiClient';
import { queryClient, queryKeys } from '@/lib/react-query';

// Define the project store state shape
interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  
  // Filter state
  filter: {
    status?: string;
    managerId?: string;
    search?: string;
  };
  
  // Actions
  setProjects: (projects: Project[]) => void;
  selectProject: (project: Project | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filter: Partial<ProjectState['filter']>) => void;
  
  // Async actions
  fetchProjects: (filter?: Partial<ProjectState['filter']>) => Promise<Project[]>;
  fetchProject: (id: string) => Promise<Project | null>;
  createProject: (project: ProjectCreateRequest) => Promise<Project | null>;
  updateProject: (id: string, updates: ProjectUpdateRequest) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<boolean>;
  
  // Helper methods
  getFilteredProjects: () => Project[];
}

/**
 * Project store for project management
 */
export const useProjectStore = create<ProjectState>()((set, get) => ({
  // State
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,
  filter: {},
  
  // Actions
  setProjects: (projects) => set({ projects }),
  
  selectProject: (project) => set({ selectedProject: project }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setFilter: (filter) => set(state => ({ 
    filter: { ...state.filter, ...filter } 
  })),
  
  // Async actions
  fetchProjects: async (filter) => {
    const { setLoading, setProjects, setError } = get();
    
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
      
      const response = await apiClient.get(`/projects?${params}`);
      const projects = response.data;
      
      setProjects(projects);
      return projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch projects');
      return [];
    } finally {
      setLoading(false);
    }
  },
  
  fetchProject: async (id) => {
    const { setLoading, selectProject, setError } = get();
    
    setLoading(true);
    try {
      const response = await apiClient.get(`/projects/${id}`);
      const project = response.data;
      
      selectProject(project);
      return project;
    } catch (error) {
      console.error(`Failed to fetch project ${id}:`, error);
      setError(error instanceof Error ? error.message : `Failed to fetch project ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  },
  
  createProject: async (projectData) => {
    const { setLoading, setError, fetchProjects } = get();
    
    setLoading(true);
    try {
      const response = await apiClient.post('/projects', projectData);
      const newProject = response.data;
      
      // Refresh the project list
      await fetchProjects();
      
      // Invalidate related React Query cache
      queryClient.invalidateQueries(queryKeys.projects);
      
      return newProject;
    } catch (error) {
      console.error('Failed to create project:', error);
      setError(error instanceof Error ? error.message : 'Failed to create project');
      return null;
    } finally {
      setLoading(false);
    }
  },
  
  updateProject: async (id, updates) => {
    const { setLoading, setError, fetchProjects, projects } = get();
    
    setLoading(true);
    try {
      const response = await apiClient.patch(`/projects/${id}`, updates);
      const updatedProject = response.data;
      
      // Update local state optimistically
      set({
        projects: projects.map(project => 
          project.id === id ? { ...project, ...updatedProject } : project
        )
      });
      
      // Invalidate related React Query cache
      queryClient.invalidateQueries(queryKeys.projects);
      queryClient.invalidateQueries(queryKeys.project(id));
      
      return updatedProject;
    } catch (error) {
      console.error(`Failed to update project ${id}:`, error);
      setError(error instanceof Error ? error.message : `Failed to update project ${id}`);
      
      // Refresh projects to revert optimistic update on error
      await fetchProjects();
      return null;
    } finally {
      setLoading(false);
    }
  },
  
  deleteProject: async (id) => {
    const { setLoading, setError, projects } = get();
    
    setLoading(true);
    try {
      await apiClient.delete(`/projects/${id}`);
      
      // Update local state optimistically
      set({
        projects: projects.filter(project => project.id !== id)
      });
      
      // Invalidate related React Query cache
      queryClient.invalidateQueries(queryKeys.projects);
      
      return true;
    } catch (error) {
      console.error(`Failed to delete project ${id}:`, error);
      setError(error instanceof Error ? error.message : `Failed to delete project ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  },
  
  // Helper methods
  getFilteredProjects: () => {
    const { projects, filter } = get();
    
    return projects.filter(project => {
      // Filter by status
      if (filter.status && project.status !== filter.status) {
        return false;
      }
      
      // Filter by manager
      if (filter.managerId && project.managerId !== filter.managerId) {
        return false;
      }
      
      // Filter by search term
      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        return (
          project.name.toLowerCase().includes(searchTerm) ||
          (project.description?.toLowerCase().includes(searchTerm) || false)
        );
      }
      
      return true;
    });
  },
}));