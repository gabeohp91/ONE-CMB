'use client';

import React, { useState } from 'react';
import { ArrowRight, X, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  employeeInfo: {
    name: string;
    avatar: string;
  };
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ employeeInfo, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: `Chào ${employeeInfo.name}! Tôi là Trợ lý AI. Bạn có 2 công việc sắp đến hạn và cuộc họp dự án vào ngày mai. Bạn cần hỗ trợ gì không?`,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: "Tôi đã nhận được yêu cầu của bạn và đang xử lý. Vui lòng đợi trong giây lát.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  return ( 
    <div className="h-full bg-white shadow-xl overflow-hidden flex flex-col border-l border-gray-200">
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center"> 
        <div className="flex items-center"> 
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2">AI</div> 
          <span className="font-medium">Trợ lý AI</span> 
        </div> 
        <div className="flex"> 
          <button className="text-white hover:text-gray-200 mr-2" onClick={() => {}}> 
            <ChevronRight size={20} /> 
          </button> 
          <button className="text-white hover:text-gray-200" onClick={onClose}> 
            <X size={20} /> 
          </button> 
        </div> 
      </div> 
       
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50"> 
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
        </div> 
      </div> 
       
      <div className="border-t border-gray-200 p-3 flex"> 
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nhập câu hỏi..."
          className="flex-1 border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white rounded-r-lg px-4 py-2 text-sm font-medium hover:bg-blue-700" 
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
  
export default AIAssistant;