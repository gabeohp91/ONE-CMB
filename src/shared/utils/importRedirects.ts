/**
 * This file contains mappings for import redirects during the refactoring process.
 * It helps identify which imports should be updated to the new structure.
 */

export const importMappings = {
  // Components
  '@/components/AIAssistant/AIAssistant': '@/features/ai-assistant/components/AIAssistant',
  
  // Services
  '@/services/aiService': '@/features/ai-assistant/services/aiService',
  '@/services/taskService': '@/features/tasks/services/taskService',
  
  // Types
  '@/data/tasks/types': '@/shared/types/tasks',
  
  // Hooks
  '@/hooks/use-data-fetch': '@/shared/hooks/use-data-fetch',
  '@/modules/tasks/hooks/useTaskData': '@/features/tasks/hooks/useTaskData',
};

/**
 * Returns the new import path if a mapping exists, or the original path if not
 */
export function getUpdatedImportPath(originalPath: string): string {
  return importMappings[originalPath] || originalPath;
}