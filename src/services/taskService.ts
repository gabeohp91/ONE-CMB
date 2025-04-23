import { api } from '@/shared/services/apiClient';
import { Task, TaskCreateRequest, TaskUpdateRequest, normalizeTask } from '@/shared/types/models/task';
import { taskData } from '@/data/tasks';  // Importing mock data for now

class TaskService {
  async getTasks(filters?: Record<string, any>): Promise<Task[]> {
    try {
      // In a real implementation, this would call an API
      // const tasks = await api.get<Task[]>('/tasks', { params: filters });
      // return tasks;
      
      // For now, return mock data with normalized format
      let rawTasks = [...taskData];
      let filteredTasks = rawTasks.map(task => normalizeTask(task));
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            filteredTasks = filteredTasks.filter(task => {
              if (key === 'status') return task.status === value;
              if (key === 'priority') return task.priority === value;
              if (key === 'assigneeId') return task.assigneeId === value;
              if (key === 'search') {
                const searchTerm = String(value).toLowerCase();
                return task.name.toLowerCase().includes(searchTerm) || 
                       (task.description?.toLowerCase().includes(searchTerm) || false);
              }
              return true;
            });
          }
        });
      }
      
      return filteredTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async getTask(id: string): Promise<Task | undefined> {
    try {
      // const task = await api.get<Task>(`/tasks/${id}`);
      // return task;
      
      const task = taskData.find(task => task.id === id);
      return task ? normalizeTask(task) : undefined;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  }

  async addTask(taskData: TaskCreateRequest): Promise<Task> {
    try {
      // const newTask = await api.post<Task>('/tasks', taskData);
      // return newTask;
      
      // Simulate adding a task with a new ID
      const newTask = normalizeTask({
        id: `task-${Date.now()}`,
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
      });
      
      console.log('Added new task (mock):', newTask);
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async updateTask(id: string, updates: TaskUpdateRequest): Promise<Task> {
    try {
      // const updatedTask = await api.put<Task>(`/tasks/${id}`, updates);
      // return updatedTask;
      
      const task = taskData.find(t => t.id === id);
      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }
      
      const updatedTask = normalizeTask({
        ...task,
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      console.log('Updated task (mock):', updatedTask);
      return updatedTask;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      // await api.delete(`/tasks/${id}`);
      console.log(`Deleted task ${id} (mock)`);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  }
  
  async getTaskStats(): Promise<Record<string, number>> {
    // Fetch all tasks and calculate stats
    const tasks = await this.getTasks();
    
    const stats = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      canceled: tasks.filter(t => t.status === 'canceled').length,
    };
    
    return stats;
  }
}

export const taskService = new TaskService();