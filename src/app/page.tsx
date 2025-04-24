'use client';

import React, {useState, useCallback, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import AppSidebar from '@/components/AppSidebar/AppSidebar';

// Import tab components
import OverviewTab from '@/components/tabs/OverviewTab';
import TasksTab from '@/components/tabs/TasksTab';
import ResourcesTab from '@/components/tabs/ResourcesTab';
import ActivitiesTab from '@/components/tabs/ActivitiesTab';
import AIToolsTab from '@/components/tabs/AIToolsTab';

// Import mock data
import { employeeInfo } from '@/data/employeeInfo';
import { currentTasks } from '@/data/currentTasks';
import { taskHistory } from '@/data/taskHistory';

const EmployeeDashboard = () => {
  const searchParams = useSearchParams();
  
  const [chatExpanded, setChatExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [resourceTab, setResourceTab] = useState('equipment');
  const [activityTab, setActivityTab] = useState('incoming');
  
  // For AI tools
  const [aiToolView, setAiToolView] = useState<'translate' | 'templates'>('translate');
  
  // Check URL parameters on load
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const toolParam = searchParams.get('tool');
    
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    if (toolParam === 'translate' || toolParam === 'templates') {
      setAiToolView(toolParam);
    }
  }, [searchParams]);
  
  const setActiveTabCallback = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const setChatExpandedCallback = useCallback((value: boolean) => {
    setChatExpanded(value);
  }, []);

  return (
    <SidebarProvider>
      <div className="bg-gray-50 min-h-screen flex">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTabCallback} />

        <div className={`flex-1 p-4 overflow-y-auto ${chatExpanded ? 'mr-96 md:mr-0' : ''}`}>
          <Header
            employeeInfo={employeeInfo}
            setChatExpanded={setChatExpandedCallback}
            chatExpanded={chatExpanded}
          />

          <div className="mt-4">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'tasks' && <TasksTab />}
            {activeTab === 'resources' && <ResourcesTab resourceTab={resourceTab} setResourceTab={setResourceTab} />}
            {activeTab === 'activities' && <ActivitiesTab activityTab={activityTab} setActivityTab={setActivityTab} />}
            {activeTab === 'ai-tools' && <AIToolsTab initialView={aiToolView} />}
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out border-l border-gray-200 ${
            chatExpanded ? 'w-96 fixed right-0 top-16 bottom-0 z-20' : 'w-0 overflow-hidden'
          }`}
          style={{height: 'calc(100vh - 64px)'}}
        >
          {chatExpanded && (
            <AIAssistant
              employeeInfo={employeeInfo}
              onClose={() => setChatExpanded(false)}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

// This function is the default export for the Next.js page component
export default function Page() {
  return <EmployeeDashboard />;
}