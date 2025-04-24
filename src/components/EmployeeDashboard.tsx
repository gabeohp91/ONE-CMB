import React, { useState, useCallback } from 'react';
import { MessageSquare } from 'lucide-react';
import { useEmployee } from '@/contexts/EmployeeContext';
import { useTaskData } from '@/modules/tasks/hooks/useTaskData';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import TasksTab from '@/components/tabs/TasksTab';
import OverviewTab from '@/components/tabs/OverviewTab';
import ActivitiesTab from '@/components/tabs/ActivitiesTab';
import ResourcesTab from '@/components/tabs/ResourcesTab';
import TranslationTab from '@/components/tabs/TranslationTab';
import TemplatesTab from '@/components/tabs/TemplatesTab';
import AIToolsTab from '@/components/tabs/AIToolsTab';
import AppSidebar from '@/components/AppSidebar/AppSidebar';

const EmployeeDashboard: React.FC = () => {
  const [chatExpanded, setChatExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [resourceTab, setResourceTab] = useState('equipment');
  const [activityTab, setActivityTab] = useState('incoming');
  const [aiToolView, setAiToolView] = useState<'translate' | 'templates'>('translate');
  
  // Get employee data from context
  const { employee } = useEmployee();
  
  // Get task data using useTaskData
  const { 
    tasks: currentTasks, 
    isLoading: tasksLoading,
    stats: taskStats,
    error: taskError
  } = useTaskData();
  
  // Get task history data
  const { tasks: taskHistory } = useTaskData({ status: 'completed' });
  
  const setActiveTabCallback = useCallback((tab: string, toolView?: 'translate' | 'templates') => {
    if (tab === 'translation' || tab === 'templates') {
      setActiveTab('ai-tools');
      setAiToolView(tab === 'translation' ? 'translate' : 'templates');
    } else {
      setActiveTab(tab);
    }
  }, []);

  const setChatExpandedCallback = useCallback((value: boolean) => {
    setChatExpanded(value);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab taskStats={taskStats} />;
      case 'tasks':
        return <TasksTab currentTasks={currentTasks} isLoading={tasksLoading} error={taskError} setChatExpanded={setChatExpanded} />;
      case 'activities':
        return <ActivitiesTab tab={activityTab} setTab={setActivityTab} />;
      case 'resources':
        return <ResourcesTab tab={resourceTab} setTab={setResourceTab} />;
      case 'ai-tools':
        return <AIToolsTab initialView={aiToolView} />;
      default:
        return <OverviewTab taskStats={taskStats} />;
    }
  };
  
  return (
    <div className="flex h-screen">
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTabCallback} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Employee Dashboard</h1>
            <div className="flex items-center">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                onClick={() => setChatExpanded(true)}
              >
                <MessageSquare size={18} className="mr-2" />
                Ask AI Assistant
              </button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {renderContent()}
          </main>
          
          {chatExpanded && (
            <div className="w-96 h-full">
              <AIAssistant
                employeeInfo={{
                  name: employee.name,
                  avatar: employee.name.charAt(0).toUpperCase(),
                }}
                onClose={() => setChatExpanded(false)}
                contextData={{ 
                  tasks: currentTasks,
                  taskHistory: taskHistory,
                  activeTab: activeTab
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;