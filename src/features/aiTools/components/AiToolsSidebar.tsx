import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Upload, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Search,
  Pen
} from 'lucide-react';

interface AiToolsSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  activeView: string;
  setActiveView: (view: 'sidebar' | 'translate' | 'templates') => void;
}

export const AiToolsSidebar: React.FC<AiToolsSidebarProps> = ({
  collapsed,
  toggleSidebar,
  activeView,
  setActiveView
}) => {
  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <img src="/logo.png" alt="CMB Logo" className="rounded-full" />
          </div>
          {!collapsed && <span className="ml-2 font-bold text-blue-600">CMB</span>}
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="p-4">
        {!collapsed && (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <nav className="space-y-1">
          <div 
            className="px-3 py-2 rounded-md flex items-center text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer"
            onClick={() => setActiveView('sidebar')}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            {!collapsed && <span className="ml-3 font-medium">Công cụ AI</span>}
            {!collapsed && <ChevronDown size={16} className="ml-auto" />}
          </div>

          {!collapsed && (
            <div className="ml-8 space-y-1">
              <div 
                className={`px-3 py-2 text-sm rounded-md ${activeView === 'translate' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer flex items-center`}
                onClick={() => setActiveView('translate')}
              >
                <Upload size={16} className="mr-2" />
                Dịch thuật bằng AI
              </div>
              <div 
                className={`px-3 py-2 text-sm rounded-md ${activeView === 'templates' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer flex items-center`}
                onClick={() => setActiveView('templates')}
              >
                <FileText size={16} className="mr-2" />
                Viết nội dung theo mẫu
              </div>
              <div 
                className="px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
              >
                <Pen size={16} className="mr-2" />
                Chat cùng Chuyên gia AI
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default AiToolsSidebar;