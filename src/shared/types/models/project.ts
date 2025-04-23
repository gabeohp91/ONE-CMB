/**
 * Project status types
 */
export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'canceled';

/**
 * Project model definition
 */
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  client?: string;
  managerId: string;
  managerName: string;
  memberIds: string[];
  members?: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  }[];
  progress: number;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Project creation request 
 */
export interface ProjectCreateRequest {
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  client?: string;
  managerId: string;
  memberIds?: string[];
  budget?: number;
}

/**
 * Project update request
 */
export interface ProjectUpdateRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string;
  client?: string;
  managerId?: string;
  memberIds?: string[];
  progress?: number;
  budget?: number;
}