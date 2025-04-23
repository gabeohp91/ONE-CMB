import { Task, normalizeTask } from '@/shared/types/models/task';
import { Employee, normalizeEmployee } from '@/shared/types/models/user';

/**
 * Data migration utilities
 * 
 * These utilities help migrate data between different formats and structures
 * during the data consolidation process. They should be considered temporary
 * and will be removed once the migration is complete.
 */

/**
 * Normalize a collection of tasks
 */
export function normalizeTasks(tasks: any[]): Task[] {
  return tasks.map(task => normalizeTask(task));
}

/**
 * Normalize a collection of employees
 */
export function normalizeEmployees(employees: any[]): Employee[] {
  return employees.map(employee => normalizeEmployee(employee));
}

/**
 * Convert legacy date formats (string or Date) to ISO string
 */
export function normalizeDateString(date: string | Date | undefined): string {
  if (!date) {
    return new Date().toISOString();
  }
  
  if (date instanceof Date) {
    return date.toISOString();
  }
  
  // Try to parse the date string
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      // Invalid date, return current date
      return new Date().toISOString();
    }
    return parsedDate.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

/**
 * Deep merge objects
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  Object.keys(source).forEach(key => {
    const targetValue = (result as any)[key];
    const sourceValue = (source as any)[key];
    
    if (
      typeof targetValue === 'object' && 
      !Array.isArray(targetValue) && 
      targetValue !== null &&
      typeof sourceValue === 'object' && 
      !Array.isArray(sourceValue) && 
      sourceValue !== null
    ) {
      (result as any)[key] = deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      (result as any)[key] = sourceValue;
    }
  });
  
  return result;
}

/**
 * Store migrated data in localStorage for development
 */
export function storeMigratedData(key: string, data: any): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`migrated_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error(`Error storing migrated data for ${key}:`, error);
    }
  }
}

/**
 * Retrieve migrated data from localStorage for development
 */
export function getMigratedData<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(`migrated_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving migrated data for ${key}:`, error);
      return defaultValue;
    }
  }
  return defaultValue;
}