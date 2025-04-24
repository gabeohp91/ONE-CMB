import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Settings, ChevronDown, ChevronRight, ChevronLeft, X, Check, Copy, Save, Paperclip, RefreshCw, Pen, FileText } from 'lucide-react';
import TranslationTool from '../components/TranslationTool';
import TemplateTool from '../components/TemplateTool';
import AiToolsSidebar from '../components/AiToolsSidebar';
import { useRouter } from 'next/navigation';
import { useAiTools } from '../hooks/useAiTools';

interface AiToolsLayoutProps {
  children?: React.ReactNode;
}

const AiToolsLayout: React.FC<AiToolsLayoutProps> = ({ children }) => {
  const [activeView, setActiveView] = useState<'sidebar' | 'translate' | 'templates'>('sidebar');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Update URL when active view changes
  useEffect(() => {
    if (activeView === 'translate') {
      router.push('/ai-tools/translate');
    } else if (activeView === 'templates') {
      router.push('/ai-tools/templates');
    }
  }, [activeView, router]);

  const renderContent = () => {
    switch(activeView) {
      case 'translate':
        return <TranslationTool />;
      case 'templates':
        return <TemplateTool />;
      default:
        return <SidebarView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AiToolsSidebar 
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

// Sidebar View Component
const SidebarView = ({ setActiveView }: { setActiveView: (view: 'sidebar' | 'translate' | 'templates') => void }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Công cụ AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setActiveView('translate')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <RefreshCw size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Dịch thuật bằng AI</h3>
          <p className="text-gray-600">Dịch tài liệu nhanh chóng và chính xác với công nghệ AI tiên tiến.</p>
        </div>
        
        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setActiveView('templates')}
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Viết nội dung theo mẫu</h3>
          <p className="text-gray-600">Tạo văn bản theo mẫu có sẵn với sự trợ giúp của AI.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <Pen size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Chat cùng Chuyên gia AI</h3>
          <p className="text-gray-600">Trò chuyện và nhận tư vấn từ AI có kiến thức chuyên sâu.</p>
        </div>
      </div>
    </div>
  );
};

export default AiToolsLayout;