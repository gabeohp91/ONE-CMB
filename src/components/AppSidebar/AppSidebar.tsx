'use client';

import React, { useState } from 'react';
import {
  Home,
  Briefcase,
  Users,
  Calendar,
  FileText,
  HardDrive,
  BarChart2,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  User as UserIcon,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string, toolView?: 'translate' | 'templates') => void;
}

const AppSidebar = ({ activeTab, setActiveTab }: AppSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const mySpaceItems = [
    { id: 'overview', label: 'Tổng quan', icon: <LayoutDashboard size={20} /> },
    { id: 'tasks', label: 'Công việc', icon: <Briefcase size={20} /> },
    { id: 'schedule', label: 'Lịch', icon: <Calendar size={20} /> },
    { id: 'resources', label: 'Tài nguyên', icon: <HardDrive size={18} /> },
    { id: 'activities', label: 'Hoạt động', icon: <BarChart2 size={18} /> },
    { id: 'settings', label: 'Cài đặt', icon: <Settings size={18} /> },
    { id: 'profile', label: 'Hồ sơ cá nhân', icon: <UserIcon size={20} /> },
  ];

  const aiTools = [
    { id: 'translation', toolView: 'translate', label: 'Dịch thuật bằng AI', icon: <RefreshCw size={18} /> },
    { id: 'templates', toolView: 'templates', label: 'Viết nội dung theo mẫu', icon: <FileText size={18} /> },
  ];

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-full ${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}> 
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
          <button onClick={toggleCollapsed} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <Menu size={24} />
          </button>
        <div className={`flex items-center ${isCollapsed ? 'hidden' : 'block'}`}>
            <h1 className="text-xl font-bold text-gray-900 ml-2">
                ONE CMB
            </h1>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* My Space Section */}
          <Accordion type="single" collapsible className="border-none" defaultValue="mySpace">
              <AccordionItem value="mySpace">
                  <div className={`${isCollapsed ? 'hidden' : 'block'}`}>
                      <AccordionTrigger className="px-3 py-2 text-sm font-medium text-blue-600 hover:no-underline">
                         KHÔNG GIAN CỦA TÔI
                      </AccordionTrigger>
                  </div>
                  <AccordionContent>
                      <ul className="mt-2 space-y-1">
                          {mySpaceItems.map((item) => (
                              <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === item.id
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className={`mr-3 text-gray-500 ${isCollapsed ? 'mx-auto' : ''} `}>
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && <span>{item.label}</span>}
                                </button>
                              </li>
                          ))}
                      </ul>
                  </AccordionContent>
              </AccordionItem>
          </Accordion>

          {/* AI Tools Section */}
          <Accordion type="single" collapsible className="border-none" defaultValue="aiTools">
              <AccordionItem value="aiTools">
                  <div className={`${isCollapsed ? 'hidden' : 'block'}`}>
                      <AccordionTrigger className="px-3 py-2 text-sm font-medium text-blue-600 hover:no-underline">
                         CÔNG CỤ AI
                      </AccordionTrigger>
                  </div>
                  <AccordionContent>
                      <ul className="mt-2 space-y-1">
                          {aiTools.map((item) => (
                              <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id, item.toolView as 'translate' | 'templates')}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                      activeTab === 'ai-tools' && 
                                      ((item.toolView === 'translate' && item.id === 'translation') || 
                                       (item.toolView === 'templates' && item.id === 'templates'))
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className={`mr-3 text-gray-500 ${isCollapsed ? 'mx-auto' : ''} `}>
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && <span>{item.label}</span>}
                                </button>
                              </li>
                          ))}
                      </ul>
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
      </nav>
      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50">
          {isCollapsed && (
            <LogOut size={20} className="mr-3" />
          )}
          <LogOut size={20} className={`${isCollapsed? 'hidden': 'mr-3'}`}/>
          {!isCollapsed && (
            <span>Đăng xuất</span>
          )}
          </button>
      </div>
    </div>
  );
};

export default AppSidebar;