import { useState, useCallback } from 'react';

export function useAiTools() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<'sidebar' | 'translate' | 'templates'>('sidebar');
  
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);
  
  return {
    sidebarCollapsed,
    toggleSidebar,
    activeView,
    setActiveView
  };
}