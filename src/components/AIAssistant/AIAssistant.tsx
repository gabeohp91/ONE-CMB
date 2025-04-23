'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, ChevronRight, Loader2, HelpCircle, Lightbulb } from 'lucide-react';
import { useAIAssistant, Message } from '@/modules/ai-assistant/hooks/useAIAssistant';
import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { withErrorBoundary } from '@/shared/components/ErrorBoundary';

interface AIAssistantProps {
  employeeInfo: {
    name: string;
    avatar: string;
  };
  onClose: () => void;
  className?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  employeeInfo, 
  onClose,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'suggestions'>('chat');
  const { error, handleError } = useErrorHandler();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get context for AI
  const getContext = () => {
    return {
      user: employeeInfo,
      currentPage: 'dashboard',
      recentTasks: [] // This would come from a task store in a real implementation
    };
  };
  
  // Initialize with welcome message
  const initialMessages: Message[] = [
    {
      id: '1',
      sender: 'ai',
      content: `Chào ${employeeInfo.name}! Tôi là Trợ lý AI. Bạn có 2 công việc sắp đến hạn và cuộc họp dự án vào ngày mai. Bạn cần hỗ trợ gì không?`,
      timestamp: new Date(),
    },
  ];
  
  const {
    messages,
    isLoading,
    inputMessage,
    setInputMessage,
    sendMessage,
    suggestions,
    executeAction,
    helpText,
    loadContextualHelp,
  } = useAIAssistant({
    initialMessages,
    contextProvider: getContext,
    onError: handleError,
  });

  useEffect(() => {
    scrollToBottom();
    
    // Load contextual help when tab changes to help
    if (activeTab === 'help') {
      loadContextualHelp();
    }
  }, [messages, activeTab]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  return ( 
    <div className={`h-full bg-white shadow-xl overflow-hidden flex flex-col border-l border-gray-200 max-h-screen ${className}`}>
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center"> 
        <div className="flex items-center"> 
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2">AI</div> 
          <span className="font-medium">Trợ lý AI</span> 
        </div> 
        <div className="flex"> 
          <button 
            className={`text-white hover:text-gray-200 mr-2 ${activeTab === 'chat' ? 'opacity-100' : 'opacity-50'}`} 
            onClick={() => setActiveTab('chat')}
            title="Chat"
          > 
            <ChevronRight size={20} /> 
          </button> 
          <button 
            className={`text-white hover:text-gray-200 mr-2 ${activeTab === 'help' ? 'opacity-100' : 'opacity-50'}`} 
            onClick={() => setActiveTab('help')}
            title="Help"
          > 
            <HelpCircle size={20} /> 
          </button>
          <button 
            className={`text-white hover:text-gray-200 mr-2 ${activeTab === 'suggestions' ? 'opacity-100' : 'opacity-50'}`} 
            onClick={() => setActiveTab('suggestions')}
            title="Suggestions"
          > 
            <Lightbulb size={20} /> 
          </button>
          <button className="text-white hover:text-gray-200" onClick={onClose} title="Close"> 
            <X size={20} /> 
          </button> 
        </div> 
      </div>
      
      {error && error.hasError && (
        <ErrorMessage 
          message={error.message || 'An error occurred'} 
          className="m-3"
        />
      )}
       
      {activeTab === 'chat' && (
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ scrollBehavior: 'smooth' }}> 
          <div className="space-y-4"> 
            {messages.map((msg) => ( 
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} 
              > 
                {msg.sender === 'ai' && ( 
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2 flex-shrink-0"> 
                    AI 
                  </div> 
                )} 
                <div 
                  className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-100 text-gray-800' : 'bg-white text-gray-800 shadow-sm'}`} 
                > 
                  {msg.content} 
                </div> 
                {msg.sender === 'user' && ( 
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-medium ml-2 flex-shrink-0"> 
                    {employeeInfo.avatar} 
                  </div> 
                )} 
              </div> 
            ))} 
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2 flex-shrink-0">
                  AI
                </div>
                <div className="rounded-lg p-3 bg-white text-gray-800 shadow-sm flex items-center">
                  <Loader2 size={16} className="animate-spin mr-2" />
                  <span>Đang xử lý...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div> 
        </div>
      )}
      
      {activeTab === 'help' && (
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Trợ giúp theo ngữ cảnh</h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center p-6">
                <Loader2 size={24} className="animate-spin mr-2" />
                <span>Đang tải trợ giúp...</span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                {helpText || 'Không có thông tin trợ giúp nào có sẵn. Vui lòng thử lại sau.'}
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'suggestions' && (
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Đề xuất</h3>
            
            {suggestions.length > 0 ? (
              <div className="grid gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => executeAction(suggestion.text)}
                    className="text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Không có đề xuất nào có sẵn.</p>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'chat' && (
        <div className="border-t border-gray-200 p-3 flex"> 
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi..."
            disabled={isLoading}
            className="flex-1 border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100" 
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 text-white rounded-r-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:bg-blue-400" 
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
          </button>
        </div>
      )}
    </div>
  );
};
  
export default withErrorBoundary(AIAssistant);