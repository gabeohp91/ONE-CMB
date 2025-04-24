'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Upload, ExternalLink, RefreshCw } from 'lucide-react';
import TranslationTool from '@/features/aiTools/components/TranslationTool';
import TemplateTool from '@/features/aiTools/components/TemplateTool';

interface AIToolsTabProps {
  initialView?: 'translate' | 'templates';
}

const AIToolsTab: React.FC<AIToolsTabProps> = ({ initialView = 'translate' }) => {
  const [activeView, setActiveView] = useState<'translate' | 'templates'>(initialView);
  
  // Update view if initialView changes (due to URL parameters)
  useEffect(() => {
    if (initialView) {
      setActiveView(initialView);
    }
  }, [initialView]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Công cụ AI</h1>
      </div>

      {/* AI Tools Navigation */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            <Sparkles size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Chọn công cụ AI</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 ${activeView === 'translate' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'} border rounded-lg cursor-pointer transition-colors`}
            onClick={() => setActiveView('translate')}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                <RefreshCw size={18} />
              </div>
              <div>
                <h4 className="font-medium">Dịch thuật bằng AI</h4>
                <p className="text-sm text-gray-600">Dịch văn bản và tài liệu sang nhiều ngôn ngữ khác nhau</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 ${activeView === 'templates' ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 hover:bg-gray-100'} border rounded-lg cursor-pointer transition-colors`}
            onClick={() => setActiveView('templates')}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                <FileText size={18} />
              </div>
              <div>
                <h4 className="font-medium">Viết nội dung theo mẫu</h4>
                <p className="text-sm text-gray-600">Tạo văn bản hành chính, báo cáo từ các mẫu có sẵn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="transition-opacity duration-300">
        {activeView === 'translate' && (
          <TranslationTool />
        )}
        
        {activeView === 'templates' && (
          <TemplateTool />
        )}
      </div>
    </div>
  );
};

export default AIToolsTab;